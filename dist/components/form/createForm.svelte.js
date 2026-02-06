import { z } from 'zod';
import { SvelteSet, SvelteMap } from 'svelte/reactivity';
/**
 * Creates a reactive form instance with validation and auto-save capabilities
 *
 * Validation behavior: validate on blur first, then immediate feedback on corrections
 *
 * @param initialData - Initial form values
 * @param options - Form configuration options
 */
export function createForm(initialData, options = {}) {
    const { autoSave = false, autoSaveDebounce = 500, showSaveIndicators = false, onSubmit, onAutoSaveField, onError, onUnsavedChangesChange, onChange } = options;
    // Access schema dynamically to support reactive schema updates via getter
    const getSchema = () => options.schema;
    // Form state
    let data = $state({ ...initialData });
    let errors = $state({});
    const fieldsWithErrors = new SvelteSet();
    const fieldsTouched = new SvelteSet();
    const fieldsWithRuntimeErrors = new SvelteSet();
    let submitting = $state(false);
    const autoSaveTimeouts = new SvelteMap();
    let fieldSaveStates = $state({});
    const fieldsBeingSaved = new SvelteSet();
    const savedStateTimeouts = new SvelteMap();
    let isProgrammaticUpdate = false;
    let isInOnChange = false;
    // Automatic cleanup when form instance is destroyed
    $effect(() => {
        return () => {
            autoSaveTimeouts.forEach((timeout) => clearTimeout(timeout));
            autoSaveTimeouts.clear();
            savedStateTimeouts.forEach((timeout) => clearTimeout(timeout));
            savedStateTimeouts.clear();
        };
    });
    const isValid = $derived(Object.keys(errors).length === 0);
    const hasUnsavedChanges = $derived(Object.values(fieldSaveStates).some((state) => state === 'unsaved'));
    const isSaving = $derived(autoSaveTimeouts.size > 0 || fieldsBeingSaved.size > 0);
    // Notify when unsaved changes state changes
    $effect(() => {
        onUnsavedChangesChange?.(hasUnsavedChanges);
    });
    // Notify when unsaved changes state changes
    $effect(() => {
        onUnsavedChangesChange?.(hasUnsavedChanges);
    });
    // Validate entire form using Zod schema
    function validateForm() {
        const schema = getSchema();
        if (!schema)
            return { success: true, data };
        const result = schema.safeParse(data);
        if (result.success) {
            errors = {};
            fieldsWithErrors.clear();
            return { success: true, data: result.data };
        }
        const newErrors = {};
        result.error.issues.forEach((err) => {
            const fieldName = err.path[0];
            if (fieldName && !newErrors[fieldName]) {
                newErrors[fieldName] = err.message;
                fieldsWithErrors.add(fieldName);
            }
        });
        errors = newErrors;
        onError?.(newErrors);
        return { success: false, errors: newErrors };
    }
    // Validate single field on blur
    function validateFieldOnBlur(fieldName) {
        const schema = getSchema();
        if (!schema)
            return true;
        // Don't override runtime errors with validation
        if (fieldsWithRuntimeErrors.has(fieldName)) {
            return false;
        }
        const result = schema.safeParse(data);
        if (result.success) {
            // Clear error for this field if form is valid
            if (errors[fieldName]) {
                const newErrors = { ...errors };
                delete newErrors[fieldName];
                errors = newErrors;
                fieldsWithErrors.delete(fieldName);
            }
            return true;
        }
        // Find error for this specific field
        const fieldError = result.error.issues.find((err) => err.path[0] === fieldName);
        if (fieldError) {
            errors = { ...errors, [fieldName]: fieldError.message };
            fieldsWithErrors.add(fieldName);
            return false;
        }
        else if (errors[fieldName]) {
            // Clear error if field is now valid
            const newErrors = { ...errors };
            delete newErrors[fieldName];
            errors = newErrors;
            fieldsWithErrors.delete(fieldName);
            return true;
        }
        return true;
    }
    // Update the value of a field
    async function updateField(name, value) {
        // Skip auto-save logic if this is a programmatic update
        if (isProgrammaticUpdate) {
            return;
        }
        data[name] = value;
        // Clear any existing runtime error for this field when user starts typing again
        if (errors[name] && fieldsWithRuntimeErrors.has(name)) {
            const newErrors = { ...errors };
            delete newErrors[name];
            errors = newErrors;
            fieldsWithErrors.delete(name);
            fieldsWithRuntimeErrors.delete(name);
        }
        // Mark field as unsaved when not currently being saved
        if (!fieldsBeingSaved.has(name)) {
            fieldSaveStates = { ...fieldSaveStates, [name]: 'unsaved' };
        }
        // Validate immediately if:
        // 1. Field was previously touched (blurred), OR
        // 2. Field has shown an error before (from submit or previous blur), OR
        // 3. Auto-save is enabled
        const shouldValidate = fieldsTouched.has(name) || fieldsWithErrors.has(name) || autoSave;
        const isValid = shouldValidate ? validateFieldOnBlur(name) : true;
        // Debounced auto-save
        if (autoSave && isValid) {
            const existingTimeout = autoSaveTimeouts.get(name);
            if (existingTimeout)
                clearTimeout(existingTimeout);
            const timeout = setTimeout(async () => {
                const savedValue = value; // Capture value being saved
                try {
                    fieldsBeingSaved.add(name);
                    await onAutoSaveField?.(name, value);
                    // Clear any previous error for this field on successful save
                    if (errors[name]) {
                        const newErrors = { ...errors };
                        delete newErrors[name];
                        errors = newErrors;
                        fieldsWithErrors.delete(name);
                        fieldsWithRuntimeErrors.delete(name);
                    }
                    // Mark as saved after successful save (only if value hasn't changed during save)
                    if (data[name] === savedValue) {
                        fieldSaveStates = { ...fieldSaveStates, [name]: 'saved' };
                        // Clear the saved state after 2 seconds
                        const existingSavedTimeout = savedStateTimeouts.get(name);
                        if (existingSavedTimeout)
                            clearTimeout(existingSavedTimeout);
                        const savedTimeout = setTimeout(() => {
                            fieldSaveStates = { ...fieldSaveStates, [name]: 'idle' };
                            savedStateTimeouts.delete(name);
                        }, 2000);
                        savedStateTimeouts.set(name, savedTimeout);
                    }
                }
                catch (error) {
                    console.error('Auto-save failed:', error);
                    // Store the error message in the form's error state for display
                    const errorMessage = error instanceof Error ? error.message : 'Failed to save changes';
                    errors = { ...errors, [name]: errorMessage };
                    fieldsWithErrors.add(name);
                    fieldsWithRuntimeErrors.add(name);
                    // Keep as unsaved if save failed
                    fieldSaveStates = { ...fieldSaveStates, [name]: 'unsaved' };
                }
                finally {
                    fieldsBeingSaved.delete(name);
                    autoSaveTimeouts.delete(name);
                }
            }, autoSaveDebounce);
            autoSaveTimeouts.set(name, timeout);
        }
    }
    // Validate field on blur
    function handleFieldBlur(name) {
        fieldsTouched.add(name);
        validateFieldOnBlur(name);
    }
    // Submit form
    async function submitForm() {
        if (!onSubmit || submitting)
            return;
        submitting = true;
        try {
            const result = validateForm();
            if (!result.success)
                return;
            await onSubmit(result.data);
            // Clear unsaved states after successful submission
            const clearedStates = {};
            for (const key in fieldSaveStates) {
                clearedStates[key] = 'idle';
            }
            fieldSaveStates = clearedStates;
        }
        catch (error) {
            // TODO improve this error handling with user feedback once
            // implementation is in place
            console.error('Form submission failed:', error);
            throw error;
        }
        finally {
            submitting = false;
        }
    }
    // Set multiple field values programmatically (for external updates)
    function setValues(updates, options) {
        isProgrammaticUpdate = true;
        for (const [key, value] of Object.entries(updates)) {
            data[key] = value;
            const fieldKey = key;
            // Clear runtime errors for fields being set
            if (fieldsWithRuntimeErrors.has(fieldKey)) {
                fieldsWithRuntimeErrors.delete(fieldKey);
            }
            // Handle save state based on options
            if (options?.markAsUnsaved === true) {
                // Explicitly mark as unsaved
                fieldSaveStates = { ...fieldSaveStates, [fieldKey]: 'unsaved' };
            }
            else if (options?.markAsUnsaved === false) {
                // Explicitly mark as idle (saved)
                fieldSaveStates = { ...fieldSaveStates, [fieldKey]: 'idle' };
            }
            else {
                // Default behavior: reset to idle when setting programmatically
                fieldSaveStates = { ...fieldSaveStates, [fieldKey]: 'idle' };
            }
        }
        // Validate the form to update error states (unless explicitly disabled)
        if (options?.validate !== false) {
            validateForm();
        }
        // Delay resetting flag to allow Svelte reactivity to settle
        setTimeout(() => {
            isProgrammaticUpdate = false;
        }, 0);
    }
    // Set a single field value programmatically (for external updates)
    function setValue(name, value, options) {
        const update = {};
        update[name] = value;
        setValues(update, options);
    }
    // Reset form to initial state
    function reset() {
        data = { ...initialData };
        errors = {};
        fieldsWithErrors.clear();
        fieldsTouched.clear();
        fieldsWithRuntimeErrors.clear();
        fieldSaveStates = {};
        fieldsBeingSaved.clear();
        autoSaveTimeouts.forEach((timeout) => clearTimeout(timeout));
        autoSaveTimeouts.clear();
        savedStateTimeouts.forEach((timeout) => clearTimeout(timeout));
        savedStateTimeouts.clear();
    }
    // Clear errors for specific fields
    function clearErrors(fieldNames) {
        const newErrors = { ...errors };
        for (const fieldName of fieldNames) {
            delete newErrors[fieldName];
            fieldsWithErrors.delete(fieldName);
            fieldsTouched.delete(fieldName);
        }
        errors = newErrors;
    }
    // Form directive to auto-attach blur listeners
    function enhance(node) {
        function handleBlur(event) {
            const target = event.target;
            const fieldName = target.name;
            if (fieldName && fieldName in data) {
                handleFieldBlur(fieldName);
            }
        }
        // Attach blur listener to the form, with input elements bubbling up
        node.addEventListener('blur', handleBlur, true);
        return {
            destroy() {
                node.removeEventListener('blur', handleBlur, true);
            }
        };
    }
    // Remove fields from the form data
    function removeFields(fieldNames) {
        isProgrammaticUpdate = true;
        for (const fieldName of fieldNames) {
            delete data[fieldName];
            // Clean up associated state
            fieldsWithErrors.delete(fieldName);
            fieldsTouched.delete(fieldName);
            fieldsWithRuntimeErrors.delete(fieldName);
            // Clean up save state
            if (fieldSaveStates[fieldName]) {
                const newStates = { ...fieldSaveStates };
                delete newStates[fieldName];
                fieldSaveStates = newStates;
            }
            // Clear any pending auto-save timeouts
            const timeout = autoSaveTimeouts.get(fieldName);
            if (timeout) {
                clearTimeout(timeout);
                autoSaveTimeouts.delete(fieldName);
            }
            // Clear any saved state timeouts
            const savedTimeout = savedStateTimeouts.get(fieldName);
            if (savedTimeout) {
                clearTimeout(savedTimeout);
                savedStateTimeouts.delete(fieldName);
            }
            // Clear error for this field
            if (errors[fieldName]) {
                const newErrors = { ...errors };
                delete newErrors[fieldName];
                errors = newErrors;
            }
        }
        setTimeout(() => {
            isProgrammaticUpdate = false;
        }, 0);
    }
    // Reactive proxy for automatic field updates via bind:value
    const reactiveData = new Proxy(data, {
        set(_target, property, value) {
            if (typeof property === 'string') {
                updateField(property, value);
                // Trigger onChange callback (prevent re-entry if callback modifies form.data)
                if (onChange && !isProgrammaticUpdate && !isInOnChange) {
                    isInOnChange = true;
                    try {
                        onChange({
                            path: property,
                            value: value,
                            formData: { ...data }
                        });
                    }
                    finally {
                        isInOnChange = false;
                    }
                }
            }
            return true;
        },
        deleteProperty(_target, property) {
            throw new Error(`Cannot delete form field "${String(property)}" directly. Use form.removeFields(['${String(property)}']) instead.`);
        }
    });
    return {
        get data() {
            return reactiveData;
        },
        get errors() {
            return errors;
        },
        get submitting() {
            return submitting;
        },
        get isValid() {
            return isValid;
        },
        get fieldSaveStates() {
            return fieldSaveStates;
        },
        get hasUnsavedChanges() {
            return hasUnsavedChanges;
        },
        get showSaveIndicators() {
            return showSaveIndicators;
        },
        get isSaving() {
            return isSaving;
        },
        submit: submitForm,
        validate: validateForm,
        setValue,
        setValues,
        reset,
        clearErrors,
        removeFields,
        enhance
    };
}

import { z } from 'zod';
import { SvelteSet, SvelteMap } from 'svelte/reactivity';

/**
 * Configuration options for creating a form instance
 */
export interface FormOptions<T = Record<string, unknown>> {
	/** Enable automatic saving on field changes, will trigger onAutoSaveField
	 * on each field change */
	autoSave?: boolean;
	/** Debounce delay in milliseconds for auto-save (default: 500ms) */
	autoSaveDebounce?: number;
	/** Show visual indicators for save states (unsaved/saved) */
	showSaveIndicators?: boolean;
	/** Zod schema for validation */
	schema?: z.ZodSchema<T>;
	/** Called when form is manually submitted */
	onSubmit?: (data: T) => void | Promise<void>;
	/** Called when individual field is auto-saved */
	onAutoSaveField?: <K extends keyof T>(fieldName: K, value: T[K]) => void | Promise<void>;
	/** Called when validation errors occur */
	onError?: (errors: Record<keyof T, string>) => void;
	/** Called when unsaved changes state changes */
	onUnsavedChangesChange?: (hasUnsavedChanges: boolean) => void;
	/** Called whenever any field changes */
	onChange?: (event: { path: keyof T; value: T[keyof T]; formData: T }) => void;
}

/**
 * Form instance with reactive state and methods
 */
export interface FormInstance<T = Record<string, unknown>> {
	/** Reactive form data (use with bind:value)
	 *
	 * Note that changes to this object will automatically trigger auto-save (if enabled).
	 * To update the state of the form without triggering an auto-save (i.e. to update based
	 * on a message received from the server) use setValue/setValues.
	 */
	data: T;
	/** Current validation errors */
	errors: Partial<Record<keyof T, string>>;
	/** Whether form is currently submitting */
	submitting: boolean;
	/** Whether all fields are valid */
	isValid: boolean;
	/** Save state for each field: 'idle' | 'unsaved' | 'saved' */
	fieldSaveStates: Partial<Record<keyof T, 'idle' | 'unsaved' | 'saved'>>;
	/** Whether the form has any unsaved changes (any field with 'unsaved' state) */
	hasUnsavedChanges: boolean;
	/** Whether to show visual save indicators */
	showSaveIndicators: boolean;
	/** Whether a save operation is currently in progress (debouncing or saving) */
	isSaving: boolean;

	/** Submit the form */
	submit: () => Promise<void>;
	/** Validate the form and return transformed data */
	validate: () =>
		| { success: true; data: T }
		| { success: false; errors: Partial<Record<keyof T, string>> };
	/** Set the value of a single field */
	setValue: <K extends keyof T>(
		name: K,
		value: T[K],
		options?: { markAsUnsaved?: boolean; validate?: boolean }
	) => void;
	/** Set the value of multiple fields */
	setValues: (
		updates: Partial<T>,
		options?: { markAsUnsaved?: boolean; validate?: boolean }
	) => void;
	/** Reset form to initial state */
	reset: () => void;
	/** Clear errors for specific fields */
	clearErrors: (fieldNames: (keyof T)[]) => void;
	/** Remove fields from the form */
	removeFields: (fieldNames: (keyof T)[]) => void;
	/** Form directive for auto-attaching blur listeners */
	enhance: (node: HTMLFormElement) => { destroy: () => void };
}

/**
 * Creates a reactive form instance with validation and auto-save capabilities
 *
 * Validation behavior: validate on blur first, then immediate feedback on corrections
 *
 * @param initialData - Initial form values
 * @param options - Form configuration options
 */
export function createForm<T extends Record<string, unknown>>(
	initialData: T,
	options: FormOptions<T> = {}
): FormInstance<T> {
	const {
		autoSave = false,
		autoSaveDebounce = 500,
		showSaveIndicators = false,
		onSubmit,
		onAutoSaveField,
		onError,
		onUnsavedChangesChange,
		onChange
	} = options;

	// Access schema dynamically to support reactive schema updates via getter
	const getSchema = () => options.schema;

	// Form state
	let data = $state({ ...initialData });
	let errors = $state({} as Partial<Record<keyof T, string>>);
	const fieldsWithErrors = new SvelteSet<keyof T>();
	const fieldsTouched = new SvelteSet<keyof T>();
	const fieldsWithRuntimeErrors = new SvelteSet<keyof T>();
	let submitting = $state(false);
	const autoSaveTimeouts = new SvelteMap<keyof T, ReturnType<typeof setTimeout>>();
	let fieldSaveStates = $state({} as Partial<Record<keyof T, 'idle' | 'unsaved' | 'saved'>>);
	const fieldsBeingSaved = new SvelteSet<keyof T>();
	const savedStateTimeouts = new SvelteMap<keyof T, ReturnType<typeof setTimeout>>();
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
	const hasUnsavedChanges = $derived(
		Object.values(fieldSaveStates).some((state) => state === 'unsaved')
	);
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
	function validateForm():
		| { success: true; data: T }
		| { success: false; errors: Partial<Record<keyof T, string>> } {
		const schema = getSchema();
		if (!schema) return { success: true, data };

		const result = schema.safeParse(data);

		if (result.success) {
			errors = {};
			fieldsWithErrors.clear();
			return { success: true, data: result.data };
		}

		const newErrors: Partial<Record<keyof T, string>> = {};
		result.error.issues.forEach((err: z.ZodIssue) => {
			const fieldName = err.path[0] as keyof T;
			if (fieldName && !newErrors[fieldName]) {
				newErrors[fieldName] = err.message;
				fieldsWithErrors.add(fieldName);
			}
		});
		errors = newErrors;
		onError?.(newErrors as Record<keyof T, string>);
		return { success: false, errors: newErrors };
	}

	// Validate single field on blur
	function validateFieldOnBlur(fieldName: keyof T): boolean {
		const schema = getSchema();
		if (!schema) return true;

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
		} else if (errors[fieldName]) {
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
	async function updateField<K extends keyof T>(name: K, value: T[K]) {
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
			if (existingTimeout) clearTimeout(existingTimeout);
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
						if (existingSavedTimeout) clearTimeout(existingSavedTimeout);
						const savedTimeout = setTimeout(() => {
							fieldSaveStates = { ...fieldSaveStates, [name]: 'idle' };
							savedStateTimeouts.delete(name);
						}, 2000);
						savedStateTimeouts.set(name, savedTimeout);
					}
				} catch (error) {
					console.error('Auto-save failed:', error);
					// Store the error message in the form's error state for display
					const errorMessage = error instanceof Error ? error.message : 'Failed to save changes';
					errors = { ...errors, [name]: errorMessage };
					fieldsWithErrors.add(name);
					fieldsWithRuntimeErrors.add(name);
					// Keep as unsaved if save failed
					fieldSaveStates = { ...fieldSaveStates, [name]: 'unsaved' };
				} finally {
					fieldsBeingSaved.delete(name);
					autoSaveTimeouts.delete(name);
				}
			}, autoSaveDebounce);
			autoSaveTimeouts.set(name, timeout);
		}
	}

	// Validate field on blur
	function handleFieldBlur(name: keyof T) {
		fieldsTouched.add(name);
		validateFieldOnBlur(name);
	}

	// Submit form
	async function submitForm() {
		if (!onSubmit || submitting) return;

		submitting = true;
		try {
			const result = validateForm();
			if (!result.success) return;

			await onSubmit(result.data);

			// Clear unsaved states after successful submission
			const clearedStates: Partial<Record<keyof T, 'idle' | 'unsaved' | 'saved'>> = {};
			for (const key in fieldSaveStates) {
				clearedStates[key] = 'idle';
			}
			fieldSaveStates = clearedStates;
		} catch (error) {
			// TODO improve this error handling with user feedback once
			// implementation is in place
			console.error('Form submission failed:', error);
			throw error;
		} finally {
			submitting = false;
		}
	}

	// Set multiple field values programmatically (for external updates)
	function setValues(
		updates: Partial<T>,
		options?: { markAsUnsaved?: boolean; validate?: boolean }
	) {
		isProgrammaticUpdate = true;

		for (const [key, value] of Object.entries(updates)) {
			(data as Record<string, unknown>)[key] = value;
			const fieldKey = key as keyof T;

			// Clear runtime errors for fields being set
			if (fieldsWithRuntimeErrors.has(fieldKey)) {
				fieldsWithRuntimeErrors.delete(fieldKey);
			}

			// Handle save state based on options
			if (options?.markAsUnsaved === true) {
				// Explicitly mark as unsaved
				fieldSaveStates = { ...fieldSaveStates, [fieldKey]: 'unsaved' };
			} else if (options?.markAsUnsaved === false) {
				// Explicitly mark as idle (saved)
				fieldSaveStates = { ...fieldSaveStates, [fieldKey]: 'idle' };
			} else {
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
	function setValue<K extends keyof T>(
		name: K,
		value: T[K],
		options?: { markAsUnsaved?: boolean }
	) {
		const update: Partial<T> = {};
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
	function clearErrors(fieldNames: (keyof T)[]) {
		const newErrors = { ...errors };
		for (const fieldName of fieldNames) {
			delete newErrors[fieldName];
			fieldsWithErrors.delete(fieldName);
			fieldsTouched.delete(fieldName);
		}
		errors = newErrors;
	}

	// Form directive to auto-attach blur listeners
	function enhance(node: HTMLFormElement) {
		function handleBlur(event: FocusEvent) {
			const target = event.target as HTMLInputElement;
			const fieldName = target.name;
			if (fieldName && fieldName in data) {
				handleFieldBlur(fieldName as keyof T);
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
	function removeFields(fieldNames: (keyof T)[]) {
		isProgrammaticUpdate = true;

		for (const fieldName of fieldNames) {
			delete (data as Record<string, unknown>)[fieldName as string];

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
				updateField(property as keyof T, value);
				// Trigger onChange callback (prevent re-entry if callback modifies form.data)
				if (onChange && !isProgrammaticUpdate && !isInOnChange) {
					isInOnChange = true;
					try {
						onChange({
							path: property as keyof T,
							value: value as T[keyof T],
							formData: { ...data }
						});
					} finally {
						isInOnChange = false;
					}
				}
			}
			return true;
		},
		deleteProperty(_target, property) {
			throw new Error(
				`Cannot delete form field "${String(property)}" directly. Use form.removeFields(['${String(property)}']) instead.`
			);
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

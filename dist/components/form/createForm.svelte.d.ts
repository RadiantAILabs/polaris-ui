import { z } from 'zod';
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
    onChange?: (event: {
        path: keyof T;
        value: T[keyof T];
        formData: T;
    }) => void;
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
    validate: () => {
        success: true;
        data: T;
    } | {
        success: false;
        errors: Partial<Record<keyof T, string>>;
    };
    /** Set the value of a single field */
    setValue: <K extends keyof T>(name: K, value: T[K], options?: {
        markAsUnsaved?: boolean;
        validate?: boolean;
    }) => void;
    /** Set the value of multiple fields */
    setValues: (updates: Partial<T>, options?: {
        markAsUnsaved?: boolean;
        validate?: boolean;
    }) => void;
    /** Reset form to initial state */
    reset: () => void;
    /** Clear errors for specific fields */
    clearErrors: (fieldNames: (keyof T)[]) => void;
    /** Remove fields from the form */
    removeFields: (fieldNames: (keyof T)[]) => void;
    /** Form directive for auto-attaching blur listeners */
    enhance: (node: HTMLFormElement) => {
        destroy: () => void;
    };
}
/**
 * Creates a reactive form instance with validation and auto-save capabilities
 *
 * Validation behavior: validate on blur first, then immediate feedback on corrections
 *
 * @param initialData - Initial form values
 * @param options - Form configuration options
 */
export declare function createForm<T extends Record<string, unknown>>(initialData: T, options?: FormOptions<T>): FormInstance<T>;

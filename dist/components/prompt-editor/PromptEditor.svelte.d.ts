export type UsedParameter = {
    value: string;
    isValid: boolean;
};
export type PromptEditorProps = {
    /** The current value of the input, bindable with `bind:value`. */
    value?: string;
    /** Placeholder text to show when the input is empty. */
    placeholder?: string;
    /** Whether the input is disabled and read-only. */
    disabled?: boolean;
    /** Parameters users may include in the template. */
    parameters?: string[];
    /** Used parameters extracted from the template, bindable with `bind:usedParameters`. */
    usedParameters?: UsedParameter[];
    /** Whether there are any validation errors, bindable with `bind:hasError`. */
    hasError?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-errormessage'?: string;
};
declare const PromptEditor: import("svelte").Component<PromptEditorProps, {}, "value" | "usedParameters" | "hasError">;
type PromptEditor = ReturnType<typeof PromptEditor>;
export default PromptEditor;

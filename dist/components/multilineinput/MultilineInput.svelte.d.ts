import type { Extension } from '@codemirror/state';
import type { Snippet } from 'svelte';
export type MultilineInputProps = {
    /** The current value of the input, bindable with `bind:value`. */
    value?: string;
    /** Placeholder text to show when the input is empty. */
    placeholder?: string;
    /** Whether the input is disabled and read-only. */
    disabled?: boolean;
    /** Whether the input is read-only. */
    readonly?: boolean;
    /** Show a copy button to copy the content. */
    showCopyButton?: boolean;
    /** Additional CodeMirror extensions to include */
    extensions?: Extension[];
    /** Optional header content rendered above the editor */
    headerPane?: Snippet;
    /** Whether the input should be styled as active (e.g., when a dropdown in header pane is open) */
    isActive?: boolean;
    /** Callback fired when the value changes */
    onValueChange?: (value: string) => void;
    /** Name attribute for form integration */
    name?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-errormessage'?: string;
    class?: string;
};
import { EditorView } from '@codemirror/view';
declare const MultilineInput: import("svelte").Component<MultilineInputProps, {
    getEditorView: () => EditorView | null;
}, "value">;
type MultilineInput = ReturnType<typeof MultilineInput>;
export default MultilineInput;

import type { Snippet } from 'svelte';
type Props = {
    columns?: 2 | 3;
    children: Snippet;
    class?: string;
};
declare const FormColumn: import("svelte").Component<Props, {}, "">;
type FormColumn = ReturnType<typeof FormColumn>;
export default FormColumn;

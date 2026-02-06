import type { ButtonProps } from '../button/Button.svelte';
type Props = {
    title: string;
    actionButton?: Omit<ButtonProps, 'size'>;
    children?: import('svelte').Snippet;
    class?: string;
};
declare const FormSection: import("svelte").Component<Props, {}, "">;
type FormSection = ReturnType<typeof FormSection>;
export default FormSection;

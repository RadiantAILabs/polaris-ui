import type { ButtonProps } from '../button/Button.svelte';
type Props = {
    title: string;
    actionButton?: Omit<ButtonProps, 'size'>;
    class?: string;
};
declare const FormSectionLegend: import("svelte").Component<Props, {}, "">;
type FormSectionLegend = ReturnType<typeof FormSectionLegend>;
export default FormSectionLegend;

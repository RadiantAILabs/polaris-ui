import type { ButtonProps } from '../button/Button.svelte';
export interface ConfigTabHeaderProps {
    title: string;
    backTo?: string;
    onBack?: () => void;
    detail?: string;
    actionButton?: Omit<ButtonProps, 'size'>;
}
declare const ConfigTabHeader: import("svelte").Component<ConfigTabHeaderProps, {}, "">;
type ConfigTabHeader = ReturnType<typeof ConfigTabHeader>;
export default ConfigTabHeader;

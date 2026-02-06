import type { ButtonProps } from '../button';
export type BlankStateProps = {
    title?: string;
    description: string;
    buttonProps?: Omit<ButtonProps, 'size'>;
    class?: string;
};
declare const BlankState: import("svelte").Component<BlankStateProps, {}, "">;
type BlankState = ReturnType<typeof BlankState>;
export default BlankState;

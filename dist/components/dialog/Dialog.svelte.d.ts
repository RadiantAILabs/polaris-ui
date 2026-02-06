import type { Snippet } from 'svelte';
import { Dialog, type WithoutChildren } from 'bits-ui';
import { type ButtonProps } from '../button';
import './Dialog.scss';
export interface DialogProps extends WithoutChildren<Dialog.RootProps> {
    children?: Snippet;
    footer?: Snippet;
    titleActions?: Snippet;
    triggerButtonProps: ButtonProps;
    disabled?: boolean;
    title: string;
    variant?: 'modal' | 'side-sheet';
    size?: 'small' | 'medium' | 'large' | 'extra-large';
    showCloseButton?: boolean;
    contentProps?: Dialog.ContentProps;
    open?: boolean;
    /** Called when user tries to close. Return false to prevent close. */
    onClose?: () => void | false | Promise<void | false>;
    class?: string;
    zIndex?: number;
}
declare const Dialog: import("svelte").Component<DialogProps, {}, "open">;
type Dialog = ReturnType<typeof Dialog>;
export default Dialog;

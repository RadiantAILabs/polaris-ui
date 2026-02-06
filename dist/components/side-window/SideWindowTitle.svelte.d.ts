import type { IconAndTextProps } from '../icon-and-text';
import type { Snippet } from 'svelte';
export interface SideWindowTitleProps {
    title: string;
    iconAndText1?: Omit<IconAndTextProps, 'size'>;
    iconAndText2?: Omit<IconAndTextProps, 'size'>;
    showExpand?: boolean;
    showClose?: boolean;
    onExpand?: () => void;
    onClose?: () => void;
    titleActions?: Snippet;
}
declare const SideWindowTitle: import("svelte").Component<SideWindowTitleProps, {}, "">;
type SideWindowTitle = ReturnType<typeof SideWindowTitle>;
export default SideWindowTitle;

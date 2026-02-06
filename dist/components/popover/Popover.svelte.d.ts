import type { Snippet } from 'svelte';
import { Popover as PopoverPrimitive, type WithoutChildren } from 'bits-ui';
import { type ButtonProps } from '../button';
import './Popover.scss';
export interface PopoverProps extends WithoutChildren<PopoverPrimitive.RootProps> {
    children?: Snippet;
    actions?: Snippet;
    triggerButtonProps: ButtonProps;
    portalProps?: PopoverPrimitive.PortalProps;
    align?: 'start' | 'end';
    disabled?: boolean;
    class?: string;
}
declare const Popover: import("svelte").Component<PopoverProps, {}, "">;
type Popover = ReturnType<typeof Popover>;
export default Popover;

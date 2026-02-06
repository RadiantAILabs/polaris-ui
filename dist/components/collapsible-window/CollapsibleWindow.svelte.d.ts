import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
export type CollapsibleWindowProps = {
    open?: boolean;
    disabled?: boolean;
    trigger?: Snippet;
    content?: Snippet;
    ariaLabel?: string;
    onOpenChange?: (open: boolean) => void;
    borderTop?: boolean;
    borderBottom?: boolean;
} & HTMLAttributes<HTMLDivElement>;
declare const CollapsibleWindow: import("svelte").Component<CollapsibleWindowProps, {}, "open">;
type CollapsibleWindow = ReturnType<typeof CollapsibleWindow>;
export default CollapsibleWindow;

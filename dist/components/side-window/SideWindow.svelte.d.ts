import type { Snippet } from 'svelte';
import type { SideWindowTitlePaneProps } from './SideWindowTitlePane.svelte';
export interface SideWindowProps extends SideWindowTitlePaneProps {
    showTitlePane?: boolean;
    contentPadding?: boolean;
}
type $$ComponentProps = SideWindowProps & {
    children?: Snippet;
};
declare const SideWindow: import("svelte").Component<$$ComponentProps, {}, "">;
type SideWindow = ReturnType<typeof SideWindow>;
export default SideWindow;

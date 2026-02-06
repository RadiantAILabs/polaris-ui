import type { SideWindowTitleProps } from './SideWindowTitle.svelte';
import type { UnderlineNavProps } from '../underline-nav';
export interface SideWindowTitlePaneProps extends SideWindowTitleProps {
    showNavbar?: boolean;
    navProps?: UnderlineNavProps;
}
declare const SideWindowTitlePane: import("svelte").Component<SideWindowTitlePaneProps, {}, "">;
type SideWindowTitlePane = ReturnType<typeof SideWindowTitlePane>;
export default SideWindowTitlePane;

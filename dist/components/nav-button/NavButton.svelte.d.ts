import type { IconName } from '../icon/icon-registry';
export type NavButtonProps = {
    icon: IconName;
    label: string;
    active?: boolean;
    expanded?: boolean;
    href?: string;
    disabled?: boolean;
    class?: string;
    ref?: HTMLElement | null;
    onclick?: (event: MouseEvent) => void;
};
declare const NavButton: import("svelte").Component<NavButtonProps, {}, "ref">;
type NavButton = ReturnType<typeof NavButton>;
export default NavButton;

export interface TreeDropdownProps {
    /** Whether the dropdown is open, bindable with bind:open */
    open?: boolean;
    /** Callback fired when clicked */
    onclick?: (open: boolean) => void;
    /** Accessible label for the button */
    ariaLabel?: string;
    /** Additional CSS class */
    class?: string;
    /** Whether the dropdown is disabled */
    disabled?: boolean;
}
declare const TreeDropdown: import("svelte").Component<TreeDropdownProps, {}, "open">;
type TreeDropdown = ReturnType<typeof TreeDropdown>;
export default TreeDropdown;

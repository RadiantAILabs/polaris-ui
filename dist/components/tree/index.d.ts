declare const Tree: {
    Dropdown: import("svelte").Component<import("./TreeDropdown.svelte").TreeDropdownProps, {}, "open">;
    Trail: import("svelte").Component<import("./TreeTrail.svelte").TreeTrailProps, {}, "">;
    ResourceIcon: import("svelte").Component<import("./TreeResourceIcon.svelte").TreeResourceIconProps, {}, "">;
    ElementDetails: import("svelte").Component<import("./TreeElementDetails.svelte").TreeElementDetailsProps, {}, "">;
    Element: import("svelte").Component<import("./TreeElement.svelte").TreeElementProps, {}, "selected" | "expanded">;
};
export { Tree as default };
export type { TreeDropdownProps } from './TreeDropdown.svelte';
export type { TreeResourceIconProps } from './TreeResourceIcon.svelte';
export type { TreeElementDetailsProps } from './TreeElementDetails.svelte';
export type { TreeElementProps } from './TreeElement.svelte';

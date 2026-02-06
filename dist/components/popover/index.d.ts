declare const Popover: import("svelte").Component<import("./Popover.svelte").PopoverProps, {}, ""> & {
    Header: import("svelte").Component<import("./PopoverHeader.svelte").PopoverHeaderProps, {}, "">;
};
export { Popover };
export type { PopoverProps } from './Popover.svelte';
export type { PopoverHeaderProps } from './PopoverHeader.svelte';

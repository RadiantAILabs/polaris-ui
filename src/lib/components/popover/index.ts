import PopoverComponent from './Popover.svelte';
import Header from './PopoverHeader.svelte';

const Popover = Object.assign(PopoverComponent, {
	Header
});

export { Popover };

// Re-export types for external use
export type { PopoverProps } from './Popover.svelte';
export type { PopoverHeaderProps } from './PopoverHeader.svelte';

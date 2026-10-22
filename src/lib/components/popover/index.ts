import { Popover as Primitive } from 'bits-ui';
import Content from './PopoverContent.svelte';
import PopoverComponent from './Popover.svelte';
import Header from './PopoverHeader.svelte';

const Popover = Object.assign(PopoverComponent, {
	Header,
	Root: Primitive.Root,
	Trigger: Primitive.Trigger,
	Close: Primitive.Close,
	Content
});

export { Popover };

// Re-export types for external use
export type { PopoverProps } from './Popover.svelte';
export type { PopoverHeaderProps } from './PopoverHeader.svelte';

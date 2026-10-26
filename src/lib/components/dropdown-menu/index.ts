import { DropdownMenu as Primitive } from 'bits-ui';
import Component from './DropdownMenu.svelte';
import Content from './DropdownMenuContent.svelte';
import Item from './DropdownMenuItem.svelte';
import Label from './DropdownMenuLabel.svelte';
import Separator from './DropdownMenuSeparator.svelte';
import SubContent from './DropdownMenuSubContent.svelte';
import SubTrigger from './DropdownMenuSubTrigger.svelte';

export const DropdownMenu: typeof Component & {
	Root: typeof Primitive.Root;
	Trigger: typeof Primitive.Trigger;
	Content: typeof Content;
	Item: typeof Item;
	Group: typeof Primitive.Group;
	Label: typeof Label;
	Separator: typeof Separator;
	Sub: typeof Primitive.Sub;
	SubContent: typeof SubContent;
	SubTrigger: typeof SubTrigger;
} = Object.assign(Component, {
	Root: Primitive.Root,
	Trigger: Primitive.Trigger,
	Content,
	Item,
	Group: Primitive.Group,
	Label,
	Separator,
	Sub: Primitive.Sub,
	SubContent,
	SubTrigger
});
export type { DropdownMenuProps } from './DropdownMenu.svelte';

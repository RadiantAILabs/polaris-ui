import { Select as SelectPrimitive } from 'bits-ui';

import DropdownSelectorComponent from './DropdownSelector.svelte';
import Trigger from './dropdown-selector-trigger.svelte';
import Item from './dropdown-selector-item.svelte';
import Content from './dropdown-selector-content.svelte';

const Root = SelectPrimitive.Root;

const DropdownSelector = Object.assign(DropdownSelectorComponent, {
	Root,
	Trigger,
	Item,
	Content
}) as typeof DropdownSelectorComponent & {
	Root: typeof Root;
	Trigger: typeof Trigger;
	Item: typeof Item;
	Content: typeof Content;
};

export default DropdownSelector;

export type { DropdownSelectorProps } from './DropdownSelector.svelte';

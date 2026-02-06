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
});
export default DropdownSelector;

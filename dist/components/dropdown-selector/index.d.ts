import DropdownSelectorComponent from './DropdownSelector.svelte';
import Trigger from './dropdown-selector-trigger.svelte';
import Item from './dropdown-selector-item.svelte';
import Content from './dropdown-selector-content.svelte';
declare const Root: import("svelte").Component<import("bits-ui").SelectRootPropsWithoutHTML, {}, "value" | "open">;
declare const DropdownSelector: typeof DropdownSelectorComponent & {
    Root: typeof Root;
    Trigger: typeof Trigger;
    Item: typeof Item;
    Content: typeof Content;
};
export default DropdownSelector;
export type { DropdownSelectorProps } from './DropdownSelector.svelte';

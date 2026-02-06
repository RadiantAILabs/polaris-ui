import { Select as SelectPrimitive } from 'bits-ui';
import type { Snippet } from 'svelte';
type $$ComponentProps = Omit<SelectPrimitive.ItemProps, 'children'> & {
    isMultiSelect?: boolean;
    children?: Snippet<[{
        selected: boolean;
        highlighted: boolean;
    }]>;
};
declare const DropdownSelectorItem: import("svelte").Component<$$ComponentProps, {}, "ref">;
type DropdownSelectorItem = ReturnType<typeof DropdownSelectorItem>;
export default DropdownSelectorItem;

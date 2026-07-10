import TreeDropdownComponent from './TreeDropdown.svelte';
import TreeTrailComponent from './TreeTrail.svelte';
import TreeElementTagComponent from './TreeElementTag.svelte';
import TreeElementDetailsComponent from './TreeElementDetails.svelte';
import TreeElementComponent from './TreeElement.svelte';

const Tree = Object.assign(
	{},
	{
		Dropdown: TreeDropdownComponent,
		Trail: TreeTrailComponent,
		ElementTag: TreeElementTagComponent,
		ElementDetails: TreeElementDetailsComponent,
		Element: TreeElementComponent
	}
);

export { Tree as default };
export type { TreeDropdownProps } from './TreeDropdown.svelte';
export type { TreeElementTagProps } from './TreeElementTag.svelte';
export type { TreeElementDetailsProps } from './TreeElementDetails.svelte';
export type { TreeElementProps } from './TreeElement.svelte';

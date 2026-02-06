import type { DropdownMenuProps } from '../dropdown-menu/DropdownMenu.svelte';
export interface DataTableActionItem {
    /** The text to display for this action */
    label: string;
    /** The value to pass to the onAction callback when selected */
    value: string;
    /** Whether this action is disabled */
    disabled?: boolean;
}
export interface DataTableActionsProps extends Omit<DropdownMenuProps, 'items' | 'buttonLabel' | 'buttonProps' | 'onSelect'> {
    /** Array of action items to display in the dropdown */
    actions: DataTableActionItem[];
    /** Callback fired when an action is selected. Receives the action value */
    onAction?: (value: string) => void;
}
declare const DataTableActions: import("svelte").Component<DataTableActionsProps, {}, "">;
type DataTableActions = ReturnType<typeof DataTableActions>;
export default DataTableActions;

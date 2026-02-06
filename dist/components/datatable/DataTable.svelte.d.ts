import type { TableProps } from '../table/index';
import type { Snippet } from 'svelte';
import type { DataTableActionItem } from './DataTableActions.svelte';
/** Supported data types for automatic sorting */
export type SortType = 'string' | 'number' | 'date' | 'boolean';
export interface DataTableColumn<T extends Record<string, unknown>> {
    /** The key from the data object to display in this column */
    name: keyof T;
    /** The header text to display for this column */
    displayName: string;
    /** Optional custom render function for the cell content */
    render?: Snippet<[value: T[keyof T]]>;
    /** The data type for automatic sorting. If not provided, column won't be sortable */
    sortType?: SortType;
    /** Custom sort function. Takes precedence over sortType if both are provided */
    sortFn?: (a: T[keyof T], b: T[keyof T]) => number;
    /** Whether this column should shrink to fit its content (useful for action columns) */
    hugContent?: boolean;
    /** Whether this column should expand to fill all remaining space. Sets width: 100% */
    fillRemaining?: boolean;
    /** Allow column to shrink below its content width. Will lead to ellipsis truncation. */
    shrinkBelowContent?: boolean;
    /** Minimum width for the column (e.g., "200px", "10rem") */
    minWidth?: string;
    /** Maximum width for the column (e.g., "400px", "20rem") */
    maxWidth?: string;
    /** Fixed width for the column (e.g., "150px", "10rem") */
    width?: string;
}
export interface DataTableProps<T extends Record<string, unknown>> extends TableProps {
    /** Array of data objects to display in the table */
    items: T[];
    /** Column configuration defining how data should be displayed */
    columns: DataTableColumn<T>[];
    /** The field in each item to use as a unique identifier */
    idField: keyof T;
    /** Optional callback fired when a row is clicked. Receives the item's ID */
    onRowClick?: (id: T[keyof T]) => void;
    /** Optional array of action items to display in each row */
    actions?: DataTableActionItem[];
    /** Optional callback fired when an action is triggered. Receives the item ID and action value */
    onAction?: (itemId: T[keyof T], actionValue: string) => void;
    /** Whether to show a search bar above the table */
    searchable?: boolean;
    /** Array of column keys to search through. If empty, searches all columns */
    searchableColumns?: (keyof T)[];
    /** Placeholder text for the search input */
    searchPlaceholder?: string;
    /** Minimum width for the entire table. Below this width, table will scroll horizontally */
    minWidth?: string;
}
declare function $$render<T extends Record<string, unknown>>(): {
    props: DataTableProps<T>;
    exports: {};
    bindings: "ref";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T extends Record<string, unknown>> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "ref";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends Record<string, unknown>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T extends Record<string, unknown>>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const DataTable: $$IsomorphicComponent;
type DataTable<T extends Record<string, unknown>> = InstanceType<typeof DataTable<T>>;
export default DataTable;

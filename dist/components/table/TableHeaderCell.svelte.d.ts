import { type WithElementRef } from '../../utils';
import type { HTMLThAttributes } from 'svelte/elements';
export type SortDirection = 'asc' | 'desc';
export interface TableHeaderCellProps extends WithElementRef<HTMLThAttributes> {
    /** Whether the column is sortable */
    sortable?: boolean;
    /** Current sort direction for this column */
    sortDirection?: SortDirection | null;
    /** Callback when sort direction changes */
    onSort?: (direction: SortDirection) => void;
    /** Column name for enhanced accessibility */
    columnName?: string;
}
declare const TableHeaderCell: import("svelte").Component<TableHeaderCellProps, {}, "ref">;
type TableHeaderCell = ReturnType<typeof TableHeaderCell>;
export default TableHeaderCell;

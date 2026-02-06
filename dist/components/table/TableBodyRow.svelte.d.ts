import { type WithElementRef } from '../../utils';
import type { HTMLAttributes } from 'svelte/elements';
export interface TableBodyRowProps extends WithElementRef<HTMLAttributes<HTMLTableRowElement>> {
    onClick?: () => void;
}
declare const TableBodyRow: import("svelte").Component<TableBodyRowProps, {}, "ref">;
type TableBodyRow = ReturnType<typeof TableBodyRow>;
export default TableBodyRow;

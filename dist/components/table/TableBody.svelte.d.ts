import { type WithElementRef } from '../../utils';
import type { HTMLAttributes } from 'svelte/elements';
export interface TableBodyProps extends WithElementRef<HTMLAttributes<HTMLTableSectionElement>> {
    emptyMessage?: string;
}
declare const TableBody: import("svelte").Component<TableBodyProps, {}, "ref">;
type TableBody = ReturnType<typeof TableBody>;
export default TableBody;

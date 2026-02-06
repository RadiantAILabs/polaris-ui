import type { HTMLTableAttributes } from 'svelte/elements';
import { type WithElementRef } from '../../utils';
export interface TableProps extends WithElementRef<HTMLTableAttributes> {
    hoverable?: boolean;
    primaryColumn?: boolean;
}
declare const Table: import("svelte").Component<TableProps, {}, "ref">;
type Table = ReturnType<typeof Table>;
export default Table;

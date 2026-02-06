import Root from './Table.svelte';
import Header from './TableHeader.svelte';
import HeaderCell from './TableHeaderCell.svelte';
import Body from './TableBody.svelte';
import BodyRow from './TableBodyRow.svelte';
import BodyCell from './TableBodyCell.svelte';
export declare const Table: {
    Root: import("svelte").Component<import("./Table.svelte").TableProps, {}, "ref">;
    Header: import("svelte").Component<import("../../utils").WithElementRef<import("svelte/elements").HTMLAttributes<HTMLTableSectionElement>>, {}, "ref">;
    HeaderCell: import("svelte").Component<import("./TableHeaderCell.svelte").TableHeaderCellProps, {}, "ref">;
    Body: import("svelte").Component<import("./TableBody.svelte").TableBodyProps, {}, "ref">;
    BodyRow: import("svelte").Component<import("./TableBodyRow.svelte").TableBodyRowProps, {}, "ref">;
    BodyCell: import("svelte").Component<import("../../utils").WithElementRef<import("svelte/elements").HTMLTdAttributes>, {}, "ref">;
};
export { Root, Header, HeaderCell, Body, BodyRow, BodyCell, Root as TableRoot, Header as TableHeader, HeaderCell as TableHeaderCell, Body as TableBody, BodyRow as TableBodyRow, BodyCell as TableBodyCell };
export type { TableProps } from './Table.svelte';
export type { TableHeaderCellProps, SortDirection } from './TableHeaderCell.svelte';
export type { TableBodyProps } from './TableBody.svelte';
export default Root;

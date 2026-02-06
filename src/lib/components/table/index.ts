import Root from './Table.svelte';
import Header from './TableHeader.svelte';
import HeaderCell from './TableHeaderCell.svelte';
import Body from './TableBody.svelte';
import BodyRow from './TableBodyRow.svelte';
import BodyCell from './TableBodyCell.svelte';

export const Table = {
	Root,
	Header,
	HeaderCell,
	Body,
	BodyRow,
	BodyCell
};

export {
	Root,
	Header,
	HeaderCell,
	Body,
	BodyRow,
	BodyCell,
	//
	Root as TableRoot,
	Header as TableHeader,
	HeaderCell as TableHeaderCell,
	Body as TableBody,
	BodyRow as TableBodyRow,
	BodyCell as TableBodyCell
};

export type { TableProps } from './Table.svelte';
export type { TableHeaderCellProps, SortDirection } from './TableHeaderCell.svelte';
export type { TableBodyProps } from './TableBody.svelte';

export default Root;

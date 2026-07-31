<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { DataTable, type DataTableColumn, type DataTableActionItem } from './index';
	import { Badge } from '../badge';

	const { Story } = defineMeta({
		title: 'Components/DataTable',
		component: DataTable,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs']
	});

	type CarData = {
		id: number;
		maker: string;
		type: string;
		make: number;
		status: 'active' | 'pending' | 'inactive';
	};

	let items: CarData[] = [
		{ id: 1, maker: 'Toyota', type: 'ABC', make: 2017, status: 'active' },
		{ id: 2, maker: 'Ford', type: 'CDE', make: 2018, status: 'pending' },
		{ id: 3, maker: 'Volvo', type: 'FGH', make: 2019, status: 'inactive' },
		{ id: 4, maker: 'Saab', type: 'IJK', make: 2020, status: 'active' }
	];

	const overflowingItems: CarData[] = Array.from({ length: 20 }, (_, index) => ({
		...items[index % items.length]!,
		id: index + 1
	}));

	let columns: DataTableColumn<CarData>[] = [
		{ name: 'id', displayName: 'ID', type: 'number' },
		{ name: 'maker', displayName: 'Car Manufacturer', type: 'string' },
		{ name: 'type', displayName: 'Model Type', type: 'string' },
		{ name: 'make', displayName: 'Year Made', type: 'number' }
	];

	let advancedColumns: DataTableColumn<CarData>[] = [
		{ name: 'id', displayName: 'ID', type: 'number', sortable: false, hugContent: true },
		{
			name: 'maker',
			displayName: 'Car Manufacturer',
			type: 'string',
			filter: { kind: 'select' }
		},
		{ name: 'type', displayName: 'Model Type', filter: { kind: 'search' } },
		{ name: 'make', displayName: 'Year Made', type: 'number' },
		{
			name: 'status',
			displayName: 'Status',
			type: 'string',
			filter: { kind: 'select' },
			render: statusBadge
		}
	];

	const actions: DataTableActionItem[] = [
		{ label: 'Edit', value: 'edit' },
		{ label: 'Delete', value: 'delete' },
		{ label: 'Duplicate', value: 'duplicate' }
	];

	function handleAction(itemId: string | number, actionValue: string) {
		alert(`Action "${actionValue}" triggered for item ID: ${itemId}`);
	}
</script>

<Story name="Basic">
	{#snippet template()}
		<div style="padding: 20px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 600;">DataTable Example</h3>
			<DataTable {items} {columns} idField="id" hoverable={true} />
		</div>
	{/snippet}
</Story>

<Story name="Sortable">
	{#snippet template()}
		<div style="padding: 20px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 600;">Sortable DataTable</h3>
			<DataTable {items} {columns} idField="id" hoverable={true} />
		</div>
	{/snippet}
</Story>

<Story name="Adaptive Sticky Header">
	{#snippet template()}
		<div
			style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; height: 320px;"
		>
			<div style="display: flex; flex-direction: column; min-height: 0;">
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 600;">Short table</h3>
				<DataTable {items} {columns} idField="id" hoverable={true} stickyHeader />
			</div>
			<div style="display: flex; flex-direction: column; min-height: 0;">
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 600;">Overflowing table</h3>
				<DataTable items={overflowingItems} {columns} idField="id" hoverable={true} stickyHeader />
			</div>
		</div>
	{/snippet}
</Story>

{#snippet statusBadge(value: string | number)}
	<Badge text={String(value)} />
{/snippet}

<Story name="Advanced Features">
	{#snippet template()}
		<div style="padding: 20px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 600;">
				DataTable with Actions, Search, Limited Sorting & Custom Cell Rendering
			</h3>
			<p style="margin: 0 0 16px; font-size: 12px; color: #666;">
				Shows per-column sorting control, per-column filtering, custom badge rendering for Status
				column, row actions menu, and clickable rows.
			</p>
			<DataTable
				{items}
				columns={advancedColumns}
				idField="id"
				hoverable={true}
				primaryColumn={true}
				{actions}
				onAction={handleAction}
				onRowClick={(id) => alert(`Clicked row with ID: ${id}`)}
			/>
		</div>
	{/snippet}
</Story>

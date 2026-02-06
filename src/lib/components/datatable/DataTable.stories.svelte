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

	let columns: DataTableColumn<CarData>[] = [
		{ name: 'id', displayName: 'ID', sortType: 'number' },
		{ name: 'maker', displayName: 'Car Manufacturer', sortType: 'string' },
		{ name: 'type', displayName: 'Model Type', sortType: 'string' },
		{ name: 'make', displayName: 'Year Made', sortType: 'number' }
	];

	let advancedColumns: DataTableColumn<CarData>[] = [
		{ name: 'id', displayName: 'ID', hugContent: true },
		{ name: 'maker', displayName: 'Car Manufacturer', sortType: 'string' },
		{ name: 'type', displayName: 'Model Type' },
		{ name: 'make', displayName: 'Year Made', sortType: 'number' },
		{
			name: 'status',
			displayName: 'Status',
			sortType: 'string',
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
				Shows per-column sorting control (ID and Model Type are not sortable), custom badge
				rendering for Status column, row actions menu, search functionality, and clickable rows.
			</p>
			<DataTable
				{items}
				columns={advancedColumns}
				idField="id"
				hoverable={true}
				primaryColumn={true}
				{actions}
				searchable={true}
				searchableColumns={['maker', 'type', 'status']}
				onAction={handleAction}
				onRowClick={(id) => alert(`Clicked row with ID: ${id}`)}
			/>
		</div>
	{/snippet}
</Story>

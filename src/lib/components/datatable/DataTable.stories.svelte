<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		DataTable,
		type DataTableColumn,
		type DataTableSort,
		type DataTableActionItem
	} from './index';
	import { Badge } from '../badge';
	import { Button } from '../button';
	import { Input } from '../input';
	import {
		localSorting,
		rowActions,
		resizeColumns,
		manualSorting,
		scrollPageAndTable,
		scrollContainer,
		wrapping,
		fitsViewport,
		widthChanges,
		sortChanges
	} from './DataTable.interactions';
	type Car = {
		id: number;
		manufacturer: string;
		model: string;
		year: number;
		status: 'active' | 'pending' | 'inactive';
	};

	const cars: Car[] = [
		{ id: 1, manufacturer: 'Toyota', model: 'Corolla', year: 2017, status: 'active' },
		{ id: 2, manufacturer: 'Ford', model: 'Focus', year: 2018, status: 'pending' },
		{ id: 3, manufacturer: 'Volvo', model: 'XC40', year: 2019, status: 'inactive' },
		{ id: 4, manufacturer: 'Saab', model: '900', year: 1993, status: 'active' }
	];
	const manyCars: Car[] = Array.from({ length: 8 }, (_, batch) =>
		cars.map((car, index) => ({ ...car, id: batch * cars.length + index + 1 }))
	).flat();
	const columns = [
		{ name: 'id', displayName: 'ID', type: 'number' },
		{ name: 'manufacturer', displayName: 'Manufacturer', type: 'string' },
		{ name: 'model', displayName: 'Model', type: 'string' },
		{ name: 'year', displayName: 'Year', type: 'number' }
	] satisfies DataTableColumn<Car>[];
	const customColumns = (): DataTableColumn<Car>[] => [
		...columns.map((column) => ({ ...column, sortable: column.name !== 'id' })),
		{ name: 'status', displayName: 'Status', type: 'string', render: statusBadge }
	];
	const resizableColumns = columns.map((column) => ({
		...column,
		minWidth: 60,
		maxWidth: column.name === 'manufacturer' ? 400 : 240
	}));
	const serverColumns = columns.map((column) => ({ ...column, sortable: true }));
	const actions: DataTableActionItem[] = [
		{ label: 'Edit', value: 'edit' },
		{ label: 'Delete', value: 'delete', disabled: true }
	];

	const paragraph =
		'Searches indexed documents, ranks matching results, and returns a concise summary with source links. Requests share a bounded execution window so slow providers can be retried without delaying the remaining results.';
	const wrappingRows = [
		{
			id: 1,
			name: 'Mina Patel',
			owner: 'Jane Smith',
			updated: 'Oct 21, 2026',
			description: paragraph
		}
	];
	const wrappingColumns: DataTableColumn<(typeof wrappingRows)[number]>[] = [
		{ name: 'name', displayName: 'Name' },
		{ name: 'owner', displayName: 'Owner' },
		{ name: 'updated', displayName: 'Last updated' },
		{ name: 'description', displayName: 'Description' }
	];
	const pageColumns = columns.map((column) => ({ ...column, minWidth: 100 }));
	const { Story } = defineMeta({
		title: 'Components/DataTable',
		component: DataTable,
		parameters: { layout: 'padded' },
		tags: ['autodocs'],
		args: { items: cars, columns, idField: 'id' }
	});
</script>

<script lang="ts">
	let columnWidths = $state<Partial<Record<keyof Car, number>>>({
		id: 70,
		manufacturer: 240,
		model: 150,
		year: 120
	});
	let fluidWidths = $state<Partial<Record<keyof Car, number>>>({});
	let sort = $state<DataTableSort<keyof Car> | null>(null);
	let lastInteraction = $state('');
</script>

{#snippet statusBadge(value: string | number)}<Badge text={String(value)} />{/snippet}

<Story name="Basic" />
<Story name="Basic interactions" tags={['interaction', '!dev', '!autodocs']} play={localSorting} />

{#snippet customCellsExample()}
	<div class="story">
		<DataTable
			items={cars}
			columns={customColumns()}
			idField="id"
			hoverable
			primaryColumn
			{actions}
			onAction={(id, action) => (lastInteraction = `${action} car ${id}`)}
			onRowClick={(id) => (lastInteraction = `Selected car ${id}`)}
		/>
		{#if lastInteraction}<output>{lastInteraction}</output>{/if}
	</div>
{/snippet}
<Story name="Custom Cells And Row Actions" template={customCellsExample} />
<Story
	name="Custom Cells And Row Actions interactions"
	tags={['interaction', '!dev', '!autodocs']}
	play={rowActions}
	template={customCellsExample}
/>

{#snippet resizingExample()}
	<div class="story">
		<DataTable
			items={cars}
			columns={resizableColumns}
			idField="id"
			density="compact"
			columnDividers
			resizableColumns
			bind:columnWidths
			onColumnWidthsChange={widthChanges}
		/>
	</div>
{/snippet}
<Story name="Resizable Columns" template={resizingExample} />
<Story
	name="Resizable Columns interactions"
	tags={['interaction', '!dev', '!autodocs']}
	play={resizeColumns}
	template={resizingExample}
/>

{#snippet manualSortingExample()}
	<div class="story">
		<DataTable
			items={cars}
			columns={serverColumns}
			idField="id"
			sortingMode="manual"
			bind:sort
			onSortChange={sortChanges}
		/>
	</div>
{/snippet}
<Story name="Server Sorting" template={manualSortingExample} />
<Story
	name="Server Sorting interactions"
	tags={['interaction', '!dev', '!autodocs']}
	play={manualSorting}
	template={manualSortingExample}
/>

{#snippet containerScrollingExample()}
	<div class="scroll-container">
		<DataTable items={manyCars} {columns} idField="id" hoverable stickyHeader />
	</div>
{/snippet}
<Story name="Container Scrolling" template={containerScrollingExample} />
<Story
	name="Container Scrolling interactions"
	tags={['interaction', '!dev', '!autodocs']}
	template={containerScrollingExample}
	play={scrollContainer}
/>

{#snippet pageScrollingExample()}
	<div class="page-scroll">
		<div class="sticky-filter-bar">
			<Input placeholder="Search" aria-label="Search table" />
			<Button
				label="Refresh"
				aria-label="Refresh widths"
				variant="secondary"
				size="small"
				onclick={() => (fluidWidths = { ...fluidWidths })}
			/>
		</div>
		<div class="page-content">
			<DataTable
				items={manyCars}
				columns={pageColumns}
				bind:columnWidths={fluidWidths}
				onColumnWidthsChange={widthChanges}
				idField="id"
				density="compact"
				columnDividers
				resizableColumns
				stickyHeader
				scrollMode="page"
				stickyHeaderOffset={48}
			/>
			<div class="page-end" aria-hidden="true"></div>
		</div>
	</div>
{/snippet}
<Story name="Page Scrolling" template={pageScrollingExample} />
<Story
	name="Page Scrolling interactions"
	tags={['interaction', '!dev', '!autodocs']}
	play={scrollPageAndTable}
	template={pageScrollingExample}
/>

{#snippet wrappingExample()}
	<div class="story"><DataTable items={wrappingRows} columns={wrappingColumns} idField="id" /></div>
{/snippet}
<Story name="Wrapping" template={wrappingExample} />
<Story
	name="Wrapping interactions"
	tags={['interaction', '!dev', '!autodocs']}
	play={wrapping}
	template={wrappingExample}
/>

<Story name="Loading" args={{ items: [], loading: true }} />
<Story name="Empty" args={{ items: [] }} />
<Story
	name="Empty interactions"
	tags={['interaction', '!dev', '!autodocs']}
	args={{ items: [], emptyMessage: paragraph }}
	play={fitsViewport}
/>

<style lang="scss">
	.story {
		display: grid;
		gap: 16px;
		max-width: 720px;
	}

	.scroll-container {
		display: flex;
		flex-direction: column;
		height: 320px;
	}

	.page-scroll {
		min-width: 0;
		max-width: 720px;
		height: 400px;
		overflow: hidden auto;
	}

	.page-content {
		display: grid;
		gap: 16px;
		min-width: 0;
	}

	.page-end {
		min-height: 400px;
	}

	.sticky-filter-bar {
		position: sticky;
		top: 0;
		z-index: 3;
		display: flex;
		gap: 8px;
		align-items: center;
		height: 48px;
		background: var(--color-background-base);
	}
</style>

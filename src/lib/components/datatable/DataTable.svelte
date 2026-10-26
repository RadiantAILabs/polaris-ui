<script lang="ts" module>
	import type { TableProps } from '../table/index';
	import type { Snippet } from 'svelte';
	import type { DataTableActionItem } from './DataTableActions.svelte';
	import {
		sizeColumns,
		resizePair,
		pairBounds,
		clampWidth,
		MIN_COLUMN_WIDTH,
		MAX_COLUMN_WIDTH,
		type ColumnDimensions
	} from './column-sizing';
	import {
		tableFeatures,
		columnSizingFeature,
		columnResizingFeature,
		rowSortingFeature,
		createSortedRowModel
	} from '@tanstack/svelte-table';
	const features = tableFeatures({
		columnSizingFeature,
		columnResizingFeature,
		rowSortingFeature,
		sortedRowModel: createSortedRowModel()
	});
	const ACTIONS_WIDTH = 56;
	const BORDER_WIDTH = 2;

	/** A column's data type. When set to `number` the column will display tabular figures. */
	export type ColumnType = 'string' | 'number' | 'date' | 'boolean';

	export interface DataTableColumn<T extends Record<string, unknown>> extends ColumnDimensions {
		/** The key from the data object to display in this column */
		name: keyof T;
		/** The header text to display for this column */
		displayName: string;
		/** Optional custom render function for the cell content */
		render?: Snippet<[value: T[keyof T]]>;
		/**
		 * The column's data type. Sets the default sort comparator (see `sortable`);
		 * `'number'` also renders the column with tabular figures.
		 */
		type?: ColumnType;
		/** Enable sorting. Local mode defaults to columns with a type or comparator; manual mode requires true. */
		sortable?: boolean;
		/** Header/cell alignment. Defaults to `'start'`; `'end'` right-aligns. */
		align?: 'start' | 'end';
		/** Custom comparator for non-nullish values. Null/undefined sort last ascending and first descending. Takes precedence over `type`. */
		sortFn?: (a: T[keyof T], b: T[keyof T]) => number;
		/** Keep cell contents on one line and truncate overflow. Defaults to false. */
		truncate?: boolean;
	}

	export interface DataTableSort<K extends PropertyKey = string> {
		column: K;
		direction: 'asc' | 'desc';
	}

	export interface DataTableProps<
		T extends Record<string, unknown>,
		K extends keyof T = keyof T
	> extends TableProps {
		/** Page mode sticks a separate header while keeping horizontal overflow inside the table. */
		scrollMode?: 'container' | 'page';
		/** Page-sticky header offset in pixels, for a toolbar above the table. */
		stickyHeaderOffset?: number;
		/** Array of data objects to display in the table */
		items: T[];
		/** Column configuration defining how data should be displayed */
		columns: DataTableColumn<T>[];
		/** The field in each item to use as a unique identifier */
		idField: K;
		/** Optional callback fired when a row is clicked. Receives the item's ID */
		onRowClick?: (id: T[K]) => void;
		/** Optional array of action items to display in each row */
		actions?: DataTableActionItem[];
		/** Optional callback fired when an action is triggered. Receives the item ID and action value */
		onAction?: (itemId: T[K], actionValue: string) => void;
		/** Manual mode emits sort changes without reordering the supplied page. */
		sortingMode?: 'local' | 'manual';
		/** Current sort; bind to retain local sort changes. */
		sort?: DataTableSort<keyof T> | null;
		/** Reports the requested sort in both local and manual modes. */
		onSortChange?: (sort: DataTableSort<keyof T>) => void;
		/** Preferred pixel widths. Columns adapt to the viewport within their bounds; overflowing page tables resize columns independently. */
		columnWidths?: Partial<Record<keyof T, number>>;
		/** Fires once per completed resize that changes rendered widths; returning to the initial widths does not fire. */
		onColumnWidthsChange?: (widths: Partial<Record<keyof T, number>>) => void;
		/** Enable mouse, touch and keyboard resizing at the dividers between columns. */
		resizableColumns?: boolean;
		/** Replace body rows with initial-loading placeholders. */
		loading?: boolean;
		/** Optional id of the currently-selected row. */
		selectedId?: T[K] | null;
		/** Message shown when the table has no data. */
		emptyMessage?: string;
	}
</script>

<script lang="ts" generics="T extends Record<string, unknown>, K extends keyof T = keyof T">
	import {
		createTable,
		type ColumnDef,
		type ColumnSizingState,
		type Header
	} from '@tanstack/svelte-table';
	import { untrack } from 'svelte';
	import { Table } from '../table';
	import { Skeleton } from '../skeleton';
	import ColumnResizeHandle from './ColumnResizeHandle.svelte';
	import DataTableActions from './DataTableActions.svelte';
	let {
		ref = $bindable(null),
		items,
		columns,
		idField,
		onRowClick,
		actions,
		onAction,
		sortingMode = 'local',
		sort = $bindable(null),
		onSortChange,
		columnWidths = $bindable({}),
		onColumnWidthsChange,
		resizableColumns = false,
		loading = false,
		selectedId = null,
		emptyMessage = 'No data available',
		stickyHeader = false,
		scrollMode = 'container',
		stickyHeaderOffset = 0,
		style: customStyle,
		...restProps
	}: DataTableProps<T, K> = $props();
	let headerRoot: HTMLDivElement | undefined = $state();
	let scrollbar: HTMLDivElement | undefined = $state();
	let viewportWidth = $state(0);
	const pageSticky = $derived(stickyHeader && scrollMode === 'page');
	const tableBorderWidth = $derived(stickyHeader && !pageSticky ? 0 : BORDER_WIDTH);
	const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
	const savedSizing = $derived<ColumnSizingState>(
		Object.fromEntries(
			columns.flatMap((column) => {
				const width = columnWidths[column.name];
				return width === undefined ? [] : [[String(column.name), clampWidth(column, width)]];
			})
		)
	);
	let draft = $state<ColumnSizingState>();
	// Keep space explicitly added by resizing an overflowing page table.
	let overflowWidth = $state(0);
	const availableWidth = $derived(
		viewportWidth - tableBorderWidth - (actions?.length ? ACTIONS_WIDTH : 0)
	);
	const sizing = $derived(
		sizeColumns(
			columns,
			draft ?? savedSizing,
			viewportWidth
				? Math.max(
						availableWidth,
						scrollMode === 'page'
							? draft
								? Object.values(draft).reduce((sum, width) => sum + width, 0)
								: overflowWidth
							: 0
					)
				: undefined
		)
	);

	const definitions = $derived<ColumnDef<typeof features, T>[]>(
		columns.map((column) => ({
			id: String(column.name),
			accessorFn: (row) => row[column.name],
			minSize: column.minWidth ?? MIN_COLUMN_WIDTH,
			maxSize: column.maxWidth ?? MAX_COLUMN_WIDTH,
			enableSorting:
				sortingMode === 'manual'
					? column.sortable === true
					: (column.sortable ?? (column.type !== undefined || column.sortFn !== undefined)),
			sortFn: (a, b) => {
				const left = a.original[column.name],
					right = b.original[column.name];
				if (left == null || right == null) return left == null ? (right == null ? 0 : 1) : -1;
				if (column.sortFn) return column.sortFn(left, right);
				if (column.type === 'number' || column.type === 'boolean')
					return Number(left) - Number(right);
				if (column.type === 'date')
					return (
						new Date(left as string | number | Date).getTime() -
						new Date(right as string | number | Date).getTime()
					);
				return collator.compare(String(left), String(right));
			}
		}))
	);
	const sorting = $derived(
		sort ? [{ id: String(sort.column), desc: sort.direction === 'desc' }] : []
	);
	let resizeStart: { index: number; sizes: ColumnSizingState; overflow: boolean } | undefined;

	const table = createTable({
		features,
		get data() {
			return items;
		},
		get columns() {
			return definitions;
		},
		getRowId: (row) => String(row[idField]),
		get manualSorting() {
			return sortingMode === 'manual';
		},
		get enableColumnResizing() {
			return resizableColumns;
		},
		columnResizeMode: 'onChange',
		enableMultiSort: false,
		enableSortingRemoval: false,
		state: {
			get columnSizing() {
				return sizing;
			},
			get sorting() {
				return sorting;
			}
		},
		onColumnSizingChange: (updater) => {
			if (!resizeStart) return;
			const { index, sizes, overflow } = resizeStart;
			const column = columns[index]!,
				adjacent = columns[index + 1]!;
			const next = typeof updater === 'function' ? updater(sizing) : updater;
			const id = String(column.name);
			draft = {
				...draft,
				...resizePair(column, adjacent, sizes, next[id]! - sizes[id]!, overflow)
			};
		},
		onSortingChange: (updater) => {
			const next = (typeof updater === 'function' ? updater(sorting) : updater)[0];
			const column = columns.find((column) => String(column.name) === next?.id);
			if (!next || !column) return;
			sort = { column: column.name, direction: next.desc ? 'desc' : 'asc' };
			onSortChange?.(sort);
		}
	});
	const headers = $derived(table.getHeaderGroups()[0]?.headers ?? []);
	const rows = $derived(table.getRowModel().rows);
	const tableWidth = $derived(
		table.getTotalSize() + (actions?.length ? ACTIONS_WIDTH : 0) + tableBorderWidth
	);
	const overflowResize = $derived(scrollMode === 'page' && tableWidth - viewportWidth > 0.5);
	const tableStyle = $derived(
		`${customStyle ?? ''}; table-layout: fixed; min-width: 0; width: ${tableWidth}px`
	);
	function saveWidths(next: ColumnSizingState) {
		if (overflowResize) overflowWidth = Object.values(next).reduce((sum, width) => sum + width, 0);
		const widths: Partial<Record<keyof T, number>> = {};
		for (const column of columns)
			widths[column.name] = clampWidth(column, next[String(column.name)]!);
		columnWidths = widths;
		onColumnWidthsChange?.(columnWidths);
	}
	function beginResize(header: Header<typeof features, T>, event: MouseEvent | TouchEvent) {
		if (event instanceof MouseEvent) {
			if (event.button !== 0) return;
			event.preventDefault();
		} else if (event.touches.length !== 1) return;
		const index = columns.findIndex((column) => String(column.name) === header.column.id);
		const column = columns[index],
			adjacent = columns[index + 1];
		if (!column || !adjacent) return;
		resizeStart = { index, sizes: sizing, overflow: overflowResize };
		draft = { ...sizing, ...resizePair(column, adjacent, sizing, 0, overflowResize) };
		header.getResizeHandler()(event);
	}
	function commitResize() {
		const initial = resizeStart;
		resizeStart = undefined;
		if (!initial) return;
		const column = columns[initial.index],
			adjacent = columns[initial.index + 1];
		if (column && adjacent && draft) {
			const id = String(column.name);
			if (draft[id] !== Math.round(initial.sizes[id]!)) saveWidths(draft);
		}
		draft = undefined;
	}

	const resizingColumn = $derived(table.atoms.columnResizing.get().isResizingColumn);
	$effect(() => {
		if (!resizingColumn) untrack(commitResize);
	});
	function resizeWithKeyboard(header: Header<typeof features, T>, delta: number) {
		const index = columns.findIndex((column) => String(column.name) === header.column.id);
		const column = columns[index],
			adjacent = columns[index + 1];
		if (!column || !adjacent) return;
		const next = resizePair(column, adjacent, sizing, delta, overflowResize);
		if (next[header.column.id] !== Math.round(header.getSize())) saveWidths({ ...sizing, ...next });
	}

	$effect(() => {
		if (!ref) return;
		const viewport = ref.parentElement;
		if (!viewport) return;
		const measure = () => {
			viewportWidth = viewport.clientWidth;
		};
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(viewport);
		return () => observer.disconnect();
	});
	$effect(() => {
		if (!pageSticky || !ref || !headerRoot) return;
		const body = ref.parentElement;
		const header = headerRoot.querySelector<HTMLElement>('.table__viewport');
		if (!body || !header) return;
		const viewports = [body, header, ...(scrollbar ? [scrollbar] : [])];
		let left = body.scrollLeft;
		const synchronize = (source: HTMLElement) => {
			if (source.scrollLeft === left) return;
			left = source.scrollLeft;
			for (const viewport of viewports) if (viewport !== source) viewport.scrollLeft = left;
		};
		for (const viewport of viewports) viewport.scrollLeft = left;
		const handlers = viewports.map((viewport) => {
			const handler = () => synchronize(viewport);
			viewport.addEventListener('scroll', handler, { passive: true });
			return () => viewport.removeEventListener('scroll', handler);
		});
		const wheel = (event: WheelEvent) => {
			const delta = event.deltaX || (event.shiftKey ? event.deltaY : 0);
			if (!delta) return;
			const before = body.scrollLeft;
			body.scrollLeft += delta;
			synchronize(body);
			if (body.scrollLeft !== before) event.preventDefault();
		};
		header.addEventListener('wheel', wheel, { passive: false });
		return () => {
			for (const cleanup of handlers) cleanup();
			header.removeEventListener('wheel', wheel);
		};
	});
</script>

{#snippet columnGroup()}
	<colgroup>
		{#each headers as header (header.id)}<col style:width={`${header.getSize()}px`} />{/each}
		{#if actions?.length}<col style:width={`${ACTIONS_WIDTH}px`} />{/if}
	</colgroup>
{/snippet}
{#snippet tableHeading(interactive: boolean)}
	<Table.Header class={interactive ? undefined : 'data-table__accessible-header'}>
		{#each headers as header, index (header.id)}
			{@const column = columns[index]!}
			<Table.HeaderCell
				sortable={interactive && header.column.getCanSort()}
				sortDirection={header.column.getIsSorted() || null}
				aria-sort={(!pageSticky || !interactive) && header.column.getIsSorted()
					? header.column.getIsSorted() === 'asc'
						? 'ascending'
						: 'descending'
					: undefined}
				onSort={interactive && header.column.getCanSort()
					? (direction) => header.column.toggleSorting(direction === 'desc')
					: undefined}
				columnName={column.displayName}
				aria-label={column.displayName}
				alignment={column.align ?? 'start'}
			>
				{column.displayName}
				{#snippet trailing()}
					{#if interactive && header.column.getCanResize() && index < columns.length - 1}
						{@const bounds = overflowResize
							? {
									minWidth: column.minWidth ?? MIN_COLUMN_WIDTH,
									maxWidth: column.maxWidth ?? MAX_COLUMN_WIDTH
								}
							: pairBounds(
									column,
									columns[index + 1]!,
									Math.round(header.getSize() + headers[index + 1]!.getSize())
								)}
						<ColumnResizeHandle
							label={`Resize ${column.displayName}`}
							width={header.getSize()}
							min={bounds.minWidth}
							max={bounds.maxWidth}
							resizing={header.column.getIsResizing()}
							onStart={(event) => beginResize(header, event)}
							onResize={(delta) => resizeWithKeyboard(header, delta)}
						/>
					{/if}
				{/snippet}
			</Table.HeaderCell>
		{/each}
		{#if actions?.length}<Table.HeaderCell class="data-table__actions" />{/if}
	</Table.Header>
{/snippet}
<div
	class="data-table"
	class:data-table--sticky-header={stickyHeader && scrollMode === 'container'}
	class:data-table--page-sticky={pageSticky}
	data-resizing={resizingColumn || undefined}
>
	{#if pageSticky}
		<div
			class="data-table__page-header"
			bind:this={headerRoot}
			style:top={`${stickyHeaderOffset}px`}
		>
			<Table.Root
				role="presentation"
				style={tableStyle}
				density={restProps.density}
				columnDividers={restProps.columnDividers}
			>
				{@render columnGroup()}{@render tableHeading(true)}
			</Table.Root>
		</div>
	{/if}
	<Table.Root
		bind:ref
		style={tableStyle}
		aria-busy={loading}
		stickyHeader={stickyHeader && !pageSticky}
		{...restProps}
	>
		{@render columnGroup()}{@render tableHeading(!pageSticky)}
		<Table.Body isEmpty={!loading && rows.length === 0} {emptyMessage}>
			{#if loading}
				{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as row (row)}
					<Table.BodyRow>
						{#each columns as column (column.name)}<Table.BodyCell
								><Skeleton style="width: 55%;" /></Table.BodyCell
							>{/each}
						{#if actions?.length}<Table.BodyCell />{/if}
					</Table.BodyRow>
				{/each}
			{:else}
				{#each rows as row (row.id)}
					<Table.BodyRow
						onClick={onRowClick ? () => onRowClick(row.original[idField]) : undefined}
						data-state={selectedId != null && row.original[idField] === selectedId
							? 'selected'
							: undefined}
					>
						{#each columns as column (column.name)}
							<Table.BodyCell
								tabularNumbers={column.type === 'number' || column.type === 'date'}
								alignment={column.align ?? 'start'}
								style={column.truncate ? 'white-space: nowrap' : 'white-space: normal'}
							>
								<div class:data-table__truncated={column.truncate}>
									{#if column.render}{@render column.render(row.original[column.name])}{:else}{row
											.original[column.name]}{/if}
								</div>
							</Table.BodyCell>
						{/each}
						{#if actions?.length}<Table.BodyCell class="data-table__actions"
								><DataTableActions
									{actions}
									onAction={(value) => onAction?.(row.original[idField], value)}
								/></Table.BodyCell
							>{/if}
					</Table.BodyRow>
				{/each}
			{/if}
		</Table.Body>
	</Table.Root>
	{#if pageSticky && tableWidth - viewportWidth > 0.5 && viewportWidth > 0}
		<!-- The native scroll region must be keyboard reachable. -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class="data-table__scrollbar"
			bind:this={scrollbar}
			tabindex="0"
			role="group"
			aria-label="Scroll table horizontally"
		>
			<div style:width={`${tableWidth}px`}></div>
		</div>
	{/if}
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;
	@use '../../styles/accessibility';

	.data-table {
		display: contents;
	}

	.data-table[data-resizing],
	.data-table[data-resizing] :global(*) {
		cursor: col-resize;
		user-select: none;
	}

	.data-table--page-sticky {
		display: block;
		min-width: 0;

		> :global(.table) > :global(.table__viewport) {
			scrollbar-width: none;
		}

		> :global(.table) > :global(.table__viewport)::-webkit-scrollbar {
			display: none;
		}

		> :global(.table) :global(table) {
			border-top: 0;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		}
	}

	.data-table--sticky-header {
		display: flex;
		flex: 0 1 auto;
		flex-direction: column;
		min-height: 0;
		max-height: 100%;
	}

	.data-table__page-header {
		position: sticky;
		z-index: 2;
		background: var(--color-background-base);

		> :global(.table) > :global(.table__viewport) {
			overflow: hidden;
		}

		:global(table) {
			border-bottom: 0;
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
		}
	}

	.data-table :global(.data-table__accessible-header) {
		@include accessibility.visually-hidden;
	}

	.data-table :global(.data-table__actions) {
		padding-inline: 12px;
		text-align: center;
		white-space: nowrap;
	}

	.data-table :global(tr:has([data-row-actions-open]):not([data-state='selected'])) {
		background-color: var(--color-table-cell-background-hover);
	}

	.data-table__truncated {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.data-table__truncated:focus-within {
		overflow: visible;
	}

	.data-table__scrollbar {
		position: sticky;
		bottom: 0;
		z-index: 3;
		height: 12px;
		overflow: auto hidden;
		scrollbar-width: thin;
		background: var(--color-background-base);

		> div {
			height: 1px;
		}

		&::-webkit-scrollbar {
			height: 10px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background: var(--color-border-strong);
			border-radius: 5px;
		}
	}
</style>

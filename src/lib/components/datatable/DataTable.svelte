<script lang="ts" module>
	import type { TableProps } from '../table/index';
	import type { Snippet } from 'svelte';
	import type { DataTableActionItem } from './DataTableActions.svelte';

	/** A column's data type. When set to `number` the column will display tabular figures. */
	export type ColumnType = 'string' | 'number' | 'date' | 'boolean';

	/**
	 * Per-column filter; its presence adds a control above the table and makes the
	 * column filterable. `kind` picks the control. Both kinds match on the column's
	 * underlying value unless overridden with `accessor`.
	 */
	export type ColumnFilter<T> =
		| {
				/** Free-text control; matches rows whose value contains the query (case-insensitive). */
				kind: 'search';
				/**
				 * Filter on a value other than the one shown in the cell, e.g. a nested field or a
				 * raw value behind formatted or custom-rendered content. Defaults to the cell's text.
				 */
				accessor?: (item: T) => string;
				/** Optional placeholder text shown after the column label while the field is empty. */
				placeholder?: string;
		  }
		| {
				/** Multi-select dropdown; matches rows whose value equals any chosen option. */
				kind: 'select';
				/**
				 * Filter on a value other than the one shown in the cell, e.g. a nested field or a
				 * raw value behind formatted or custom-rendered content. Defaults to the cell's text.
				 */
				accessor?: (item: T) => string;
				/**
				 * The dropdown choices. Defaults to the distinct values in `items`, so it's only
				 * needed with `onFilterChange`, where `items` doesn't hold the full data set.
				 */
				options?: (string | { label: string; value: string })[];
		  };

	export interface DataTableColumn<T extends Record<string, unknown>> {
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
		/** Whether this column supports sorting. Defaults to `true` when a `type` or `sortFn` exists; `false` opts out. */
		sortable?: boolean;
		/** Header/cell alignment. Defaults to `'start'`; `'end'` right-aligns. */
		align?: 'start' | 'end';
		/** Custom sort function. Takes precedence over the `type` comparator if both are provided */
		sortFn?: (a: T[keyof T], b: T[keyof T]) => number;
		/** Filter config; its presence makes the column filterable. See `ColumnFilter`. */
		filter?: ColumnFilter<T>;
		/** Whether this column should shrink to fit its content (useful for action columns) */
		hugContent?: boolean;
		/** Whether this column should expand into available space. */
		fillRemaining?: boolean;
		/** Allow column to shrink below its content width. Will lead to ellipsis truncation. */
		shrinkBelowContent?: boolean;
		/** Minimum width for the column (e.g., "200px", "10rem") */
		minWidth?: string;
		/** Maximum width for the column (e.g., "400px", "20rem") */
		maxWidth?: string;
		/** Fixed width for the column (e.g., "150px", "10rem") */
		width?: string;
	}

	export interface DataTableProps<
		T extends Record<string, unknown>,
		K extends keyof T = keyof T
	> extends TableProps {
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
		/**
		 * Overrides the default in-memory filtering. When set, the table skips its
		 * built-in filtering and expects the caller to filter `items` instead. Especially
		 * useful for paginated tables, where filter changes drive a server-side refetch.
		 */
		onFilterChange?: (filters: Partial<Record<keyof T, string | string[]>>) => void;
		/**
		 * Current filter value per column, keyed by column name.
		 */
		filters?: Partial<Record<keyof T, string | string[]>>;
		/** Minimum width for the entire table. Below this width, table will scroll horizontally */
		minWidth?: string;
		/** Optional id of the currently-selected row. */
		selectedId?: T[K] | null;
		/** Message shown when the table has no data. */
		emptyMessage?: string;
		/** Message shown when active filters match no rows. */
		noResultsMessage?: string;
	}
</script>

<script lang="ts" generics="T extends Record<string, unknown>, K extends keyof T = keyof T">
	import { onDestroy } from 'svelte';
	import { Table } from '../table/index';
	import DropdownSelector from '../dropdown-selector';
	import { DataTableActions } from './index';
	import DataTableFilterField from './DataTableFilterField.svelte';

	type FilterValue = string | string[];

	const FILTER_CHANGE_DEBOUNCE_MS = 300;

	let {
		ref = $bindable(null),
		items,
		columns,
		idField,
		onRowClick,
		actions,
		onAction,
		onFilterChange,
		filters = $bindable({}),
		minWidth,
		selectedId = null,
		emptyMessage = 'No data available',
		noResultsMessage = 'No results found',
		stickyHeader = false,
		...restProps
	}: DataTableProps<T, K> = $props();

	// Create a type-safe column map for O(1) lookup
	const columnMap = $derived(new Map(columns.map((col) => [col.name, col] as const)));
	const filterableColumns = $derived(columns.filter((col) => col.filter != null));
	const filtersControlled = $derived(onFilterChange != null);

	// Sorting state
	let sortState = $state({
		column: null as keyof T | null,
		direction: null as 'asc' | 'desc' | null
	});

	let filterChangeTimer: ReturnType<typeof setTimeout> | undefined;

	onDestroy(() => {
		if (filterChangeTimer != null) clearTimeout(filterChangeTimer);
	});

	const hasActiveFilters = $derived(activeFilters().length > 0);

	function activeFilters(): [keyof T, FilterValue][] {
		const active: [keyof T, FilterValue][] = [];
		for (const column of filterableColumns) {
			const value = filterValue(column);
			if (value == null) continue;
			if (Array.isArray(value) ? value.length > 0 : value.trim() !== '') {
				active.push([column.name, value]);
			}
		}
		return active;
	}

	function setColumnFilter(column: keyof T, value: FilterValue): void {
		filters = { ...filters, [column]: value };
		if (!onFilterChange) return;
		if (filterChangeTimer != null) clearTimeout(filterChangeTimer);
		filterChangeTimer = setTimeout(() => {
			onFilterChange?.(
				Object.fromEntries(activeFilters()) as Partial<Record<keyof T, FilterValue>>
			);
		}, FILTER_CHANGE_DEBOUNCE_MS);
	}

	function columnFilterText(item: T, column: DataTableColumn<T>): string {
		const accessor = column.filter?.accessor;
		return accessor ? accessor(item) : String(item[column.name] ?? '');
	}

	const selectOptionsByColumn = $derived(
		new Map(
			filterableColumns
				.filter((column) => column.filter?.kind === 'select')
				.map((column) => {
					const filter = column.filter as Extract<ColumnFilter<T>, { kind: 'select' }>;
					const options = (
						filter.options ?? [...new Set(items.map((item) => columnFilterText(item, column)))]
					)
						.map((option) =>
							typeof option === 'string' ? { value: option, label: option } : option
						)
						.filter((option) => option.value !== '')
						.sort((a, b) => a.label.localeCompare(b.label));
					return [column.name, options] as const;
				})
		)
	);

	function filterValue(column: DataTableColumn<T>): FilterValue | undefined {
		const value = filters[column.name];
		switch (column.filter?.kind) {
			case 'select':
				return Array.isArray(value) ? value : undefined;
			case 'search':
				return typeof value === 'string' ? value : undefined;
			default:
				return undefined;
		}
	}

	function selectedValues(column: DataTableColumn<T>): string[] {
		return (filterValue(column) as string[] | undefined) ?? [];
	}

	// Builds the default comparator for a column of the given type.
	const getSortFunction = (type: ColumnType) => {
		return (a: unknown, b: unknown): number => {
			if (a == null && b == null) return 0;
			if (a == null) return 1;
			if (b == null) return -1;

			switch (type) {
				case 'number':
					return Number(a) - Number(b);
				case 'date':
					return new Date(a as string).getTime() - new Date(b as string).getTime();
				case 'boolean':
					return Number(a) - Number(b);
				case 'string':
					return new Intl.Collator(undefined, {
						numeric: false,
						sensitivity: 'base'
					}).compare(String(a), String(b));
			}
		};
	};

	function sortComparatorFor(column: DataTableColumn<T>) {
		if (column.sortFn) return column.sortFn;
		return column.type ? getSortFunction(column.type) : null;
	}

	function isColumnSortable(column: DataTableColumn<T>): boolean {
		return sortComparatorFor(column) != null && (column.sortable ?? true);
	}

	function columnAlign(column: DataTableColumn<T>): 'start' | 'end' {
		return column.align ?? 'start';
	}

	// Filter items by the active per-column filters. When filtering is controlled
	// the caller owns it, so `items` is passed through unchanged.
	const filteredItems = $derived.by(() => {
		if (filtersControlled) return items;
		const filters = activeFilters();
		if (filters.length === 0) return items;
		return items.filter((item) =>
			filters.every(([columnName, filterValue]) => {
				const column = columnMap.get(columnName);
				if (!column) return true;
				const text = columnFilterText(item, column);
				return Array.isArray(filterValue)
					? filterValue.includes(text)
					: text.toLowerCase().includes(filterValue.toLowerCase().trim());
			})
		);
	});

	// Handle sort for a specific column
	const handleSort = (columnName: keyof T, direction: 'asc' | 'desc') => {
		// Update sort state
		sortState = { column: columnName, direction };
	};

	// Final processed items (filtered and sorted)
	const processedItems = $derived.by(() => {
		let result = filteredItems;

		// Apply sorting if active.
		if (sortState.column && sortState.direction) {
			const currentColumn = columnMap.get(sortState.column);
			if (!currentColumn) {
				return result;
			}
			const sortFn = sortComparatorFor(currentColumn);

			if (sortFn) {
				result = [...result].sort((a, b) => {
					const comparison = sortFn(a[sortState.column!], b[sortState.column!]);
					return sortState.direction === 'asc' ? comparison : -comparison;
				});
			}
		}

		return result;
	});

	// Generate style string for a column based on width properties
	function getColumnStyle(column: DataTableColumn<T>): string | undefined {
		const styles: string[] = [];

		// Width properties
		if (column.hugContent) {
			// Hug content: prevent wrapping, column will be as narrow as possible
			styles.push('width: 1px', 'white-space: nowrap');
		} else if (column.fillRemaining) {
			// Fill remaining space: give this column priority for expansion
			styles.push('width: 100%');
		} else if (column.width) {
			// Fixed width
			styles.push(`width: ${column.width}`);
		}
		// Otherwise: no width set, auto-sizes to content

		// Allow shrinking below content width
		if (column.shrinkBelowContent) {
			// Setting max-width: 0 forces the column to shrink as much as possible
			// Combined with overflow: hidden and text-overflow: ellipsis, this enables aggressive shrinking
			styles.push('overflow: hidden', 'text-overflow: ellipsis', 'white-space: nowrap');
			styles.push('max-width: 0');
		}

		// Min/max width constraints
		if (column.minWidth) {
			styles.push(`min-width: ${column.minWidth}`);
		}
		if (column.maxWidth && !column.shrinkBelowContent) {
			// Only apply maxWidth if shrinkBelowContent isn't set
			styles.push(`max-width: ${column.maxWidth}`);
		}

		return styles.length > 0 ? styles.join('; ') : undefined;
	}
</script>

<div class="data-table" class:data-table--sticky-header={stickyHeader}>
	{#if filterableColumns.length > 0}
		<div class="data-table-filters">
			{#each filterableColumns as column (column.name)}
				{#if column.filter?.kind === 'select'}
					<DropdownSelector
						type="multiple"
						items={selectOptionsByColumn.get(column.name) ?? []}
						value={selectedValues(column)}
						onValueChange={(value: string[]) => setColumnFilter(column.name, value)}
						clearable
						label={column.displayName}
						showAsBadges={false}
						fullWidth={false}
					/>
				{:else if column.filter?.kind === 'search'}
					<DataTableFilterField
						label={column.displayName}
						value={(filterValue(column) as string | undefined) ?? ''}
						oninput={(e) =>
							setColumnFilter(column.name, (e.currentTarget as HTMLInputElement).value)}
						placeholder={column.filter.placeholder}
						clearable
						aria-label={`Search by ${column.displayName.toLowerCase()}`}
					/>
				{/if}
			{/each}
		</div>
	{/if}

	<Table.Root
		bind:ref
		style={minWidth ? `min-width: ${minWidth}` : undefined}
		{stickyHeader}
		{...restProps}
	>
		<Table.Header>
			{#each columns as column (column.name)}
				<Table.HeaderCell
					sortable={isColumnSortable(column)}
					sortDirection={sortState.column === column.name ? sortState.direction : null}
					onSort={isColumnSortable(column)
						? (direction) => handleSort(column.name, direction)
						: undefined}
					alignment={columnAlign(column)}
					style={getColumnStyle(column)}
				>
					{column.displayName}
				</Table.HeaderCell>
			{/each}
			{#if actions && actions.length > 0}
				<!-- Set width to 1px to prevent column from stretching -->
				<Table.HeaderCell style="width: 1px; white-space: nowrap;"></Table.HeaderCell>
			{/if}
		</Table.Header>
		<Table.Body
			isEmpty={processedItems.length === 0}
			emptyMessage={hasActiveFilters ? noResultsMessage : emptyMessage}
		>
			{#each processedItems as item (item[idField])}
				<Table.BodyRow
					onClick={onRowClick ? () => onRowClick(item[idField]) : undefined}
					data-state={selectedId != null && item[idField] === selectedId ? 'selected' : undefined}
				>
					{#each columns as column (column.name)}
						<Table.BodyCell
							tabularNumbers={column.type === 'number' || column.type === 'date'}
							alignment={columnAlign(column)}
							style={getColumnStyle(column)}
						>
							{#if column.render}
								{@render column.render(item[column.name])}
							{:else}
								{item[column.name]}
							{/if}
						</Table.BodyCell>
					{/each}
					{#if actions && actions.length > 0}
						<Table.BodyCell style="width: 1px; white-space: nowrap;">
							<DataTableActions
								{actions}
								onAction={(actionValue: string) => onAction?.(item[idField], actionValue)}
							/>
						</Table.BodyCell>
					{/if}
				</Table.BodyRow>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.data-table {
		display: contents;

		&--sticky-header {
			display: flex;
			flex: 0 1 auto;
			flex-direction: column;
			min-height: 0;
			max-height: 100%;
		}
	}

	.data-table-filters {
		display: flex;
		flex-wrap: wrap;
		gap: $space-1;
		margin-bottom: $space-1-5;
	}
</style>

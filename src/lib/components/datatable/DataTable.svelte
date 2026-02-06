<script lang="ts" module>
	import type { TableProps } from '../table/index';
	import type { Snippet } from 'svelte';
	import type { DataTableActionItem } from './DataTableActions.svelte';

	/** Supported data types for automatic sorting */
	export type SortType = 'string' | 'number' | 'date' | 'boolean';

	export interface DataTableColumn<T extends Record<string, unknown>> {
		/** The key from the data object to display in this column */
		name: keyof T;
		/** The header text to display for this column */
		displayName: string;
		/** Optional custom render function for the cell content */
		render?: Snippet<[value: T[keyof T]]>;
		/** The data type for automatic sorting. If not provided, column won't be sortable */
		sortType?: SortType;
		/** Custom sort function. Takes precedence over sortType if both are provided */
		sortFn?: (a: T[keyof T], b: T[keyof T]) => number;
		/** Whether this column should shrink to fit its content (useful for action columns) */
		hugContent?: boolean;
		/** Whether this column should expand to fill all remaining space. Sets width: 100% */
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

	export interface DataTableProps<T extends Record<string, unknown>> extends TableProps {
		/** Array of data objects to display in the table */
		items: T[];
		/** Column configuration defining how data should be displayed */
		columns: DataTableColumn<T>[];
		/** The field in each item to use as a unique identifier */
		idField: keyof T;
		/** Optional callback fired when a row is clicked. Receives the item's ID */
		onRowClick?: (id: T[keyof T]) => void;
		/** Optional array of action items to display in each row */
		actions?: DataTableActionItem[];
		/** Optional callback fired when an action is triggered. Receives the item ID and action value */
		onAction?: (itemId: T[keyof T], actionValue: string) => void;
		/** Whether to show a search bar above the table */
		searchable?: boolean;
		/** Array of column keys to search through. If empty, searches all columns */
		searchableColumns?: (keyof T)[];
		/** Placeholder text for the search input */
		searchPlaceholder?: string;
		/** Minimum width for the entire table. Below this width, table will scroll horizontally */
		minWidth?: string;
	}
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { Table } from '../table/index';
	import { SearchBar } from '../searchbar';
	import { DataTableActions } from './index';

	let {
		ref = $bindable(null),
		items,
		columns,
		idField,
		onRowClick,
		actions,
		onAction,
		searchable = false,
		searchableColumns = [],
		searchPlaceholder = 'Search...',
		minWidth,
		...restProps
	}: DataTableProps<T> = $props();

	// Create a type-safe column map for O(1) lookup
	const columnMap = $derived(new Map(columns.map((col) => [col.name, col] as const)));

	// Sorting state
	let sortState = $state({
		column: null as keyof T | null,
		direction: null as 'asc' | 'desc' | null
	});

	// Search state
	let searchQuery = $state('');

	// Create a default sort function based on the defined sort type for the column
	const getSortFunction = (type: SortType) => {
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

	// Filter items based on search query
	const filteredItems = $derived.by(() => {
		if (!searchable || !searchQuery.trim()) {
			return items;
		}

		const query = searchQuery.toLowerCase();
		const columnsToSearch =
			searchableColumns.length > 0 ? searchableColumns : columns.map((col) => col.name);

		return items.filter((item) =>
			columnsToSearch.some((columnName) => {
				const value = item[columnName];
				return value != null && String(value).toLowerCase().includes(query);
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

		// Apply sorting if active
		if (sortState.column && sortState.direction) {
			const currentColumn = columnMap.get(sortState.column)!;
			const sortFn =
				currentColumn.sortFn ||
				(currentColumn.sortType ? getSortFunction(currentColumn.sortType) : null);

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

{#if searchable}
	<div class="mb-3">
		<SearchBar bind:value={searchQuery} placeholder={searchPlaceholder} />
	</div>
{/if}

<Table.Root bind:ref style={minWidth ? `min-width: ${minWidth}` : undefined} {...restProps}>
	<Table.Header>
		{#each columns as column (column.name)}
			<Table.HeaderCell
				sortable={!!column.sortType || !!column.sortFn}
				sortDirection={sortState.column === column.name ? sortState.direction : null}
				onSort={column.sortType || column.sortFn
					? (direction) => handleSort(column.name, direction)
					: undefined}
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
	<Table.Body>
		{#each processedItems as item (item[idField])}
			<Table.BodyRow onClick={onRowClick ? () => onRowClick(item[idField]) : undefined}>
				{#each columns as column (column.name)}
					<Table.BodyCell style={getColumnStyle(column)}>
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

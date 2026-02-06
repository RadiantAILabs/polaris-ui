<script lang="ts" module>
	import { type WithElementRef } from '../../utils';
	import type { HTMLThAttributes } from 'svelte/elements';

	export type SortDirection = 'asc' | 'desc';

	export interface TableHeaderCellProps extends WithElementRef<HTMLThAttributes> {
		/** Whether the column is sortable */
		sortable?: boolean;
		/** Current sort direction for this column */
		sortDirection?: SortDirection | null;
		/** Callback when sort direction changes */
		onSort?: (direction: SortDirection) => void;
		/** Column name for enhanced accessibility */
		columnName?: string;
	}
</script>

<script lang="ts">
	import Icon from '../icon/icon.svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		sortable = false,
		sortDirection = null,
		onSort,
		columnName,
		...restProps
	}: TableHeaderCellProps = $props();

	let isHovered = $state(false);
	// Remember last sort direction to use when going from unsorted to sorted
	let lastSortDirection = $state<'asc' | 'desc'>('asc');

	$effect(() => {
		// Only remember direction when transitioning from sorted to unsorted
		if (sortDirection !== null) {
			lastSortDirection = sortDirection;
		}
	});

	function getNextSortDirection(): SortDirection {
		switch (sortDirection) {
			case null:
				// Not currently sorting, use remembered direction
				return lastSortDirection;
			case 'asc':
				return 'desc';
			case 'desc':
				return 'asc';
		}
	}

	function handleClick(): void {
		const nextDirection = getNextSortDirection();
		onSort?.(nextDirection);
	}
</script>

<th bind:this={ref} class="header-cell {className}" {...restProps}>
	{#if sortable}
		<button
			class="sort-button"
			aria-label={columnName
				? `Sort ${columnName} ${getNextSortDirection() === 'asc' ? 'ascending' : 'descending'}`
				: `Sort ${getNextSortDirection() === 'asc' ? 'ascending' : 'descending'}`}
			onmouseenter={() => (isHovered = true)}
			onmouseleave={() => (isHovered = false)}
			onclick={handleClick}
		>
			{@render children?.()}
			<Icon
				name={sortDirection
					? sortDirection === 'asc'
						? 'chevron-up'
						: 'chevron-down'
					: getNextSortDirection() === 'asc'
						? 'chevron-up'
						: 'chevron-down'}
				size="1rem"
				hidden={!sortDirection && !isHovered}
			/>
		</button>
	{:else}
		<div class="header-text">{@render children?.()}</div>
	{/if}
</th>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.header-cell {
  padding: 0.25rem 1rem;
  vertical-align: middle;
  color: var(--color-text-primary);
  text-align: left;
  white-space: nowrap;
  background-color: var(--color-table-header-cell-background);
  background-clip: padding-box;
  border-bottom: 1px solid var(--color-table-header-cell-border);
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.header-cell:first-child {
  border-top-left-radius: 2px;
}
.header-cell:last-child {
  border-top-right-radius: 2px;
}

.sort-button {
  box-sizing: border-box;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  padding: 0.25rem calc(0.5rem - 1px);
  color: var(--color-text-primary);
  text-align: left;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  outline: none;
  background-color: transparent;
  border: none;
  border-radius: 2px;
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@media (prefers-reduced-motion: no-preference) {
  .sort-button {
    transition: all 150ms ease-in-out;
  }
}
.sort-button:disabled {
  color: var(--color-text-disabled);
  pointer-events: none;
  cursor: not-allowed;
  background-color: transparent;
  border-color: transparent;
}
.sort-button:hover:not(:disabled), .sort-button:focus-visible:not(:disabled) {
  background-color: var(--color-button-background-hover);
}
.sort-button:active:not(:disabled) {
  background-color: var(--color-button-background-active);
}

.header-text {
  padding: 0.25rem calc(0.5rem - 1px);
}</style>

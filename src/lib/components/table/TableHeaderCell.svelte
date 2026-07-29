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
		/** Horizontal alignment of the header content. */
		alignment?: 'start' | 'end';
	}
</script>

<script lang="ts">
	import Icon from '../icon/icon.svelte';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		sortable = false,
		sortDirection = null,
		onSort,
		columnName,
		alignment,
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

<th
	bind:this={ref}
	class={cn('header-cell', alignment === 'end' && 'header-cell--align-end', className)}
	{...restProps}
>
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

<style lang="scss">
	@use '../../styles/tokens' as *;

	.header-cell {
		padding: $space-0-5 $space-2;
		vertical-align: middle;
		color: var(--color-text-secondary);
		text-align: left;
		white-space: nowrap;
		background-color: var(--color-table-header-cell-background);
		background-clip: padding-box;
		border-bottom: $border-width-base solid var(--color-table-header-cell-border);

		@include typography('body-base-regular');

		&:first-child {
			border-top-left-radius: $border-radius-base;
		}

		&:last-child {
			border-top-right-radius: $border-radius-base;
		}

		&--align-end {
			text-align: right;
		}
	}

	.sort-button {
		box-sizing: border-box;
		display: flex;
		gap: $space-0-5;
		align-items: center;
		justify-content: flex-start;
		width: fit-content;
		padding: calc($space-0-5) calc($space-1 - $border-width-base);
		color: var(--color-text-secondary);
		text-align: left;
		white-space: nowrap;
		text-decoration: none;
		cursor: pointer;
		user-select: none;
		outline: none;
		background-color: transparent;
		border: none;
		border-radius: $border-radius-base;

		@include typography('body-base-regular');
		@include transition-interactive;

		.header-cell--align-end & {
			flex-direction: row-reverse;
			margin-left: auto;
		}

		&:disabled {
			color: var(--color-text-disabled);
			pointer-events: none;
			cursor: not-allowed;
			background-color: transparent;
			border-color: transparent;
		}

		&:hover:not(:disabled),
		&:focus-visible:not(:disabled) {
			background-color: var(--color-button-background-hover);
		}

		&:active:not(:disabled) {
			background-color: var(--color-button-background-active);
		}
	}

	.header-text {
		padding: calc($space-0-5) calc($space-1 - $border-width-base);
	}
</style>

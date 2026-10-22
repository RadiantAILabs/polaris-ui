<script lang="ts">
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLTdAttributes } from 'svelte/elements';
	import { getTableContext } from './context';

	let {
		ref = $bindable(null),
		class: className,
		children,
		tabularNumbers = false,
		alignment,
		...restProps
	}: WithElementRef<HTMLTdAttributes> & {
		/** Render the cell's figures as tabular numerals. Ensures digits line up by occupying equal width. */
		tabularNumbers?: boolean;
		/** Horizontal alignment of the cell content. */
		alignment?: 'start' | 'end';
	} = $props();

	const table = getTableContext();
</script>

<td
	bind:this={ref}
	class={cn(
		'body-cell',
		table?.primaryColumn && 'body-cell--primary',
		tabularNumbers && 'body-cell--tabular',
		alignment === 'end' && 'body-cell--align-end',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</td>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.body-cell {
		padding: $space-2 $space-3;
		vertical-align: middle;
		color: var(--color-text-secondary);
		overflow-wrap: break-word;
		white-space: nowrap;
		background-clip: padding-box;

		@include typography('body-base-regular');

		&.body-cell--primary:first-child {
			color: var(--color-text-primary);

			@include typography('body-base-medium');
		}

		&--tabular {
			font-variant-numeric: tabular-nums;
		}

		&--align-end {
			text-align: right;
		}
	}
</style>

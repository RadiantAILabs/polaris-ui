<script lang="ts" module>
	import { type WithElementRef } from '../../utils';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface TableBodyRowProps extends WithElementRef<HTMLAttributes<HTMLTableRowElement>> {
		onClick?: () => void;
	}
</script>

<script lang="ts">
	import { getContext } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		onClick,
		...restProps
	}: TableBodyRowProps = $props();

	const hoverable = getContext<boolean>('table-hoverable') ?? false;
	const isClickable = $derived(!!onClick);

	function handleKeydown(event: KeyboardEvent) {
		if (!isClickable || !onClick) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onClick();
		}
	}
</script>

<tr
	bind:this={ref}
	class="row {hoverable ? 'row--hoverable' : ''} {isClickable ? 'row--clickable' : ''} {className}"
	onclick={onClick}
	onkeydown={handleKeydown}
	role={isClickable ? 'button' : undefined}
	tabindex={isClickable ? 0 : undefined}
	{...restProps}
>
	{@render children?.()}
</tr>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.row {
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;

		&--hoverable:hover {
			background-color: var(--color-table-cell-background-hover);
		}

		&--clickable {
			cursor: pointer;

			&:hover,
			&:focus-visible {
				outline: none;
				background-color: var(--color-table-cell-background-hover);
			}
		}

		&[data-state='selected'] {
			background-color: var(--color-table-cell-background-active);
		}

		&:not(:last-child) {
			:global(td) {
				border-bottom: $border-width-base solid var(--color-table-cell-border);
			}
		}

		&:last-child {
			border-bottom: none;

			:global(.body-cell:first-child) {
				border-bottom-left-radius: $border-radius-base;
			}

			:global(.body-cell:last-child) {
				border-bottom-right-radius: $border-radius-base;
			}
		}
	}
</style>

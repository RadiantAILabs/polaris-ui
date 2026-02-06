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

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.row {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}
.row--hoverable:hover {
  background-color: var(--color-table-cell-background-hover);
}
.row--clickable {
  cursor: pointer;
}
.row--clickable:hover, .row--clickable:focus-visible {
  outline: none;
  background-color: var(--color-table-cell-background-hover);
}
.row[data-state=selected] {
  background-color: var(--color-table-cell-background-active);
}
.row:not(:last-child) :global(td) {
  border-bottom: 1px solid var(--color-table-cell-border);
}
.row:last-child {
  border-bottom: none;
}
.row:last-child :global(.body-cell:first-child) {
  border-bottom-left-radius: 2px;
}
.row:last-child :global(.body-cell:last-child) {
  border-bottom-right-radius: 2px;
}</style>

<script lang="ts">
	import { type WithElementRef } from '../../utils';
	import type { HTMLTdAttributes } from 'svelte/elements';
	import { getContext } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLTdAttributes> = $props();

	const primaryColumn = getContext<boolean>('table-primary-column') ?? false;
</script>

<td
	bind:this={ref}
	class="body-cell {primaryColumn ? 'body-cell--primary' : ''} {className}"
	{...restProps}
>
	{@render children?.()}
</td>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.body-cell {
  padding: 1rem 1.5rem;
  vertical-align: middle;
  color: var(--color-text-secondary);
  white-space: nowrap;
  background-clip: padding-box;
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.body-cell.body-cell--primary:first-child {
  color: var(--color-text-primary);
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}</style>

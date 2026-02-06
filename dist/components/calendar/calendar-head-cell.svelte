<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CalendarPrimitive.HeadCellProps = $props();
</script>

<CalendarPrimitive.HeadCell bind:ref {...restProps}>
	{#snippet child({ props })}
		<th {...props} class={cn('calendar-head-cell', className)}>
			{@render children?.()}
		</th>
	{/snippet}
</CalendarPrimitive.HeadCell>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.calendar-head-cell {
  width: var(--cell-size);
  color: var(--color-text-disabled);
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}</style>

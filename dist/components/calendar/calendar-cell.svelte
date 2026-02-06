<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CalendarPrimitive.CellProps = $props();
</script>

<CalendarPrimitive.Cell bind:ref {...restProps}>
	{#snippet child({ props, ...childProps })}
		<td {...props} class={cn('calendar-cell', className)}>
			{@render children?.(childProps)}
		</td>
	{/snippet}
</CalendarPrimitive.Cell>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.calendar-cell {
  position: relative;
  width: var(--cell-size);
  height: var(--cell-size);
  padding: 0;
  text-align: center;
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.calendar-cell:focus-within {
  z-index: 20;
}</style>

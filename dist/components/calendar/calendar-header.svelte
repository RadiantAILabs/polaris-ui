<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CalendarPrimitive.HeaderProps = $props();
</script>

<CalendarPrimitive.Header bind:ref {...restProps}>
	{#snippet child({ props })}
		<div {...props} class={cn('calendar-header', className)}>
			{@render children?.()}
		</div>
	{/snippet}
</CalendarPrimitive.Header>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.calendar-header {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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

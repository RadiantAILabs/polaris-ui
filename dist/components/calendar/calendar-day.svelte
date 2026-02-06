<script lang="ts">
	import { cn } from '../../utils';

	import { Calendar as CalendarPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day bind:ref {...restProps}>
	{#snippet child({ props, day })}
		<div {...props} class={cn('calendar-day', className)}>
			{day}
		</div>
	{/snippet}
</CalendarPrimitive.Day>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.calendar-day {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: var(--cell-size);
  height: var(--cell-size);
  padding: 0;
  line-height: 1;
  color: var(--color-text-primary);
  white-space: nowrap;
  user-select: none;
  border-radius: 2px;
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
.calendar-day[data-today]:not([data-selected]) {
  color: var(--color-text-primary);
  background-color: var(--color-button-background-active);
}
.calendar-day[data-selected] {
  color: var(--color-text-inverse-primary);
  background-color: var(--color-button-primary-background-active);
}
.calendar-day[data-selected]:hover {
  color: var(--color-text-inverse-primary);
  background-color: var(--color-button-primary-background-active);
}
.calendar-day[data-outside-month]:not([data-selected]) {
  color: var(--color-text-tertiary);
}
.calendar-day[data-disabled] {
  pointer-events: none;
  opacity: 0.5;
}
.calendar-day[data-unavailable] {
  color: var(--color-text-tertiary);
  text-decoration: line-through;
}
.calendar-day:hover {
  color: var(--color-text-primary);
  background-color: var(--color-button-background-hover);
}
.calendar-day:focus {
  position: relative;
  border-color: var(--color-control-border-active);
  box-shadow: 0 0 0 2px rgb(var(--color-control-border-active)/50%);
}</style>

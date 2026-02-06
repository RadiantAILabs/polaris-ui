<script lang="ts">
	import { Calendar as CalendarPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import { cn } from '../../utils';
	import { Icon } from '../icon';

	let {
		ref = $bindable(null),
		class: className,
		value,
		...restProps
	}: WithoutChildrenOrChild<CalendarPrimitive.YearSelectProps> = $props();
</script>

<span class={cn('calendar-year-select', className)}>
	<CalendarPrimitive.YearSelect bind:ref {...restProps}>
		{#snippet child({ props, yearItems, selectedYearItem })}
			<select {...props} {value} class="calendar-year-select__input">
				{#each yearItems as yearItem (yearItem.value)}
					<option
						value={yearItem.value}
						selected={value !== undefined
							? yearItem.value === value
							: yearItem.value === selectedYearItem.value}
					>
						{yearItem.label}
					</option>
				{/each}
			</select>
			<span class="calendar-year-select__display" aria-hidden="true">
				{yearItems.find((item) => item.value === value)?.label || selectedYearItem.label}
				<Icon name="chevron-down" variant="secondary" size="0.75rem" />
			</span>
		{/snippet}
	</CalendarPrimitive.YearSelect>
</span>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.calendar-year-select {
  position: relative;
  display: flex;
  background-color: var(--color-control-background-rest);
  border: 1px solid var(--color-control-border-rest);
  border-radius: 2px;
}
@media (prefers-reduced-motion: no-preference) {
  .calendar-year-select {
    transition: background-color 150ms ease-in-out, border-color 150ms ease-in-out;
  }
}
.calendar-year-select__input {
  position: absolute;
  inset: 0;
  opacity: 0;
}
.calendar-year-select:hover, .calendar-year-select:focus-within {
  background-color: var(--color-control-background-hover);
  border-color: var(--color-control-border-hover);
}
.calendar-year-select__display {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  padding: 0.25rem 0.5rem 0.25rem 0.75rem;
  border-radius: 2px;
}</style>

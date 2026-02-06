<script lang="ts">
	import { Calendar as CalendarPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import { cn } from '../../utils';

	import { Icon } from '../icon';

	let {
		ref = $bindable(null),
		class: className,
		value,
		onchange,
		...restProps
	}: WithoutChildrenOrChild<CalendarPrimitive.MonthSelectProps> = $props();
</script>

<span class={cn('calendar-month-select', className)}>
	<CalendarPrimitive.MonthSelect bind:ref {...restProps}>
		{#snippet child({ props, monthItems, selectedMonthItem })}
			<select {...props} {value} {onchange} class="calendar-month-select__input">
				{#each monthItems as monthItem (monthItem.value)}
					<option
						value={monthItem.value}
						selected={value !== undefined
							? monthItem.value === value
							: monthItem.value === selectedMonthItem.value}
					>
						{monthItem.label}
					</option>
				{/each}
			</select>
			<span class="calendar-month-select__display" aria-hidden="true">
				{monthItems.find((item) => item.value === value)?.label || selectedMonthItem.label}
				<Icon name="chevron-down" variant="secondary" size="0.75rem" />
			</span>
		{/snippet}
	</CalendarPrimitive.MonthSelect>
</span>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.calendar-month-select {
  position: relative;
  display: flex;
  background-color: var(--color-control-background-rest);
  border: 1px solid var(--color-control-border-rest);
  border-radius: 2px;
}
@media (prefers-reduced-motion: no-preference) {
  .calendar-month-select {
    transition: background-color 150ms ease-in-out, border-color 150ms ease-in-out;
  }
}
.calendar-month-select__input {
  position: absolute;
  inset: 0;
  opacity: 0;
}
.calendar-month-select:hover, .calendar-month-select:focus-within {
  background-color: var(--color-control-background-hover);
  border-color: var(--color-control-border-hover);
}
.calendar-month-select__display {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  padding: 0.25rem 0.5rem 0.25rem 0.75rem;
  border-radius: 2px;
}</style>

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
				<Icon name="chevron-down" variant="secondary" size="small" />
			</span>
		{/snippet}
	</CalendarPrimitive.MonthSelect>
</span>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.calendar-month-select {
		position: relative;
		display: flex;
		background-color: var(--color-control-background-rest);
		border: $border-width-base solid var(--color-control-border-rest);
		border-radius: $border-radius-base;

		@include transition-interactive(background-color, border-color);

		&__input {
			position: absolute;
			inset: 0;
			opacity: 0;
		}

		&:hover,
		&:focus-within {
			background-color: var(--color-control-background-hover);
			border-color: var(--color-control-border-hover);
		}

		&__display {
			display: flex;
			gap: $space-1;
			align-items: center;
			width: 100%;
			padding: $space-0-5 $space-1 $space-0-5 $space-1-5;
			border-radius: $border-radius-base;
		}
	}
</style>

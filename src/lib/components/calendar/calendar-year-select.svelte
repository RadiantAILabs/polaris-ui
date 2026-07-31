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
				<Icon name="chevron-down" variant="secondary" size="small" />
			</span>
		{/snippet}
	</CalendarPrimitive.YearSelect>
</span>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.calendar-year-select {
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

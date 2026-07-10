<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import * as Calendar from '../calendar/index.js';
	import * as RangeCalendar from './index.js';
	import { cn } from '../../utils';
	import { isEqualMonth, type DateValue } from '@internationalized/date';
	import type { Snippet } from 'svelte';

	export type RangeCalendarProps = WithoutChildrenOrChild<RangeCalendarPrimitive.RootProps> & {
		/** Layout style for the calendar caption/header */
		captionLayout?: 'dropdown' | 'dropdown-months' | 'dropdown-years' | 'label';
		/** Array of month options for dropdown selection */
		months?: RangeCalendarPrimitive.MonthSelectProps['months'];
		/** Array of year options for dropdown selection */
		years?: RangeCalendarPrimitive.YearSelectProps['years'];
		/** Format for displaying month names */
		monthFormat?: RangeCalendarPrimitive.MonthSelectProps['monthFormat'];
		/** Format for displaying year values */
		yearFormat?: RangeCalendarPrimitive.YearSelectProps['yearFormat'];
		/** Custom snippet for rendering individual day cells */
		day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
	};

	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		class: className,
		weekdayFormat = 'short',
		captionLayout = 'dropdown',
		locale = navigator.language,
		months: monthsProp,
		years,
		monthFormat: monthFormatProp,
		yearFormat = 'numeric',
		day,
		disableDaysOutsideMonth = true,
		...restProps
	}: RangeCalendarProps = $props();

	const monthFormat = $derived.by(() => {
		if (monthFormatProp) return monthFormatProp;
		if (captionLayout.startsWith('dropdown')) return 'short';
		return 'long';
	});
</script>

<RangeCalendarPrimitive.Root
	bind:value
	bind:ref
	bind:placeholder
	{weekdayFormat}
	{disableDaysOutsideMonth}
	{locale}
	{monthFormat}
	{yearFormat}
	{...restProps}
>
	{#snippet child({ props, months, weekdays })}
		<div {...props} class={cn('range-calendar', className)}>
			<div class="range-calendar__months">
				{#each months as month, monthIndex (month)}
					<div class="range-calendar__month">
						<Calendar.Header>
							{#if monthIndex === 0}
								<Calendar.PrevButton />
							{:else}
								<span class="range-calendar__nav-spacer" aria-hidden="true"></span>
							{/if}
							<div class="range-calendar__caption-wrapper">
								<Calendar.Caption
									{captionLayout}
									months={monthsProp}
									{monthFormat}
									{years}
									{yearFormat}
									month={month.value}
									bind:placeholder
									{locale}
									{monthIndex}
								/>
							</div>
							{#if monthIndex === months.length - 1}
								<Calendar.NextButton />
							{:else}
								<span class="range-calendar__nav-spacer" aria-hidden="true"></span>
							{/if}
						</Calendar.Header>
						<Calendar.Grid>
							<Calendar.GridHead>
								<Calendar.GridRow>
									{#each weekdays as weekday (weekday)}
										<Calendar.HeadCell>
											{weekday.slice(0, 2)}
										</Calendar.HeadCell>
									{/each}
								</Calendar.GridRow>
							</Calendar.GridHead>
							<Calendar.GridBody>
								{#each month.weeks as weekDates (weekDates)}
									<Calendar.GridRow>
										{#each weekDates as date (date)}
											{@const outsideMonth = !isEqualMonth(date, month.value)}
											<RangeCalendar.Cell {date} month={month.value}>
												{#if outsideMonth}
													<span class="range-calendar__empty-day" aria-hidden="true"></span>
												{:else if day}
													{@render day({
														day: date,
														outsideMonth
													})}
												{:else}
													<RangeCalendar.Day />
												{/if}
											</RangeCalendar.Cell>
										{/each}
									</Calendar.GridRow>
								{/each}
							</Calendar.GridBody>
						</Calendar.Grid>
					</div>
				{/each}
			</div>
		</div>
	{/snippet}
</RangeCalendarPrimitive.Root>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.range-calendar {
		--cell-size: 2rem;

		&__caption-wrapper {
			display: flex;
			gap: $space-1;
			align-items: center;
			justify-content: center;
		}

		&__months {
			position: relative;
			display: flex;
			flex-direction: column;
			gap: $space-4;

			@media (width >= 768px) {
				flex-flow: row wrap;
				justify-content: center;
			}
		}

		&__month {
			display: flex;
			flex-direction: column;
			gap: $space-2;
		}

		&__nav-spacer {
			width: $space-4;
			height: $space-4;
		}

		&__empty-day {
			display: block;
			visibility: hidden;
			width: var(--cell-size);
			height: var(--cell-size);
			pointer-events: none;
		}
	}
</style>

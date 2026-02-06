<script lang="ts">
	import { Calendar as CalendarPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import * as Calendar from './index.js';
	import { cn } from '../../utils';

	import { isEqualMonth, type DateValue } from '@internationalized/date';
	import type { Snippet } from 'svelte';

	export type CalendarProps = WithoutChildrenOrChild<CalendarPrimitive.RootProps> & {
		/** Layout style for the calendar caption/header */
		captionLayout?: 'dropdown' | 'dropdown-months' | 'dropdown-years' | 'label';
		/** Array of month options for dropdown selection */
		months?: CalendarPrimitive.MonthSelectProps['months'];
		/** Array of year options for dropdown selection */
		years?: CalendarPrimitive.YearSelectProps['years'];
		/** Format for displaying month names */
		monthFormat?: CalendarPrimitive.MonthSelectProps['monthFormat'];
		/** Format for displaying year values */
		yearFormat?: CalendarPrimitive.YearSelectProps['yearFormat'];
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
		// Default to browser locale
		locale = navigator.language,
		months: monthsProp,
		years,
		monthFormat: monthFormatProp,
		yearFormat = 'numeric',
		day,
		disableDaysOutsideMonth = false,
		...restProps
	}: CalendarProps = $props();
	const monthFormat = $derived.by(() => {
		if (monthFormatProp) return monthFormatProp;
		if (captionLayout.startsWith('dropdown')) return 'short';
		return 'long';
	});
</script>

<CalendarPrimitive.Root
	bind:value={value as never}
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
		<div {...props} class={cn('calendar', className)}>
			<div class="calendar__months">
				{#each months as month, monthIndex (month)}
					<div class="calendar__month">
						<Calendar.Header>
							<Calendar.PrevButton />
							<div class="calendar__caption-wrapper">
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
							<Calendar.NextButton />
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
											<Calendar.Cell {date} month={month.value}>
												{#if day}
													{@render day({
														day: date,
														outsideMonth: !isEqualMonth(date, month.value)
													})}
												{:else}
													<Calendar.Day />
												{/if}
											</Calendar.Cell>
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
</CalendarPrimitive.Root>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.calendar {
  --cell-size: 2rem;
}
.calendar__caption-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}
.calendar__months {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
@media (width >= 768px) {
  .calendar__months {
    flex-direction: row;
  }
}
.calendar__month {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}</style>

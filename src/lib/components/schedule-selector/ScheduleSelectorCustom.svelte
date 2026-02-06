<script lang="ts">
	import { Button } from '../button';
	import { Input } from '../input';
	import DropdownSelector from '../dropdown-selector';
	import { DateTimeSelector } from '../datetime-selector';
	import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
	import { RadioGroupItem } from '../radio-group';
	import { cn } from '../../utils';
	import { today, getLocalTimeZone, toZoned, ZonedDateTime } from '@internationalized/date';
	import {
		type RecurrenceSchedule,
		type DayOfWeek,
		isWeeklyPattern,
		hasEndDate,
		hasOccurrenceLimit
	} from './models';
	import './ScheduleSelectorCustom.scss';

	export interface ScheduleSelectorCustomProps {
		value: RecurrenceSchedule;
		onValueChange?: (value: RecurrenceSchedule) => void;
		class?: string;
		defaultEndDate?: ZonedDateTime;
		defaultOccurrences?: number;
	}

	let {
		value = $bindable(),
		onValueChange,
		class: className,
		// Default end prop to one week from today in local timezone if not provided
		defaultEndDate = toZoned(today(getLocalTimeZone()).add({ weeks: 1 }), getLocalTimeZone()),
		// Default occurrences to 1 if not provided
		defaultOccurrences = 1
	}: ScheduleSelectorCustomProps = $props();

	// Generate unique ID for this component instance
	const uid = $props.id();

	// Helper function to update value and trigger onValueChange
	function updateValue(newValue: RecurrenceSchedule) {
		value = newValue;
		onValueChange?.(newValue);
	}

	// Update pattern interval
	function updatePatternInterval(interval: number) {
		const newValue = { ...value, pattern: { ...value.pattern, interval } };
		updateValue(newValue);
	}

	// Update selected days of week
	function updateWeeklyDays(daysOfWeek: DayOfWeek[]) {
		if (isWeeklyPattern(value.pattern)) {
			const newValue = {
				...value,
				pattern: { ...value.pattern, daysOfWeek }
			};
			updateValue(newValue);
		}
	}

	// Update end condition
	function updateEndCondition(endCondition: RecurrenceSchedule['endCondition']) {
		const newValue = { ...value, endCondition };
		updateValue(newValue);
	}

	// Helper function to pluralize time units and occurrences
	function pluralize(word: string, count: number): string {
		return count === 1 ? word : `${word}s`;
	}

	// Error states for validation
	let intervalError = $state(false);
	let occurrencesError = $state(false);

	// Get pluralized time unit label based on interval
	function getTimeUnitLabel(type: string, interval: number): string {
		const baseLabels = {
			minute: 'Minute',
			hour: 'Hour',
			daily: 'Day',
			weekly: 'Week',
			monthly: 'Month',
			yearly: 'Year'
		};
		return pluralize(baseLabels[type as keyof typeof baseLabels], interval);
	}

	// Options for time unit dropdown
	const timeUnitOptions = $derived([
		{ value: 'minute', label: getTimeUnitLabel('minute', value.pattern.interval) },
		{ value: 'hour', label: getTimeUnitLabel('hour', value.pattern.interval) },
		{ value: 'daily', label: getTimeUnitLabel('daily', value.pattern.interval) },
		{ value: 'weekly', label: getTimeUnitLabel('weekly', value.pattern.interval) },
		{ value: 'monthly', label: getTimeUnitLabel('monthly', value.pattern.interval) },
		{ value: 'yearly', label: getTimeUnitLabel('yearly', value.pattern.interval) }
	]);

	// Days of the week for weekly pattern selection
	// Label is used for accessibility, short is used for button text
	const daysOfWeek: { value: DayOfWeek; label: string; short: string }[] = [
		{ value: 'monday', label: 'Monday', short: 'M' },
		{ value: 'tuesday', label: 'Tuesday', short: 'T' },
		{ value: 'wednesday', label: 'Wednesday', short: 'W' },
		{ value: 'thursday', label: 'Thursday', short: 'T' },
		{ value: 'friday', label: 'Friday', short: 'F' },
		{ value: 'saturday', label: 'Saturday', short: 'S' },
		{ value: 'sunday', label: 'Sunday', short: 'S' }
	];

	// Toggle selection of repetition day for weekly pattern
	function toggleDay(day: DayOfWeek) {
		if (isWeeklyPattern(value.pattern)) {
			const currentDays = value.pattern.daysOfWeek;
			const newDays = currentDays.includes(day)
				? currentDays.filter((d) => d !== day)
				: [...currentDays, day];

			updateWeeklyDays(newDays);
		}
	}

	// Get the end date
	function getEndDate() {
		return hasEndDate(value.endCondition) ? value.endCondition.date : defaultEndDate;
	}

	// Get the number of occurrences
	function getOccurrences() {
		return hasOccurrenceLimit(value.endCondition)
			? value.endCondition.occurrences
			: defaultOccurrences;
	}

	// Update pattern type and preserve interval
	function updatePatternType(
		timeUnit: 'minute' | 'hour' | 'daily' | 'weekly' | 'monthly' | 'yearly'
	) {
		const currentInterval = value.pattern.interval;
		let newPattern: RecurrenceSchedule['pattern'];

		switch (timeUnit) {
			case 'minute':
				newPattern = { type: 'minute' as const, interval: currentInterval };
				break;
			case 'hour':
				newPattern = { type: 'hour' as const, interval: currentInterval };
				break;
			case 'daily':
				newPattern = { type: 'daily' as const, interval: currentInterval };
				break;
			case 'weekly':
				newPattern = { type: 'weekly' as const, interval: currentInterval, daysOfWeek: [] };
				break;
			case 'monthly':
				newPattern = { type: 'monthly' as const, interval: currentInterval };
				break;
			case 'yearly':
				newPattern = { type: 'yearly' as const, interval: currentInterval };
				break;
		}

		const newValue = { ...value, pattern: newPattern };
		updateValue(newValue);
	}

	// Handle end condition type change
	function updateEndConditionType(type: 'never' | 'on' | 'after') {
		let newEndCondition: RecurrenceSchedule['endCondition'];

		switch (type) {
			case 'never':
				newEndCondition = { type: 'never' as const };
				break;
			case 'on':
				newEndCondition = { type: 'on' as const, date: getEndDate() };
				break;
			case 'after':
				newEndCondition = { type: 'after' as const, occurrences: getOccurrences() };
				break;
		}

		updateEndCondition(newEndCondition);
	}
</script>

<div class={cn('custom-repeat-schedule', className)}>
	<!-- Repeat Every Section -->
	<div class="custom-repeat-schedule__repeat-every">
		<label class="custom-repeat-schedule__label" for="{uid}-repeat-every-input">Repeat every</label>
		<Input
			id="{uid}-repeat-every-input"
			type="number"
			min="1"
			value={value.pattern.interval}
			aria-invalid={intervalError ? 'true' : undefined}
			oninput={(e) => {
				const val = Number(e.currentTarget.value);
				if (!isNaN(val) && val >= 1) {
					updatePatternInterval(val);
					intervalError = false;
				} else {
					intervalError = true;
				}
			}}
			class="custom-repeat-schedule__number-input"
		/>
		<div class="custom-repeat-schedule__time-unit-dropdown">
			<DropdownSelector
				aria-label="Time unit for repetition"
				type="single"
				showAsBadges={false}
				value={value.pattern.type}
				onValueChange={(value: string) =>
					updatePatternType(value as 'minute' | 'hour' | 'daily' | 'weekly' | 'monthly' | 'yearly')}
				items={timeUnitOptions}
			/>
		</div>
	</div>
	{#if intervalError}
		<div class="custom-repeat-schedule__error" role="alert" aria-live="polite">
			Must be a number equal to or larger than 1
		</div>
	{/if}

	<!-- Repeat On Section (only shown for weekly) -->
	{#if value.pattern.type === 'weekly'}
		<fieldset class="custom-repeat-schedule__section">
			<legend class="custom-repeat-schedule__label">Repeat on</legend>
			<div class="custom-repeat-schedule__days">
				{#each daysOfWeek as day (day.value)}
					<Button
						variant={isWeeklyPattern(value.pattern) && value.pattern.daysOfWeek.includes(day.value)
							? 'primary'
							: 'secondary'}
						size="small"
						label={day.short}
						onclick={() => toggleDay(day.value)}
						aria-label={day.label}
					/>
				{/each}
			</div>
		</fieldset>
	{/if}

	<!-- Repeat Until Section -->
	<fieldset class="custom-repeat-schedule__section">
		<legend class="custom-repeat-schedule__label"> Repeat until </legend>

		<RadioGroupPrimitive.Root
			value={value.endCondition.type}
			onValueChange={(value) => updateEndConditionType(value as 'never' | 'on' | 'after')}
			aria-label="End condition for schedule"
			class="w-full"
		>
			<div class="custom-repeat-schedule__radio-group">
				<!-- Never option -->
				<div class="custom-repeat-schedule__radio-option">
					<RadioGroupItem id="{uid}-never" value="never" />
					<label for="{uid}-never" class="custom-repeat-schedule__radio-label">Never</label>
				</div>

				<!-- Specific date option -->
				<div class="custom-repeat-schedule__radio-option">
					<RadioGroupItem id="{uid}-on" value="on" />
					<label for="{uid}-on" class="custom-repeat-schedule__radio-label">On</label>
					{#if value.endCondition.type === 'on'}
						<DateTimeSelector
							value={value.endCondition.date}
							onValueChange={(newDate) => {
								if (newDate) {
									updateEndCondition({ type: 'on' as const, date: newDate });
								}
							}}
							triggerProps={{ variant: 'secondary', size: 'base' }}
						/>
					{:else}
						<DateTimeSelector
							value={getEndDate()}
							disabled={true}
							class="custom-repeat-schedule__date-selector"
							triggerProps={{ variant: 'secondary', size: 'base' }}
						/>
					{/if}
				</div>

				<!-- Occurrences option -->
				<div class="custom-repeat-schedule__radio-option">
					<RadioGroupItem id="{uid}-after" value="after" />
					<label for="{uid}-after" class="custom-repeat-schedule__radio-label">After</label>
					{#if value.endCondition.type === 'after'}
						<Input
							id="{uid}-occurrences-input"
							type="number"
							min="1"
							value={value.endCondition.occurrences}
							aria-invalid={occurrencesError ? 'true' : undefined}
							oninput={(e) => {
								const val = Number(e.currentTarget.value);
								if (!isNaN(val) && val >= 1) {
									updateEndCondition({
										type: 'after' as const,
										occurrences: val
									});
									occurrencesError = false;
								} else {
									occurrencesError = true;
								}
							}}
							class="custom-repeat-schedule__number-input "
						/>
					{:else}
						<Input
							id="{uid}-occurrences-input-disabled"
							type="number"
							min="1"
							value={getOccurrences()}
							disabled={true}
							tabindex={-1}
							class="custom-repeat-schedule__number-input "
						/>
					{/if}
					<span class="custom-repeat-schedule__occurrences-text">
						{pluralize('occurrence', getOccurrences())}
					</span>
				</div>
				{#if value.endCondition.type === 'after' && occurrencesError}
					<div class="custom-repeat-schedule__error" role="alert" aria-live="polite">
						Must be a number equal to or larger than 1
					</div>
				{/if}
			</div>
		</RadioGroupPrimitive.Root>
	</fieldset>
</div>

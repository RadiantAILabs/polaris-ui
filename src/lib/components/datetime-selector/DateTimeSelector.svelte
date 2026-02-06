<script lang="ts">
	import { Popover, type PopoverProps } from '../popover';
	import { Calendar, type CalendarProps } from '../calendar';
	import { Input } from '../input';
	import {
		ZonedDateTime,
		type DateValue,
		toCalendarDate,
		getLocalTimeZone,
		toZoned,
		toTime,
		parseTime,
		toCalendarDateTime,
		today,
		DateFormatter
	} from '@internationalized/date';
	import './DateTimeSelector.scss';

	export interface DateTimeSelectorProps extends Omit<
		PopoverProps,
		'children' | 'triggerButtonProps' | 'locale'
	> {
		/** The selected date and time value */
		value?: ZonedDateTime;
		/** Callback fired when the value changes */
		onValueChange?: (value: ZonedDateTime | undefined) => void;
		/** Locale for formatting dates and times. Defaults to browser language
		 * if not specified */
		locale?: string;
		/** Placeholder text when no value is selected */
		placeholder?: string;
		/** Whether the field is required */
		required?: boolean;
		/** ID attribute for the trigger element */
		id?: string;
		/** Name attribute for the hidden form input */
		name?: string;
		/** Accessible label for the datetime selector */
		'aria-label'?: string;
		/** ID of element that labels this datetime selector */
		'aria-labelledby'?: string;
		/** ID of element that describes this datetime selector */
		'aria-describedby'?: string;
		/** Whether the field has a validation error */
		'aria-invalid'?: boolean;
		/** ID of element containing error message */
		'aria-errormessage'?: string;
		/** Props for customizing the trigger button appearance */
		triggerProps?: {
			variant?: 'primary' | 'secondary' | 'invisible';
			size?: 'small' | 'base' | 'large';
		};
		/** Props to pass to the calendar component */
		calendarProps?: CalendarProps;
	}

	let {
		value = $bindable(),
		onValueChange,
		locale = navigator.language,
		placeholder = 'Select date and time',
		disabled = false,
		required = false,
		id,
		name,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		'aria-describedby': ariaDescribedBy,
		'aria-invalid': ariaInvalid,
		'aria-errormessage': ariaErrorMessage,
		triggerProps = { variant: 'secondary', size: 'base' },
		calendarProps,
		...popoverProps
	}: DateTimeSelectorProps = $props();

	// Internal state for calendar and time inputs - initialized from value prop
	let calendarValue = $state<DateValue | undefined>(value ? toCalendarDate(value) : undefined);
	let timeValue = $state<string | undefined>(
		value
			? toTime(value).toString().slice(0, 5) // "HH:MM:SS" -> "HH:MM"
			: undefined
	);

	// Get timezone from value or default to local timezone
	const timezone = value?.timeZone ?? getLocalTimeZone();

	// Helper function to create a new datetime value from current internal state
	function createDateTimeValue(): ZonedDateTime | undefined {
		// If neither date nor time is set, return undefined
		if (!calendarValue && !timeValue) {
			return undefined;
		}

		// Determine date: use selected date or default to today
		let date = calendarValue;
		if (!date) {
			date = today(timezone);
			// If we defaulted to today, update the calendar to show it as selected
			calendarValue = date;
		}

		// Determine time: use selected time or default to midnight
		const time = parseTime(timeValue || '00:00');

		// Create the final value
		return toZoned(toCalendarDateTime(date, time), timezone);
	}

	// Helper function to update value and notify parent
	function updateDateTime() {
		const newValue = createDateTimeValue();
		value = newValue;
		onValueChange?.(newValue);
	}

	function formatDisplayValue(dateTime: ZonedDateTime | undefined): string {
		if (!dateTime) return placeholder;

		const formatter = new DateFormatter(locale, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});

		const date = dateTime.toDate();
		return formatter.format(date);
	}
</script>

<Popover
	{disabled}
	triggerButtonProps={{
		...triggerProps,
		label: formatDisplayValue(value),
		'aria-label': ariaLabel || 'Select date and time',
		'aria-labelledby': ariaLabelledBy,
		'aria-describedby': ariaDescribedBy,
		'aria-invalid': ariaInvalid,
		'aria-errormessage': ariaErrorMessage,
		icon: 'calendardates',
		iconPosition: 'right',
		id
	}}
	{...popoverProps}
	class="datetime-selector__popover"
>
	<Calendar
		{...calendarProps}
		type="single"
		value={calendarValue}
		onValueChange={(newValue) => {
			calendarValue = newValue;
			updateDateTime();
		}}
		captionLayout="dropdown"
		{locale}
	/>

	<div class="datetime-selector__separator"></div>

	<div class="datetime-selector__time-input">
		<label for="datetime-time-input" class="datetime-selector__time-label"> Time </label>
		<Input
			id="datetime-time-input"
			type="time"
			value={timeValue || '00:00'}
			oninput={(e: Event) => {
				const target = e.target as HTMLInputElement;
				timeValue = target.value || '00:00';
				updateDateTime();
			}}
		/>
	</div>
</Popover>

{#if name}
	<input type="hidden" {name} value={value ? value.toString() : ''} {required} />
{/if}

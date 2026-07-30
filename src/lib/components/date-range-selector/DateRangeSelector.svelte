<script lang="ts" module>
	import type { DateValue } from '@internationalized/date';
	import type { PopoverProps } from '../popover';
	import type { RangeCalendarProps } from '../range-calendar';

	/** A start/end pair of calendar dates. Either side may be unset. */
	export type DateRange = {
		start: DateValue | undefined;
		end: DateValue | undefined;
	};

	/** A named shortcut that resolves to a concrete range when selected. */
	export type DateRangePreset = {
		/** Stable identifier used for keying and active-state matching. */
		id: string;
		/** Human-readable label shown in the preset list and on the trigger. */
		label: string;
		/** Resolves the preset to a range at selection time. */
		range: () => DateRange;
	};

	export interface DateRangeSelectorProps extends Omit<
		PopoverProps,
		'children' | 'actions' | 'triggerButtonProps' | 'locale'
	> {
		/** The currently selected range. */
		value?: DateRange;
		/** Fired when a complete range (both ends) or a preset is chosen. */
		onValueChange?: (value: DateRange) => void;
		/** Optional shortcuts rendered beside the calendar. */
		presets?: DateRangePreset[];
		/** Locale for formatting the trigger label. Defaults to the browser locale. */
		locale?: string;
		/** Trigger label shown when no range is selected. */
		placeholder?: string;
		/** Number of months shown side by side. */
		numberOfMonths?: number;
		/** First day of the week, forwarded to the calendar. */
		weekStartsOn?: RangeCalendarProps['weekStartsOn'];
		/** Trigger button appearance. */
		triggerProps?: {
			variant?: 'primary' | 'secondary' | 'invisible';
			size?: 'small' | 'base' | 'large';
		};
		/** Additional props forwarded to the underlying range calendar. */
		rangeCalendarProps?: RangeCalendarProps;
		/** Accessible label for the trigger and calendar. */
		'aria-label'?: string;
	}
</script>

<script lang="ts">
	import { Popover } from '../popover';
	import { RangeCalendar } from '../range-calendar';
	import { Icon } from '../icon';
	import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
	import { MediaQuery } from 'svelte/reactivity';
	import './DateRangeSelector.scss';

	let {
		value = $bindable({ start: undefined, end: undefined }),
		onValueChange,
		presets = [],
		locale = navigator.language,
		placeholder = 'Select range',
		numberOfMonths = 2,
		weekStartsOn,
		triggerProps = { variant: 'secondary', size: 'base' },
		rangeCalendarProps,
		'aria-label': ariaLabel = 'Select date range',
		class: className,
		onOpenChange,
		...popoverProps
	}: DateRangeSelectorProps = $props();

	// Below this width the popover collapses to a single column with no presets.
	const narrow = new MediaQuery('(width < 768px)');
	const visibleMonths = $derived(narrow.current ? 1 : numberOfMonths);
	const showPresets = $derived(presets.length > 0 && !narrow.current);

	const timeZone = getLocalTimeZone();
	const dateFormatter = $derived(
		new DateFormatter(locale, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	);

	// Draft range edited inside the calendar. It only commits back to `value`
	// once both ends are set.
	let draft = $state<DateRange>(value);
	let placeholderMonth = $state<DateValue | undefined>(value.start ?? value.end ?? today(timeZone));
	let syncedKey = $state('');

	function rangeKey(range: DateRange): string {
		return `${range.start?.toString() ?? ''}|${range.end?.toString() ?? ''}`;
	}

	function sameDate(left: DateValue | undefined, right: DateValue | undefined): boolean {
		if (!left || !right) return left === right;
		return left.compare(right) === 0;
	}

	function sameRange(left: DateRange, right: DateRange): boolean {
		return sameDate(left.start, right.start) && sameDate(left.end, right.end);
	}

	function formatDate(date: DateValue): string {
		return dateFormatter.format(date.toDate(timeZone));
	}

	function formatRange(range: DateRange): string {
		if (range.start && range.end) {
			if (sameDate(range.start, range.end)) return formatDate(range.start);
			return `${formatDate(range.start)} - ${formatDate(range.end)}`;
		}
		if (range.start) return `From ${formatDate(range.start)}`;
		if (range.end) return `Until ${formatDate(range.end)}`;
		return placeholder;
	}

	function commit(range: DateRange): void {
		value = range;
		syncedKey = rangeKey(range);
		onValueChange?.(range);
	}

	function syncDraftFromValue(): void {
		draft = value;
		placeholderMonth = value.start ?? value.end ?? today(timeZone);
	}

	function selectPreset(preset: DateRangePreset): void {
		const next = preset.range();
		draft = next;
		placeholderMonth = next.start ?? next.end ?? today(timeZone);
		commit(next);
	}

	function handleRangeChange(next: DateRange): void {
		draft = next;
		placeholderMonth = next.start ?? next.end ?? placeholderMonth;
		if (next.start && next.end) commit(next);
	}

	function handleOpenChange(open: boolean): void {
		onOpenChange?.(open);
		// Discard an incomplete draft when the popover closes.
		if (!open) syncDraftFromValue();
	}

	const activePreset = $derived(presets.find((preset) => sameRange(value, preset.range())));
	const triggerLabel = $derived(activePreset?.label ?? formatRange(value));

	// Keep the draft aligned with externally driven value changes without
	// clobbering an in-progress selection.
	$effect(() => {
		const key = rangeKey(value);
		if (key === syncedKey) return;
		syncedKey = key;
		syncDraftFromValue();
	});
</script>

<Popover
	onOpenChange={handleOpenChange}
	{...popoverProps}
	class={className}
	triggerButtonProps={{
		...triggerProps,
		label: triggerLabel,
		icon: 'calendardates',
		iconPosition: 'right',
		'aria-label': ariaLabel
	}}
>
	<div class="date-range-selector">
		{#if showPresets}
			<div class="date-range-selector__presets" aria-label="Quick ranges">
				{#each presets as preset (preset.id)}
					<button
						type="button"
						class="date-range-selector__preset"
						class:date-range-selector__preset--active={activePreset?.id === preset.id}
						onclick={() => selectPreset(preset)}
					>
						<span>{preset.label}</span>
						{#if activePreset?.id === preset.id}
							<Icon name="check" size="base" variant="primary" />
						{/if}
					</button>
				{/each}
			</div>

			<div class="date-range-selector__separator" aria-hidden="true"></div>
		{/if}

		<div class="date-range-selector__calendar">
			<RangeCalendar
				value={draft}
				onValueChange={handleRangeChange}
				bind:placeholder={placeholderMonth}
				numberOfMonths={visibleMonths}
				{weekStartsOn}
				fixedWeeks
				preventDeselect
				captionLayout="label"
				calendarLabel={ariaLabel}
				{...rangeCalendarProps}
			/>
		</div>
	</div>
</Popover>

<script lang="ts" module>
	import type { RecurrenceSchedule } from './models';

	export interface ScheduleSelectorProps {
		/** Currently selected recurrence schedule, bindable with bind:selected */
		value: RecurrenceSchedule | null;
		/** Callback fired when the schedule selection changes */
		onValueChange?: (schedule: RecurrenceSchedule | null) => void;
		/** Locale for formatting dates and times. Defaults to browser language
		 * if not specified */
		locale?: string;
		/** Additional class for styling */
		class?: string;
	}
</script>

<script lang="ts">
	import { Select } from 'bits-ui';
	import Dialog from '../dialog';
	import { Button } from '../button';
	import ScheduleSelectorCustom from './ScheduleSelectorCustom.svelte';
	import { getScheduleDescription } from './models';
	import { cn } from '../../utils';
	import DropdownSelector from '../dropdown-selector';

	let {
		value = $bindable(null),
		onValueChange,
		class: className,
		locale = navigator.language
	}: ScheduleSelectorProps = $props();

	// Constants
	const WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const;
	type ScheduleType = 'none' | 'daily' | 'weekly' | 'weekday' | 'custom';

	// Default schedule, used if none exists
	function createDefaultSchedule(): RecurrenceSchedule {
		return { pattern: { type: 'daily', interval: 1 }, endCondition: { type: 'never' } };
	}

	// ========================================
	// DROPDOWN
	// ========================================

	// Dropdown state
	let dropdownOpen = $state(false);

	// Function bindings for Select value control
	function getSelectValue(): ScheduleType {
		return currentType;
	}

	function setSelectValue(newType: ScheduleType) {
		if (newType === 'custom') {
			openCustomDialog();
			return;
		}

		const newSchedule = createScheduleForType(newType);
		value = newSchedule;
		onValueChange?.(newSchedule);
	}

	// Create a schedule object for the given selected dropdown option
	function createScheduleForType(type: ScheduleType): RecurrenceSchedule | null {
		switch (type) {
			case 'none':
				return null;
			case 'daily':
				return {
					pattern: { type: 'daily', interval: 1 },
					endCondition: { type: 'never' }
				};
			case 'weekly':
				return {
					pattern: { type: 'weekly', interval: 1, daysOfWeek: [] },
					endCondition: { type: 'never' }
				};
			case 'weekday':
				return {
					pattern: { type: 'weekly', interval: 1, daysOfWeek: [...WEEKDAYS] },
					endCondition: { type: 'never' }
				};
			case 'custom':
				return value || createDefaultSchedule();
		}
	}

	// Check if a recurrence pattern matches the "every weekday" pattern
	function isWeekdayPattern(pattern: RecurrenceSchedule['pattern']): boolean {
		return (
			pattern.type === 'weekly' &&
			pattern.interval === 1 &&
			pattern.daysOfWeek.length === 5 &&
			pattern.daysOfWeek.every((day: string) => WEEKDAYS.includes(day as (typeof WEEKDAYS)[number]))
		);
	}

	// Determine the currently selected schedule type based on the recurrence pattern
	const currentType = $derived.by((): ScheduleType => {
		void customDialogOpen; // Re-run when dropdown state changes

		if (!value) return 'none';

		const { pattern, endCondition } = value;

		// Any end condition other than 'never' must be custom
		if (endCondition.type !== 'never') return 'custom';

		switch (pattern.type) {
			case 'daily':
				return pattern.interval === 1 ? 'daily' : 'custom';
			case 'weekly':
				if (isWeekdayPattern(pattern)) return 'weekday';
				if (pattern.interval === 1 && pattern.daysOfWeek.length === 0) return 'weekly';
				return 'custom';
			case 'monthly':
			case 'yearly':
				return 'custom';
			default:
				return 'custom';
		}
	});

	// Create options for the dropdown
	const scheduleOptions = $derived([
		{ value: 'none', label: 'Does not repeat' },
		{ value: 'daily', label: 'Daily' },
		{ value: 'weekly', label: 'Weekly' },
		{ value: 'weekday', label: 'Every weekday' },
		{
			value: 'custom',
			label:
				currentType === 'custom' && value
					? getScheduleDescription(value, locale) || 'Custom'
					: 'Custom'
		}
	]);

	// ========================================
	// CUSTOM SCHEDULE DIALOG
	// ========================================

	// Dialog state
	let customDialogOpen = $state(false);
	let editedSchedule = $state<RecurrenceSchedule | null>(null);

	function openCustomDialog() {
		dropdownOpen = false;
		customDialogOpen = true;
	}

	// Handle the done button in the custom schedule dialog
	function handleCustomDone() {
		const scheduleToSet = editedSchedule || value || createDefaultSchedule();
		value = scheduleToSet;
		onValueChange?.(value);
		editedSchedule = null;
		customDialogOpen = false;
	}

	// Handle the cancel button in the custom schedule dialog
	function handleCustomCancel() {
		editedSchedule = null;
		customDialogOpen = false;
	}
</script>

<div class={cn('schedule-selector', className)}>
	<Select.Root type="single" bind:value={getSelectValue, setSelectValue} bind:open={dropdownOpen}>
		<DropdownSelector.Trigger
			showAsBadges={false}
			value={[
				{
					value: currentType,
					label:
						scheduleOptions.find((opt) => opt.value === currentType)?.label || 'Select schedule'
				}
			]}
			aria-label="Select schedule"
			style="min-width: 8.5rem"
		/>

		<DropdownSelector.Content>
			{#each scheduleOptions as { value: optionValue, label } (optionValue)}
				{#if optionValue === 'custom'}
					<DropdownSelector.Item
						value={optionValue}
						{label}
						isMultiSelect={false}
						style="padding-top: 0.25rem; padding-bottom: 0.25rem;"
					>
						<div class="schedule-selector__custom-item">
							<span class="schedule-selector__custom-label">{label}</span>
							<Button
								variant="secondary"
								icon="gear"
								size="small"
								aria-label="Edit custom schedule"
								onpointerup={(e) => {
									e.stopImmediatePropagation();
									openCustomDialog();
								}}
							/>
						</div>
					</DropdownSelector.Item>
				{:else}
					<DropdownSelector.Item value={optionValue} {label} isMultiSelect={false} />
				{/if}
			{/each}
		</DropdownSelector.Content>
	</Select.Root>

	<Dialog
		open={customDialogOpen}
		title="Custom repeat schedule"
		size="small"
		triggerButtonProps={{ label: '', variant: 'invisible', style: 'display: none;' }}
		showCloseButton={false}
		zIndex={80}
	>
		<ScheduleSelectorCustom
			value={value || createDefaultSchedule()}
			onValueChange={(newSchedule) => (editedSchedule = newSchedule)}
		/>
		{#snippet footer()}
			<Button variant="secondary" size="base" label="Cancel" onclick={handleCustomCancel} />
			<Button variant="primary" size="base" label="Done" onclick={handleCustomDone} />
		{/snippet}
	</Dialog>
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.schedule-selector {
  gap: 0;
  padding: 0;
}
.schedule-selector__custom-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
}
.schedule-selector__custom-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}</style>

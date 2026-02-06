<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ScheduleSelectorCustom from './ScheduleSelectorCustom.svelte';

	const { Story } = defineMeta({
		title: 'Components/ScheduleSelector/Custom',
		component: ScheduleSelectorCustom,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'object' },
				description: 'The recurrence schedule configuration'
			}
		}
	});
</script>

<script lang="ts">
	import type { RecurrenceSchedule, DayOfWeek } from './models';

	let dailySchedule = $state({
		pattern: { type: 'daily' as const, interval: 1 },
		endCondition: { type: 'never' as const }
	});

	let weeklySchedule = $state<RecurrenceSchedule>({
		pattern: {
			type: 'weekly' as const,
			interval: 1,
			daysOfWeek: ['monday', 'wednesday', 'friday'] as DayOfWeek[]
		},
		endCondition: { type: 'never' as const }
	});

	let monthlySchedule = $state({
		pattern: { type: 'monthly' as const, interval: 1 },
		endCondition: { type: 'never' as const }
	});

	let yearlySchedule = $state({
		pattern: { type: 'yearly' as const, interval: 1 },
		endCondition: { type: 'never' as const }
	});
</script>

<Story name="Daily">
	{#snippet template()}
		<div style="padding: 16px; border: 2px dotted purple; border-radius: 8px;">
			<ScheduleSelectorCustom bind:value={dailySchedule} />
		</div>
	{/snippet}
</Story>

<Story name="Weekly">
	{#snippet template()}
		<div style="padding: 16px; border: 2px dotted purple; border-radius: 8px;">
			<ScheduleSelectorCustom bind:value={weeklySchedule} />
		</div>
	{/snippet}
</Story>

<Story name="Monthly">
	{#snippet template()}
		<div style="padding: 16px; border: 2px dotted purple; border-radius: 8px;">
			<ScheduleSelectorCustom bind:value={monthlySchedule} />
		</div>
	{/snippet}
</Story>

<Story name="Yearly">
	{#snippet template()}
		<div style="padding: 16px; border: 2px dotted purple; border-radius: 8px;">
			<ScheduleSelectorCustom bind:value={yearlySchedule} />
		</div>
	{/snippet}
</Story>

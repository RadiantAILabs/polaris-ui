<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ScheduleSelector from './ScheduleSelector.svelte';

	const { Story } = defineMeta({
		title: 'Components/ScheduleSelector',
		component: ScheduleSelector,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'object' },
				description: 'The currently selected schedule (RecurrenceSchedule | null)'
			}
		}
	});
</script>

<script lang="ts">
	import type { RecurrenceSchedule, DayOfWeek } from './models';

	// State for variants
	let noneSelected = $state(null);
	let dailySelected = $state({
		pattern: { type: 'daily' as const, interval: 1 },
		endCondition: { type: 'never' as const }
	});
	let weeklySelected = $state({
		pattern: { type: 'weekly' as const, interval: 1, daysOfWeek: [] },
		endCondition: { type: 'never' as const }
	});
	let weekdaySelected = $state<RecurrenceSchedule>({
		pattern: {
			type: 'weekly' as const,
			interval: 1,
			daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as DayOfWeek[]
		},
		endCondition: { type: 'never' as const }
	});
	let customSelected = $state({
		pattern: { type: 'monthly' as const, interval: 2 },
		endCondition: { type: 'after' as const, occurrences: 5 }
	});

	// State for playground
	let playgroundSelected = $state(null);
</script>

<Story name="Variants">
	{#snippet template()}
		<div style="display: flex; flex-wrap: wrap; gap: 24px; padding: 40px;">
			<!-- None -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">None</h3>
				<ScheduleSelector bind:value={noneSelected} />
				<div
					style=" max-width: 200px;padding: 8px; margin-top: 12px; font-family: monospace; font-size: 11px; word-wrap: break-word; background: var(--color-background-raised); border-radius: 4px;"
				>
					{JSON.stringify(noneSelected, null, 2)}
				</div>
			</div>

			<!-- Daily -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Daily</h3>
				<ScheduleSelector bind:value={dailySelected} />
				<div
					style=" max-width: 200px;padding: 8px; margin-top: 12px; font-family: monospace; font-size: 11px; word-wrap: break-word; background: var(--color-background-raised); border-radius: 4px;"
				>
					{JSON.stringify(dailySelected, null, 2)}
				</div>
			</div>

			<!-- Weekly -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Weekly</h3>
				<ScheduleSelector bind:value={weeklySelected} />
				<div
					style=" max-width: 200px;padding: 8px; margin-top: 12px; font-family: monospace; font-size: 11px; word-wrap: break-word; background: var(--color-background-raised); border-radius: 4px;"
				>
					{JSON.stringify(weeklySelected, null, 2)}
				</div>
			</div>

			<!-- Weekday -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Weekday</h3>
				<ScheduleSelector bind:value={weekdaySelected} />
				<div
					style=" max-width: 200px;padding: 8px; margin-top: 12px; font-family: monospace; font-size: 11px; word-wrap: break-word; background: var(--color-background-raised); border-radius: 4px;"
				>
					{JSON.stringify(weekdaySelected, null, 2)}
				</div>
			</div>

			<!-- Custom -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Custom</h3>
				<ScheduleSelector bind:value={customSelected} />
				<div
					style=" max-width: 200px;padding: 8px; margin-top: 12px; font-family: monospace; font-size: 11px; word-wrap: break-word; background: var(--color-background-raised); border-radius: 4px;"
				>
					{JSON.stringify(customSelected, null, 2)}
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		value: null
	}}
>
	{#snippet template()}
		<div style="padding: 40px;">
			<ScheduleSelector bind:value={playgroundSelected} />

			<div
				style="padding: 16px; margin-top: 24px; background: var(--color-background-raised); border-radius: 4px;"
			>
				<h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Current Selection:</h4>
				<div
					style=" padding: 12px; margin-bottom: 16px; overflow-x: auto;font-family: monospace; font-size: 11px; background: var(--color-background-sunken); border-radius: 4px;"
				>
					{JSON.stringify(playgroundSelected, null, 2)}
				</div>

				<h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Available Options:</h4>
				<div style="font-size: 12px; line-height: 1.4; color: var(--color-text-secondary);">
					<p style="margin: 0 0 8px;"><strong>None:</strong> Does not repeat (null)</p>
					<p style="margin: 0 0 8px;"><strong>Daily:</strong> Repeats every day</p>
					<p style="margin: 0 0 8px;"><strong>Weekly:</strong> Repeats every week</p>
					<p style="margin: 0 0 8px;">
						<strong>Weekday:</strong> Repeats every weekday (Monday to Friday)
					</p>
					<p style="margin: 0;"><strong>Custom:</strong> Custom schedule configuration</p>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { DateTimeSelector } from './index.js';
	import {
		CalendarDateTime,
		getLocalTimeZone,
		toZoned,
		type ZonedDateTime
	} from '@internationalized/date';

	const { Story } = defineMeta({
		title: 'Components/DateTimeSelector',
		component: DateTimeSelector,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'date' },
				description: 'The currently selected date and time (ZonedDateTime)'
			},
			locale: {
				control: { type: 'text' },
				description: 'Locale for date formatting (defaults to browser locale)'
			},
			placeholder: {
				control: { type: 'text' },
				description: 'Placeholder text when no date is selected'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the component is disabled'
			},
			required: {
				control: { type: 'boolean' },
				description: 'Whether the component is required'
			},
			triggerProps: {
				control: { type: 'object' },
				description: 'Props for the trigger button styling'
			}
		}
	});
</script>

<script lang="ts">
	let basicValue = $state<ZonedDateTime | undefined>();
	let presetValue = $state<ZonedDateTime | undefined>(
		toZoned(new CalendarDateTime(2025, 6, 15, 14, 30), getLocalTimeZone())
	); // June 15, 2025, 2:30 PM
	let disabledValue = $state<ZonedDateTime | undefined>(
		toZoned(new CalendarDateTime(2024, 12, 25, 10, 0), getLocalTimeZone())
	);
	let customValue = $state<ZonedDateTime | undefined>();
</script>

<Story name="Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 24px; padding: 40px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">Empty</h3>
				<DateTimeSelector bind:value={basicValue} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">With Preset Value</h3>
				<DateTimeSelector bind:value={presetValue} placeholder="Choose a different date" />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">Disabled</h3>
				<DateTimeSelector bind:value={disabledValue} disabled />
			</div>

			<div>
				<h3
					style="margin: 0 0 16px; font-size: 16px; font-weight:
				600;"
				>
					Custom trigger button
				</h3>
				<DateTimeSelector
					bind:value={customValue}
					triggerProps={{ variant: 'primary', size: 'large' }}
					placeholder="Select event date and time"
				/>
			</div>
		</div>
	{/snippet}
</Story>

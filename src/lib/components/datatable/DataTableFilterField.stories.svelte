<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DataTableFilterField from './DataTableFilterField.svelte';

	const { Story } = defineMeta({
		title: 'Components/DataTable/FilterField',
		component: DataTableFilterField,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: { type: 'text' },
				description: 'Column label, shown inside the field as a stable name before the value.'
			},
			clearable: {
				control: { type: 'boolean' },
				description: 'Show a trailing clear button while the field has a value.'
			}
		}
	});
</script>

<script lang="ts">
	let empty = $state('');
	let filled = $state('run_01J8Z...');

	function onInput(set: (v: string) => void) {
		return (e: Event) => set((e.currentTarget as HTMLInputElement).value);
	}
</script>

<Story name="States">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 24px; width: 340px;">
			<div>
				<h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 500;">Empty</h3>
				<DataTableFilterField
					label="Run"
					value={empty}
					oninput={onInput((v) => (empty = v))}
					clearable
					aria-label="Search by run"
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 500;">Filled</h3>
				<DataTableFilterField
					label="Run"
					value={filled}
					oninput={onInput((v) => (filled = v))}
					clearable
					aria-label="Search by run"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		label: 'Run',
		clearable: true
	}}
>
	{#snippet template(args)}
		<div style="width: 340px;">
			<DataTableFilterField {...args} aria-label="Search by run" />
		</div>
	{/snippet}
</Story>

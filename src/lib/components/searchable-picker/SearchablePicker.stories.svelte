<script module lang="ts">
	import { expect, userEvent, within, waitFor } from 'storybook/test';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { SearchablePicker, type PickerOption } from './index';
	const { Story } = defineMeta({
		title: 'Components/SearchablePicker',
		component: SearchablePicker,
		tags: ['autodocs'],
		parameters: { layout: 'centered' }
	});
	const options: PickerOption[] = [
		{ value: 'duration', label: 'Duration', section: 'Log fields' },
		{ value: 'started', label: 'Started', section: 'Log fields' },
		{ value: 'status', label: 'Status', section: 'Log fields' },
		{ value: 'agent', label: 'gen_ai.agent.name', section: 'Attributes' },
		{ value: 'model', label: 'gen_ai.request.model', section: 'Attributes' },
		{ value: 'session', label: 'session.id', section: 'Attributes' },
		{ value: 'disabled', label: 'Unavailable field', section: 'Attributes', disabled: true }
	];
	async function selectWithKeyboard({ canvasElement }: { canvasElement: HTMLElement }) {
		const canvas = within(canvasElement);
		const search = canvas.getByRole('combobox');
		await userEvent.type(search, 'gen_ai');
		await waitFor(() => expect(canvas.getAllByRole('option')).toHaveLength(2));
		await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');
		await waitFor(() =>
			expect(canvas.getByRole('option', { name: 'gen_ai.request.model' })).toHaveAttribute(
				'aria-selected',
				'true'
			)
		);
		await userEvent.clear(search);
		await userEvent.keyboard('{ArrowUp}{Enter}');
		await waitFor(() =>
			expect(canvas.getByRole('option', { name: 'session.id' })).toHaveAttribute(
				'aria-selected',
				'true'
			)
		);
	}
</script>

<script lang="ts">
	let query = $state('');
	let selected = $state<string[]>(['agent']);
	const items = $derived(
		options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
	);
</script>

{#snippet searchAndSectionsExample()}
	<div class="picker-preview" style="width: 320px;">
		<SearchablePicker
			{items}
			bind:query
			{selected}
			onSelect={(value) => (selected = selected.includes(value) ? [] : [value])}
		/>
	</div>
{/snippet}

<Story name="Search And Sections" template={searchAndSectionsExample} />
<Story
	name="Search And Sections interactions"
	tags={['interaction', '!dev', '!autodocs']}
	play={selectWithKeyboard}
	template={searchAndSectionsExample}
/>
<Story name="Loading">
	{#snippet template()}<div class="picker-preview" style="width: 320px;">
			<SearchablePicker items={[]} loading onSelect={() => {}} />
		</div>{/snippet}
</Story>
<Story name="Empty">
	{#snippet template()}<div class="picker-preview" style="width: 320px;">
			<SearchablePicker items={[]} emptyMessage="No matching fields" onSelect={() => {}} />
		</div>{/snippet}
</Story>
<Story name="Long Labels">
	{#snippet template()}
		<div class="picker-preview" style="width: 240px;">
			<SearchablePicker
				items={[{ value: 'long', label: 'example.origin.very_long_custom_attribute_name' }]}
				selected={['long']}
				onSelect={() => {}}
			/>
		</div>
	{/snippet}
</Story>

<style lang="scss">
	@use '../../styles/floating';

	.picker-preview {
		@include floating.surface;

		padding: 0;
	}
</style>

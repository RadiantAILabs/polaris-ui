<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { DropdownMenu } from './index';

	const sampleItems = [
		'Apple',
		'Banana',
		'Cherry',
		'Date',
		'Elderberry',
		'Fig',
		'Grape',
		'Honeydew'
	];

	const { Story } = defineMeta({
		title: 'Components/DropdownMenu',
		component: DropdownMenu,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			buttonLabel: {
				control: { type: 'text' },
				description: 'Text displayed on the dropdown trigger button'
			},
			buttonProps: {
				control: { type: 'object' },
				description: 'Props to pass to the trigger button (variant, size, etc.)'
			},
			items: {
				control: { type: 'object' },
				description: 'Array of string items to display in the dropdown'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the dropdown menu is disabled'
			},
			align: {
				control: { type: 'select' },
				options: ['start', 'end'],
				description: 'Alignment of dropdown relative to trigger (start = left, end = right)'
			},
			onSelect: {
				action: 'selected',
				description: 'Callback function called when an item is selected'
			}
		}
	});
</script>

<script lang="ts">
	let selectedValue = $state('');

	function handleSelect(value: string) {
		selectedValue = value;
		console.log('Selected:', value);
	}
</script>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 300px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Default</h3>
				<DropdownMenu buttonLabel="Select a fruit" items={sampleItems} onSelect={handleSelect} />
				{#if selectedValue}
					<p style="margin-top: 8px; font-size: 12px; color: #666;">
						Selected: <strong>{selectedValue}</strong>
					</p>
				{/if}
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Disabled</h3>
				<DropdownMenu buttonLabel="Select a fruit" items={sampleItems} disabled={true} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Empty Items</h3>
				<DropdownMenu buttonLabel="No options" items={[]} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Alignment Options</h3>
				<div style="display: flex; gap: 16px; align-items: center;">
					<div>
						<p style="margin: 0 0 8px; font-size: 12px; color: #666;">Start aligned</p>
						<DropdownMenu
							buttonLabel="Start"
							items={['Very Long Option Name That Extends', 'Short', 'Medium Length Option']}
							align="start"
						/>
					</div>
					<div>
						<p style="margin: 0 0 8px; font-size: 12px; color: #666;">End aligned</p>
						<DropdownMenu
							buttonLabel="End"
							items={['Very Long Option Name That Extends', 'Short', 'Medium Length Option']}
							align="end"
						/>
					</div>
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Long Items List</h3>
				<DropdownMenu
					buttonLabel="Select from many"
					items={[
						...sampleItems,
						'Kiwi',
						'Lemon',
						'Mango',
						'Nectarine',
						'Orange',
						'Papaya',
						'Quince',
						'Raspberry',
						'Strawberry',
						'Tangerine'
					]}
					onSelect={handleSelect}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		buttonLabel: 'Select a fruit',
		items: sampleItems,
		disabled: false,
		align: 'start'
	}}
>
	{#snippet template(args)}
		<div style="width: 300px;">
			<DropdownMenu {...args} />
		</div>
	{/snippet}
</Story>

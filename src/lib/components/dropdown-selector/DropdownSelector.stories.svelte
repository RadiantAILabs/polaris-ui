<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DropdownSelector from './index';

	const sampleOptions = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'date', label: 'Date' },
		{ value: 'elderberry', label: 'Elderberry' },
		{ value: 'fig', label: 'Fig' },
		{ value: 'grape', label: 'Grape', disabled: true },
		{ value: 'honeydew', label: 'Honeydew' }
	];

	const { Story } = defineMeta({
		title: 'Components/DropdownSelector',
		component: DropdownSelector,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: { type: 'select' },
				options: ['single', 'multiple'],
				description: 'Selection type - single or multiple'
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'invisible'],
				description: 'Visual variant of the dropdown selector'
			},
			fullWidth: {
				control: { type: 'boolean' },
				description: 'Whether the dropdown selector should take full width (default: true)'
			},
			icon: {
				control: { type: 'text' },
				description: 'Trailing icon name (default: chevron-down)'
			},
			placeholder: {
				control: { type: 'text' },
				description: 'Placeholder text when no option is selected'
			},
			label: {
				control: { type: 'text' },
				description: 'Field name displayed inside the trigger before the value/placeholder'
			},
			leadingIcon: {
				control: { type: 'text' },
				description: 'Icon displayed at the start of the trigger'
			},
			items: {
				control: { type: 'object' },
				description: 'Array of items with value, label, and optional disabled properties'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the dropdown selector is disabled'
			},
			clearable: {
				control: { type: 'boolean' },
				description:
					'Whether to show a clear ("x") button that resets the selection while there is a value'
			},
			'aria-invalid': {
				control: { type: 'boolean' },
				description: 'Whether the dropdown selector is in error state'
			},
			value: {
				control: { type: 'text' },
				description: 'Selected value'
			}
		}
	});
</script>

<script lang="ts">
	let selectedValue = $state('apple');
	let disabledValue = $state('banana');

	// Multiple select state
	let multipleSelectedValues = $state(['apple', 'banana']);
	let multipleDisabledValues = $state(['cherry', 'date']);
</script>

<Story name="Single Select - All Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 300px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Default</h3>
				<DropdownSelector type="single" items={sampleOptions} placeholder="Select a fruit..." />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Clearable</h3>
				<DropdownSelector type="single" items={sampleOptions} label="Fruit" clearable />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">With Selected Value</h3>
				<DropdownSelector
					type="single"
					items={sampleOptions}
					placeholder="Select a fruit..."
					bind:value={selectedValue}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Leading Icon</h3>
				<DropdownSelector
					type="single"
					items={sampleOptions}
					leadingIcon="timer"
					showAsBadges={false}
					bind:value={selectedValue}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Disabled</h3>
				<DropdownSelector
					type="single"
					items={sampleOptions}
					placeholder="Select a fruit..."
					disabled={true}
					bind:value={disabledValue}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Error State</h3>
				<DropdownSelector
					type="single"
					items={sampleOptions}
					placeholder="Select a fruit..."
					aria-invalid={true}
				/>
			</div>

			<div>
				<h3
					style="margin: 0 0 16px; font-size: 14px; font-weight:
				500;"
				>
					No options
				</h3>
				<DropdownSelector type="single" items={[]} placeholder="No options available..." />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Long Options List</h3>
				<DropdownSelector
					type="single"
					items={[
						...sampleOptions,
						{ value: 'kiwi', label: 'Kiwi' },
						{ value: 'lemon', label: 'Lemon' },
						{ value: 'mango', label: 'Mango' },
						{ value: 'nectarine', label: 'Nectarine' },
						{ value: 'orange', label: 'Orange' },
						{ value: 'papaya', label: 'Papaya' },
						{ value: 'quince', label: 'Quince' },
						{ value: 'raspberry', label: 'Raspberry' },
						{ value: 'strawberry', label: 'Strawberry' },
						{
							value: 'tangerine',
							label: 'Tangerine but with a very long label to test overflow behavior'
						}
					]}
					placeholder="Select from many fruits..."
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					Text Display (displayAsBadges=false)
				</h3>
				<DropdownSelector
					type="single"
					items={sampleOptions}
					placeholder="Select a fruit..."
					showAsBadges={false}
					bind:value={selectedValue}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Multiple Select - All Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 300px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Default</h3>
				<DropdownSelector type="multiple" items={sampleOptions} placeholder="Select fruits..." />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">With Selected Values</h3>
				<DropdownSelector
					type="multiple"
					items={sampleOptions}
					placeholder="Select fruits..."
					bind:value={multipleSelectedValues}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Disabled</h3>
				<DropdownSelector
					type="multiple"
					items={sampleOptions}
					placeholder="Select fruits..."
					disabled={true}
					bind:value={multipleDisabledValues}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Error State</h3>
				<DropdownSelector
					type="multiple"
					items={sampleOptions}
					placeholder="Select fruits..."
					aria-invalid={true}
					value={['apple']}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Overflow</h3>
				<DropdownSelector
					type="multiple"
					items={[
						...sampleOptions,
						{ value: 'kiwi', label: 'Kiwi' },
						{ value: 'lemon', label: 'Lemon' },
						{ value: 'mango', label: 'Mango' },
						{ value: 'nectarine', label: 'Nectarine' },
						{ value: 'orange', label: 'Orange' }
					]}
					placeholder="Select many fruits..."
					value={['apple', 'banana', 'cherry', 'date', 'kiwi', 'lemon', 'mango']}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					Text Display (displayAsBadges=false)
				</h3>
				<DropdownSelector
					type="multiple"
					items={sampleOptions}
					placeholder="Select fruits..."
					showAsBadges={false}
					bind:value={multipleSelectedValues}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 300px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Default Variant</h3>
				<DropdownSelector
					type="single"
					items={sampleOptions}
					placeholder="Select a fruit..."
					variant="default"
					showAsBadges={false}
					bind:value={selectedValue}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Invisible Variant</h3>
				<DropdownSelector
					type="single"
					items={sampleOptions}
					placeholder="Select a fruit..."
					variant="invisible"
					showAsBadges={false}
					bind:value={selectedValue}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Width and Icon Customization">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					Auto Width (default, hugs content)
				</h3>
				<DropdownSelector
					type="single"
					items={sampleOptions}
					placeholder="Select a fruit..."
					showAsBadges={false}
					bind:value={selectedValue}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					Full Width (fullWidth=true)
				</h3>
				<DropdownSelector
					type="single"
					items={sampleOptions}
					placeholder="Select a fruit..."
					showAsBadges={false}
					fullWidth={true}
					bind:value={selectedValue}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Custom Trailing Icon</h3>
				<DropdownSelector
					type="single"
					items={sampleOptions}
					placeholder="Select a fruit..."
					showAsBadges={false}
					icon="code"
					bind:value={selectedValue}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Inline Label">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 300px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Single Select</h3>
				<p style="margin: 0 0 16px; font-size: 12px; color: #666;">
					The <code>label</code> prop renders a field name inside the trigger, before the value or placeholder.
				</p>
				<DropdownSelector
					type="single"
					items={sampleOptions}
					label="Fruit"
					placeholder="Select a fruit..."
					showAsBadges={false}
					bind:value={selectedValue}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Multiple Select</h3>
				<DropdownSelector
					type="multiple"
					items={sampleOptions}
					label="Fruits"
					placeholder="Select fruits..."
					showAsBadges={false}
					bind:value={multipleSelectedValues}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Clearable">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 300px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Single Select</h3>
				<p style="margin: 0 0 16px; font-size: 12px; color: #666;">
					With a selection, the chevron becomes a clear button; clicking it resets the value.
				</p>
				<DropdownSelector
					type="single"
					items={sampleOptions}
					placeholder="Select a fruit..."
					showAsBadges={false}
					clearable
					bind:value={selectedValue}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Multiple Select</h3>
				<DropdownSelector
					type="multiple"
					items={sampleOptions}
					placeholder="Select fruits..."
					clearable
					bind:value={multipleSelectedValues}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		type: 'single',
		variant: 'default',
		items: sampleOptions,
		placeholder: 'Select a fruit...',
		label: 'Fruit',
		disabled: false,
		clearable: false,
		'aria-invalid': false,
		value: '',
		fullWidth: false
	}}
>
	{#snippet template(args)}
		<div style="width: 300px;">
			<DropdownSelector {...args} />
			{#if args.value}
				<p style="margin-top: 16px; font-size: 14px; color: #666;">
					Selected: <strong>{args.value}</strong>
				</p>
			{/if}
		</div>
	{/snippet}
</Story>

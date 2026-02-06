<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Form from './index';

	const { Story } = defineMeta({
		title: 'Components/Form/Field',
		component: Form.Field,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			name: {
				control: { type: 'text' },
				description: 'Field name for form data binding'
			},
			label: {
				control: { type: 'text' },
				description: 'Label text for the form field'
			},
			size: {
				control: { type: 'select' },
				options: ['base', 'large'],
				description: 'Size variant of the form field'
			},
			description: {
				control: { type: 'text' },
				description: 'Help text for the field'
			},
			descriptionType: {
				control: { type: 'select' },
				options: ['default', 'info'],
				description: 'Style variant of the description'
			},
			required: {
				control: { type: 'boolean' },
				description: 'Whether the field is required'
			},
			error: {
				control: { type: 'text' },
				description: 'Error message to display (overrides form context errors)'
			}
		}
	});
</script>

<script lang="ts">
	import { Input } from '../input';
	import DropdownSelector from '../dropdown-selector';
	import { MultilineInput } from '../multilineinput';
	import { PromptEditor } from '../prompt-editor';

	const sampleDropdownControls = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];

	let inputValue = $state('Value');
	let dropdownValue = $state('option1');
	let multilineValue = $state('This is a multiline\ntext example');
	let promptValue = $state('Write a {{type}} about {{subject}}');
</script>

<Story name="Sizes">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 400px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Base Size</h3>
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<Form.Field name="field1" label="Without Detail">
						{#snippet children({ props })}
							<Input {...props} placeholder="Enter value..." />
						{/snippet}
					</Form.Field>

					<Form.Field
						name="field2"
						label="Default Detail"
						description="This is a default detail message"
						descriptionType="default"
					>
						{#snippet children({ props })}
							<Input {...props} placeholder="Enter value..." />
						{/snippet}
					</Form.Field>

					<Form.Field
						name="field3"
						label="Info Detail"
						description="This is an info detail message with icon"
						descriptionType="info"
					>
						{#snippet children({ props })}
							<Input {...props} placeholder="Enter value..." />
						{/snippet}
					</Form.Field>
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Large Size</h3>
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<Form.Field name="field4" label="Without Detail" size="large">
						{#snippet children({ props })}
							<Input {...props} placeholder="Enter value..." />
						{/snippet}
					</Form.Field>

					<Form.Field
						name="field5"
						label="Default Detail"
						size="large"
						description="This is a default detail message"
						descriptionType="default"
					>
						{#snippet children({ props })}
							<Input {...props} placeholder="Enter value..." />
						{/snippet}
					</Form.Field>

					<Form.Field
						name="field6"
						label="Info Detail"
						size="large"
						description="This is an info detail message with icon"
						descriptionType="info"
					>
						{#snippet children({ props })}
							<Input {...props} placeholder="Enter value..." />
						{/snippet}
					</Form.Field>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="All Input Types">
	{#snippet template()}
		<div style="display: flex; gap: 48px;">
			<!-- Normal State Column -->
			<div style="display: flex; flex-direction: column; gap: 32px; width: 500px;">
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 500;">Normal State</h3>

				<Form.Field
					name="textInput"
					label="Text Input"
					description="Single line text input"
					descriptionType="info"
				>
					{#snippet children({ props })}
						<Input {...props} bind:value={inputValue} placeholder="Type something..." />
					{/snippet}
				</Form.Field>

				<Form.Field
					name="dropdown"
					label="Dropdown Selector"
					description="Select from available options"
					descriptionType="info"
				>
					{#snippet children({ props })}
						<DropdownSelector
							{...props}
							type="single"
							items={sampleDropdownControls}
							bind:value={dropdownValue}
							placeholder="Select an option..."
						/>
					{/snippet}
				</Form.Field>

				<Form.Field
					name="multiline"
					label="Multiline Input"
					description="Multi-line text editor"
					descriptionType="info"
				>
					{#snippet children({ props })}
						<MultilineInput
							{...props}
							bind:value={multilineValue}
							placeholder="Enter multiple lines..."
						/>
					{/snippet}
				</Form.Field>

				<Form.Field
					name="prompt"
					label="Prompt Editor"
					description="AI prompt template with variables"
					descriptionType="info"
				>
					{#snippet children({ props })}
						<PromptEditor
							{...props}
							bind:value={promptValue}
							placeholder="Create your AI prompt..."
							parameters={['email', 'report', 'summary']}
						/>
					{/snippet}
				</Form.Field>
			</div>

			<!-- Error State Column -->
			<div style="display: flex; flex-direction: column; gap: 32px; width: 500px;">
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 500;">Error State</h3>

				<Form.Field
					name="textInputError"
					label="Text Input"
					description="Single line text input"
					descriptionType="info"
					error="This field is required and cannot be empty"
				>
					{#snippet children({ props })}
						<Input {...props} value="" placeholder="Type something..." />
					{/snippet}
				</Form.Field>

				<Form.Field
					name="dropdownError"
					label="Dropdown Selector"
					description="Select from available options"
					descriptionType="info"
					error="Please select a valid option"
				>
					{#snippet children({ props })}
						<DropdownSelector
							type="single"
							{...props}
							items={sampleDropdownControls}
							value=""
							placeholder="Select an option..."
						/>
					{/snippet}
				</Form.Field>

				<Form.Field
					name="multilineError"
					label="Multiline Input"
					description="Multi-line text editor"
					descriptionType="info"
					error="Content must be at least 10 characters long"
				>
					{#snippet children({ props })}
						<MultilineInput {...props} value="Short" placeholder="Enter multiple lines..." />
					{/snippet}
				</Form.Field>

				<Form.Field
					name="promptError"
					label="Prompt Editor"
					description="AI prompt template with variables"
					descriptionType="info"
					error="Template must contain at least one variable placeholder"
				>
					{#snippet children({ props })}
						<PromptEditor
							{...props}
							value="Write a simple prompt without variables"
							placeholder="Create your AI prompt..."
							parameters={['email', 'report', 'summary']}
						/>
					{/snippet}
				</Form.Field>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Overflow Handling"
	args={{
		name: 'overflow',
		label: 'This is a very long input label which should be handled properly when it overflows',
		size: 'base',
		description:
			'This is a very long detail message that should wrap properly and test the icon alignment when text overflows to multiple lines',
		descriptionType: 'info'
	}}
>
	{#snippet template(args)}
		<div style="width: 300px;">
			<Form.Field {...args}>
				{#snippet children({ props })}
					<Input {...props} value="Sample Value" placeholder="Type something..." />
				{/snippet}
			</Form.Field>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		name: 'playground',
		label: 'Form Field Label',
		size: 'base',
		description: 'This is a helpful detail message',
		descriptionType: 'info',
		error: ''
	}}
>
	{#snippet template(args)}
		<div style="width: 400px;">
			<Form.Field {...args}>
				{#snippet children({ props })}
					<Input {...props} value="Sample Value" placeholder="Enter value..." />
				{/snippet}
			</Form.Field>
		</div>
	{/snippet}
</Story>

<Story name="ID Collision Test">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<!-- Multiple identical FormFields to trigger collisions -->
			{#each Array(5).keys() as i (i)}
				<Form.Field
					name="test-field-{i}"
					label="Test Field {i + 1}"
					description="This field tests ID generation"
					descriptionType="info"
					error={i === 2 ? 'Test error message' : ''}
				>
					<Input value="Test value {i + 1}" />
				</Form.Field>
			{/each}

			<button
				onclick={() => {
					// Run collision check in Storybook
					const allIds = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
					const duplicates = allIds.filter((id, index) => allIds.indexOf(id) !== index);

					if (duplicates.length > 0) {
						alert(`ID Collisions detected: ${[...new Set(duplicates)].join(', ')}`);
						console.error('Duplicate IDs:', duplicates);
					} else {
						alert('No ID collisions found!');
					}
				}}
			>
				Check for ID Collisions
			</button>
		</div>
	{/snippet}
</Story>

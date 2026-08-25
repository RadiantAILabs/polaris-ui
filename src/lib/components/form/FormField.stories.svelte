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
			description: {
				control: { type: 'text' },
				description: 'Help text for the field'
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

<Story name="Detail Types">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
			<Form.Field name="field1" label="Without Detail">
				{#snippet children({ props })}
					<Input {...props} placeholder="Enter value..." />
				{/snippet}
			</Form.Field>

			<Form.Field name="field2" label="With Detail" description="This is a detail message">
				{#snippet children({ props })}
					<Input {...props} placeholder="Enter value..." />
				{/snippet}
			</Form.Field>
		</div>
	{/snippet}
</Story>

<Story name="All Input Types">
	{#snippet template()}
		<div style="display: flex; gap: 48px;">
			<!-- Normal State Column -->
			<div style="display: flex; flex-direction: column; gap: 32px; width: 500px;">
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 500;">Normal State</h3>

				<Form.Field name="textInput" label="Text Input" description="Single line text input">
					{#snippet children({ props })}
						<Input {...props} bind:value={inputValue} placeholder="Type something..." />
					{/snippet}
				</Form.Field>

				<Form.Field
					name="dropdown"
					label="Dropdown Selector"
					description="Select from available options"
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

				<Form.Field name="multiline" label="Multiline Input" description="Multi-line text editor">
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
		description:
			'This is a very long detail message that should wrap properly when text overflows to multiple lines'
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
		description: 'This is a helpful detail message',
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

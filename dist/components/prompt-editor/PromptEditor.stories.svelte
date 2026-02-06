<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PromptEditor from './PromptEditor.svelte';
	import ParameterInputPane from './ParameterInputPane.svelte';

	const { Story } = defineMeta({
		title: 'Components/PromptEditor',
		component: PromptEditor,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs'],
		argTypes: {
			placeholder: {
				control: { type: 'text' },
				description: 'Placeholder text'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the input is disabled'
			},
			'aria-invalid': {
				control: { type: 'boolean' },
				description: 'Whether the input is in error state'
			},
			value: {
				control: { type: 'text' },
				description: 'Input value'
			}
		}
	});

	const sampleParameters = [
		'extract_fields',
		'summarize',
		'classify',
		'extract_url',
		'get_title',
		'find_links'
	];

	const sampleValue1 =
		'Please ' +
		'{{extract_fields}}' +
		' from this document and then ' +
		'{{extract_url}}' +
		' for processing.';
	const sampleValue2 =
		'Please ' +
		'{{extract_fields}}' +
		' from this document and then ' +
		'{{extract_url}}' +
		' for further processing.\n\nExample escaped placeholder: \\' +
		'{{example}}';
	const sampleInvalidValue =
		'Please ' +
		'{{extract_fields}}' +
		' from this document and ' +
		'{{invalid_param}}' +
		' for processing.';
</script>

<Story name="Individual Components">
	{#snippet template()}
		<div style="display: flex; gap: 32px; align-items: flex-start; width: 100%;">
			<div style="flex: 1;">
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">PromptEditor</h3>
				<PromptEditor
					value={sampleValue1}
					placeholder="Enter your template..."
					parameters={sampleParameters}
				/>
			</div>

			<div style="flex: 1;">
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">ParameterInputPane</h3>
				<ParameterInputPane
					parameters={sampleParameters}
					onInsertPlaceholder={(value) => console.log(`Insert ${value}`)}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 100%; max-width: 800px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">Default</h3>
				<PromptEditor
					placeholder="Enter your template with placeholders..."
					parameters={sampleParameters}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">
					With Pre-filled Content
				</h3>
				<PromptEditor
					value={sampleValue2}
					placeholder="Enter your template with placeholders..."
					parameters={sampleParameters}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">Disabled</h3>
				<PromptEditor
					value="This input is disabled and cannot be edited."
					disabled={true}
					parameters={sampleParameters}
				/>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">With Invalid Parameter</h3>
				<PromptEditor value={sampleInvalidValue} parameters={sampleParameters} />
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		placeholder: 'Enter your template with placeholders...',
		disabled: false,
		'aria-invalid': false,
		value: '',
		parameters: sampleParameters
	}}
>
	{#snippet template(args)}
		<div style="width: 100%; max-width: 800px;">
			<PromptEditor {...args} />
		</div>
	{/snippet}
</Story>

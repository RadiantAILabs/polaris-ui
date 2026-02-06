<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { FormSectionLegend } from './index';

	const { Story } = defineMeta({
		title: 'Components/Form/FormSectionLegend',
		component: FormSectionLegend,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: { type: 'text' },
				description: 'The main title of the form section legend'
			},
			actionButton: {
				control: { type: 'object' },
				description: 'Configuration for the action button (optional)'
			}
		}
	});
</script>

<script lang="ts">
	const sampleActionButton = {
		variant: 'secondary',
		label: 'Click here',
		icon: 'chevron-right'
	} as const;
</script>

<Story
	name="Overflow Handling"
	args={{
		title:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		actionButton: sampleActionButton
	}}
>
	{#snippet template(args)}
		<FormSectionLegend {...args} />
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		title: 'Form Section Legend',
		actionButton: sampleActionButton
	}}
>
	{#snippet template(args)}
		<FormSectionLegend {...args} />
	{/snippet}
</Story>

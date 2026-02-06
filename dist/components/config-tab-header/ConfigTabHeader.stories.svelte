<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ConfigTabHeader } from './index';

	const { Story } = defineMeta({
		title: 'Components/ConfigTabHeader',
		component: ConfigTabHeader,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: { type: 'text' },
				description: 'The main title of the configuration section'
			},
			backTo: {
				control: { type: 'text' },
				description: 'The name of the section to go back to, or null to hide the back button'
			},
			onBack: {
				action: 'back-clicked',
				description: 'Callback function when the back button is clicked'
			},
			detail: {
				control: { type: 'text' },
				description: 'Optional detail text shown below the title'
			},
			actionButton: {
				control: { type: 'object' },
				description: 'Configuration for the action button'
			}
		}
	});
</script>

<script lang="ts">
	const sampleActionButton = {
		variant: 'secondary' as const,
		label: 'Click here',
		icon: 'chevron-right' as const
	};

	function handleBack() {
		console.log('Back button clicked');
	}
</script>

<Story
	name="Default"
	args={{
		title: 'Subsection 1',
		backTo: 'Section 1',
		detail: 'Detail',
		actionButton: sampleActionButton,
		onBack: handleBack
	}}
>
	{#snippet template(args)}
		<ConfigTabHeader {...args} />
	{/snippet}
</Story>

<Story
	name="No Back Button"
	args={{
		title: 'Main Configuration',
		detail: 'Primary configuration section',
		actionButton: sampleActionButton
	}}
>
	{#snippet template(args)}
		<ConfigTabHeader {...args} />
	{/snippet}
</Story>

<Story
	name="Overflow Handling"
	args={{
		title:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		backTo: 'Section 1',
		detail:
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		actionButton: sampleActionButton,
		onBack: handleBack
	}}
>
	{#snippet template(args)}
		<ConfigTabHeader {...args} />
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		title: 'Configuration Section',
		backTo: 'Main Menu',
		detail: 'Configure settings',
		actionButton: sampleActionButton,
		onBack: handleBack
	}}
>
	{#snippet template(args)}
		<ConfigTabHeader {...args} />
	{/snippet}
</Story>

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SideWindowTitlePane from './SideWindowTitlePane.svelte';

	const { Story } = defineMeta({
		title: 'Components/SideWindowTitlePane',
		component: SideWindowTitlePane,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs'],
		argTypes: {
			showNavbar: {
				control: { type: 'boolean' },
				description: 'Whether to show the navbar placeholder'
			},
			title: {
				control: { type: 'text' },
				description: 'Default title when no custom content provided'
			},
			navProps: {
				control: { type: 'object' },
				description: 'Props for the UnderlineNav component'
			},
			iconAndText1: {
				control: { type: 'object' },
				description: 'First icon and text pair (narrow variant only)'
			},
			iconAndText2: {
				control: { type: 'object' },
				description: 'Second icon and text pair (narrow variant only)'
			}
		}
	});
</script>

<script lang="ts">
	// Sample iconAndText configurations
	const sampleIconAndText1 = {
		icon: 'timer',
		text: '13.6 s'
	} as const;

	const sampleIconAndText2 = {
		icon: 'tokens',
		text: '2523'
	} as const;

	// Sample nav configurations
	const sampleNavProps = {
		tabs: [{ label: 'Configuration' }, { label: 'Logs' }, { label: 'Metrics' }],
		activeTab: 'Configuration'
	};
</script>

<Story
	name="Without Navbar"
	args={{
		title: 'Without Navbar',
		iconAndText1: sampleIconAndText1,
		iconAndText2: sampleIconAndText2
	}}
>
	{#snippet template(args)}
		<SideWindowTitlePane {...args} />
	{/snippet}
</Story>

<Story
	name="With Navbar"
	args={{
		title: 'With Navbar',
		showNavbar: true,
		navProps: sampleNavProps,
		iconAndText1: sampleIconAndText1,
		iconAndText2: sampleIconAndText2
	}}
>
	{#snippet template(args)}
		<SideWindowTitlePane {...args} />
	{/snippet}
</Story>

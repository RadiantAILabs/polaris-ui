<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SideWindowTitlePane from './SideWindowTitlePane.svelte';
	import { IconAndText } from '../icon-and-text';
	import Badge from '../badge/Badge.svelte';

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
			}
		}
	});
</script>

<script lang="ts">
	const sampleNavProps = {
		tabs: [{ label: 'Configuration' }, { label: 'Logs' }, { label: 'Metrics' }],
		activeTab: 'Configuration'
	};
</script>

<Story
	name="Without Navbar"
	args={{
		title: 'Side Window'
	}}
>
	{#snippet template(args)}
		<SideWindowTitlePane {...args}>
			{#snippet titleLeading()}
				<Badge text="Chat" size="small" variant="outline" />
			{/snippet}
			{#snippet titleTrailing()}
				<Badge text="INFO" size="small" />
			{/snippet}
			{#snippet titleInfo()}
				<IconAndText icon="timer" text="13.6 s" size="large" />
				<IconAndText icon="tokens" text="2523" size="large" />
			{/snippet}
		</SideWindowTitlePane>
	{/snippet}
</Story>

<Story
	name="With Navbar"
	args={{
		title: 'Side Window',
		showNavbar: true,
		navProps: sampleNavProps
	}}
>
	{#snippet template(args)}
		<SideWindowTitlePane {...args}>
			{#snippet titleLeading()}
				<Badge text="Chat" size="small" variant="outline" />
			{/snippet}
			{#snippet titleTrailing()}
				<Badge text="INFO" size="small" />
			{/snippet}
			{#snippet titleInfo()}
				<IconAndText icon="timer" text="13.6 s" size="large" />
				<IconAndText icon="tokens" text="2523" size="large" />
			{/snippet}
		</SideWindowTitlePane>
	{/snippet}
</Story>

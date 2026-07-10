<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SideWindow from './SideWindow.svelte';
	import { IconAndText } from '../icon-and-text';
	import Badge from '../badge/Badge.svelte';

	const { Story } = defineMeta({
		title: 'Components/SideWindow',
		// TODO figure out why this breaks the story layout
		// component: SideWindow,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: { type: 'text' },
				description: 'Window title'
			},
			showNavbar: {
				control: { type: 'boolean' },
				description: 'Whether to show the navbar'
			},
			showTitlePane: {
				control: { type: 'boolean' },
				description: 'Whether to show the title pane'
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
		tabs: [
			{ label: 'Section 1' },
			{ label: 'Section 2' },
			{ label: 'Section 3' },
			{ label: 'Section 4' },
			{ label: 'Section 5' }
		],
		activeTab: 'Section 2'
	};
</script>

<Story
	name="Default"
	args={{
		title: 'Side Window',
		showExpand: true,
		showClose: true
	}}
>
	{#snippet template(args)}
		<div style="height: 600px; border: 1px dashed purple;">
			<SideWindow {...args}>
				{#snippet titleLeading()}
					<Badge text="Chat" size="small" variant="outline" />
				{/snippet}
				{#snippet titleTrailing()}
					<Badge text="INFO" size="small" />
				{/snippet}
				{#snippet titleInfo()}
					<IconAndText icon="timer" text="13.6s" size="large" />
					<IconAndText icon="tokens" text="2523" size="large" />
				{/snippet}
				<div style="color: var(--color-text-primary);">Window content goes here</div>
			</SideWindow>
		</div>
	{/snippet}
</Story>

<Story
	name="With Navbar"
	args={{
		title: 'Side Window',
		showNavbar: true,
		navProps: sampleNavProps,
		showExpand: true,
		showClose: true
	}}
>
	{#snippet template(args)}
		<div style="height: 600px; border: 1px dashed purple;">
			<SideWindow {...args}>
				{#snippet titleLeading()}
					<Badge text="Chat" size="small" variant="outline" />
				{/snippet}
				{#snippet titleTrailing()}
					<Badge text="INFO" size="small" />
				{/snippet}
				{#snippet titleInfo()}
					<IconAndText icon="timer" text="13.6s" size="large" />
					<IconAndText icon="tokens" text="2523" size="large" />
				{/snippet}
				<div style="color: var(--color-text-primary);">Window content goes here</div>
			</SideWindow>
		</div>
	{/snippet}
</Story>

<Story
	name="Without Title Pane"
	args={{
		showTitlePane: false
	}}
>
	{#snippet template(args)}
		<div style="height: 600px; border: 1px dashed purple;">
			<SideWindow {...args}>
				<div style="color: var(--color-text-primary);">Window content without title pane</div>
			</SideWindow>
		</div>
	{/snippet}
</Story>

<Story
	name="With Scrollable Content"
	args={{
		title: 'Scrollable Content Test',
		showTitlePane: true,
		contentPadding: false
	}}
>
	{#snippet template(args)}
		<div style="height: 600px; border: 1px dashed purple;">
			<SideWindow {...args}>
				<div
					style="flex: 1; min-height: 0; padding: 16px; overflow: auto; background-color: lightblue;"
				>
					<div style="height: 2000px;">
						<p style="font-size: 20px; color: white;">SCROLLABLE CONTENT - 2000px tall</p>
					</div>
				</div>
			</SideWindow>
		</div>
	{/snippet}
</Story>

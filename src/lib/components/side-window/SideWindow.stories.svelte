<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SideWindow from './SideWindow.svelte';

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
			},
			iconAndText1: {
				control: { type: 'object' },
				description: 'First icon and text pair'
			},
			iconAndText2: {
				control: { type: 'object' },
				description: 'Second icon and text pair'
			}
		}
	});
</script>

<script lang="ts">
	const sampleIconAndText1 = {
		icon: 'timer',
		text: '13.6s'
	} as const;

	const sampleIconAndText2 = {
		icon: 'tokens',
		text: '2523'
	} as const;

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
		title: 'Side Window Title',
		iconAndText1: sampleIconAndText1,
		iconAndText2: sampleIconAndText2,
		showExpand: true,
		showClose: true
	}}
>
	{#snippet template(args)}
		<div style="height: 600px; border: 1px dashed purple;">
			<SideWindow {...args}>
				<div style="color: var(--color-text-primary);">Window content goes here</div>
			</SideWindow>
		</div>
	{/snippet}
</Story>

<Story
	name="With Navbar"
	args={{
		title: 'Side Window Title',
		showNavbar: true,
		navProps: sampleNavProps,
		iconAndText1: sampleIconAndText1,
		iconAndText2: sampleIconAndText2,
		showExpand: true,
		showClose: true
	}}
>
	{#snippet template(args)}
		<div style="height: 600px; border: 1px dashed purple;">
			<SideWindow {...args}>
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

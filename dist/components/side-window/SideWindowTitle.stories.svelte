<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SideWindowTitle from './SideWindowTitle.svelte';

	const { Story } = defineMeta({
		title: 'Components/SideWindowTitle',
		component: SideWindowTitle,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: { type: 'text' },
				description: 'The title text to display'
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
		text: '13.6 s'
	} as const;

	const sampleIconAndText2 = {
		icon: 'tokens',
		text: '2523'
	} as const;
</script>

<Story
	name="Playground"
	args={{
		title: 'Side Window Title',
		iconAndText1: sampleIconAndText1,
		iconAndText2: sampleIconAndText2
	}}
>
	{#snippet template(args)}
		<div style="border: 1px dashed purple;">
			<SideWindowTitle {...args} />
		</div>
	{/snippet}
</Story>

<Story
	name="Overflow"
	args={{
		title:
			'This is a very long title that should demonstrate overflow behavior when the text exceeds the available space',
		iconAndText1: sampleIconAndText1,
		iconAndText2: sampleIconAndText2
	}}
>
	{#snippet template(args)}
		<div style="max-width: 600px; border: 1px dashed purple;">
			<SideWindowTitle {...args} />
		</div>
	{/snippet}
</Story>

<Story
	name="Variants"
	args={{
		title: 'Side Window Title'
	}}
>
	{#snippet template(args)}
		<div style="display: flex; flex-direction: column; gap: 24px;">
			<div>
				<p style="margin-bottom: 8px; font-size: 12px; color: var(--color-text-secondary);">
					With titleActions snippet
				</p>
				<div style="border: 1px dashed purple;">
					<SideWindowTitle {...args} iconAndText1={sampleIconAndText1}>
						{#snippet titleActions()}
							<span style="color: var(--color-text-secondary);">Custom Content</span>
						{/snippet}
					</SideWindowTitle>
				</div>
			</div>

			<div>
				<p style="margin-bottom: 8px; font-size: 12px; color: var(--color-text-secondary);">
					Without window management
				</p>
				<div style="border: 1px dashed purple;">
					<SideWindowTitle
						{...args}
						iconAndText1={sampleIconAndText1}
						iconAndText2={sampleIconAndText2}
						showExpand={false}
						showClose={false}
					/>
				</div>
			</div>

			<div>
				<p style="margin-bottom: 8px; font-size: 12px; color: var(--color-text-secondary);">
					Without info icons
				</p>
				<div style="border: 1px dashed purple;">
					<SideWindowTitle {...args} />
				</div>
			</div>

			<div>
				<p style="margin-bottom: 8px; font-size: 12px; color: var(--color-text-secondary);">
					Title only (no icons, no window management)
				</p>
				<div style="border: 1px dashed purple;">
					<SideWindowTitle {...args} showExpand={false} showClose={false} />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

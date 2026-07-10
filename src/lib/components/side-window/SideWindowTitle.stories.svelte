<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SideWindowTitle from './SideWindowTitle.svelte';
	import { IconAndText } from '../icon-and-text';
	import Badge from '../badge/Badge.svelte';

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
			}
		}
	});
</script>

<Story
	name="Playground"
	args={{
		title: 'Side Window Title'
	}}
>
	{#snippet template(args)}
		<div style="border: 1px dashed purple;">
			<SideWindowTitle {...args}>
				{#snippet titleInfo()}
					<IconAndText icon="timer" text="13.6 s" size="large" />
					<IconAndText icon="tokens" text="2523" size="large" />
				{/snippet}
			</SideWindowTitle>
		</div>
	{/snippet}
</Story>

<Story
	name="Overflow"
	args={{
		title:
			'This is a very long title that should demonstrate overflow behavior when the text exceeds the available space'
	}}
>
	{#snippet template(args)}
		<div style="max-width: 600px; border: 1px dashed purple;">
			<SideWindowTitle {...args}>
				{#snippet titleInfo()}
					<IconAndText icon="timer" text="13.6 s" size="large" />
					<IconAndText icon="tokens" text="2523" size="large" />
				{/snippet}
			</SideWindowTitle>
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
					With titleInfo snippet
				</p>
				<div style="border: 1px dashed purple;">
					<SideWindowTitle {...args}>
						{#snippet titleInfo()}
							<IconAndText icon="timer" text="13.6 s" size="large" />
							<span style="color: var(--color-text-secondary);">Custom Content</span>
						{/snippet}
					</SideWindowTitle>
				</div>
			</div>

			<div>
				<p style="margin-bottom: 8px; font-size: 12px; color: var(--color-text-secondary);">
					With titleLeading
				</p>
				<div style="border: 1px dashed purple;">
					<SideWindowTitle {...args}>
						{#snippet titleLeading()}
							<Badge text="Chat" variant="outline" />
						{/snippet}
					</SideWindowTitle>
				</div>
			</div>

			<div>
				<p style="margin-bottom: 8px; font-size: 12px; color: var(--color-text-secondary);">
					With titleTrailing
				</p>
				<div style="border: 1px dashed purple;">
					<SideWindowTitle {...args}>
						{#snippet titleTrailing()}
							<Badge text="INFO" size="small" />
						{/snippet}
					</SideWindowTitle>
				</div>
			</div>

			<div>
				<p style="margin-bottom: 8px; font-size: 12px; color: var(--color-text-secondary);">
					Full example
				</p>
				<div style="border: 1px dashed purple;">
					<SideWindowTitle {...args}>
						{#snippet titleLeading()}
							<Badge text="Chat" variant="outline" />
						{/snippet}
						{#snippet titleTrailing()}
							<Badge text="INFO" size="small" />
						{/snippet}
						{#snippet titleInfo()}
							<IconAndText icon="timer" text="13.6 s" size="large" />
							<IconAndText icon="tokens" text="2523" size="large" />
						{/snippet}
					</SideWindowTitle>
				</div>
			</div>

			<div>
				<p style="margin-bottom: 8px; font-size: 12px; color: var(--color-text-secondary);">
					Without window management
				</p>
				<div style="border: 1px dashed purple;">
					<SideWindowTitle {...args} showExpand={false} showClose={false}>
						{#snippet titleInfo()}
							<IconAndText icon="timer" text="13.6 s" size="large" />
							<IconAndText icon="tokens" text="2523" size="large" />
						{/snippet}
					</SideWindowTitle>
				</div>
			</div>

			<div>
				<p style="margin-bottom: 8px; font-size: 12px; color: var(--color-text-secondary);">
					Title only (no slots, no window management)
				</p>
				<div style="border: 1px dashed purple;">
					<SideWindowTitle {...args} showExpand={false} showClose={false} />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { IconAndText } from './index';

	const { Story } = defineMeta({
		title: 'Components/IconAndText',
		component: IconAndText,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			icon: {
				control: { type: 'text' },
				description: 'The icon to display alongside the text'
			},
			text: {
				control: { type: 'text' },
				description: 'The text content to display'
			},
			size: {
				control: { type: 'select' },
				options: ['base', 'large'],
				description: 'Size variant of the component'
			}
		}
	});
</script>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 300px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Base Size</h3>
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<IconAndText icon="timer" text="13.6s" size="base" />
					<IconAndText icon="check" text="Completed" size="base" />
					<IconAndText text="Warning" size="base" />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Large Size</h3>
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<IconAndText icon="timer" text="13.6s" size="large" />
					<IconAndText icon="check" text="Completed" size="large" />
					<IconAndText text="Warning" size="large" />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		icon: 'timer',
		text: '13.6s',
		size: 'base'
	}}
>
	{#snippet template(args)}
		<div style="width: 300px;">
			<IconAndText {...args} />
		</div>
	{/snippet}
</Story>

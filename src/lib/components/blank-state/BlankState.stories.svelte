<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';
	import { BlankState } from './index';
	import type { BlankStateProps } from './BlankState.svelte';
	const { Story } = defineMeta({
		title: 'Components/BlankState',
		component: BlankState,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' }
	});
	async function readable({ canvasElement }: { canvasElement: HTMLElement }) {
		await canvasElement.ownerDocument.fonts.ready;
		const frame = canvasElement.querySelector<HTMLElement>('[data-story-frame]');
		const text = canvasElement.querySelector<HTMLElement>('.blank-state__text');
		if (!frame || !text) throw new Error('Blank-state story requires its frame and text');
		await expect(
			text.getBoundingClientRect().width,
			'page descriptions have room to read'
		).toBeGreaterThan(240);
		await expect(frame.scrollWidth, 'text stays inside the page').toBeLessThanOrEqual(
			frame.clientWidth
		);
	}
	async function narrow({ canvasElement }: { canvasElement: HTMLElement }) {
		await canvasElement.ownerDocument.fonts.ready;
		const frame = canvasElement.querySelector<HTMLElement>('[data-story-frame]');
		if (!frame) throw new Error('Narrow story requires a frame');
		await expect(frame.scrollWidth, 'long identifiers wrap on narrow screens').toBeLessThanOrEqual(
			frame.clientWidth
		);
	}
</script>

<Story
	name="Page"
	tags={['interaction']}
	play={readable}
	args={{
		title: 'No activity yet',
		description:
			'Activity appears here as your application runs. Connect an instrumented service to explore requests, understand failures, and follow the steps your agents take.',
		buttonProps: { label: 'Connect a service' }
	}}
>
	{#snippet template(args: BlankStateProps)}<div data-story-frame style="height: 32rem;">
			<BlankState {...args} />
		</div>{/snippet}
</Story>
<Story name="Narrow" tags={['interaction']} play={narrow}>
	{#snippet template()}<div
			data-story-frame
			style="width: min(20rem, 100%); height: 30rem; margin: auto;"
		>
			<BlankState
				title="No matching activity"
				description="Try another search or inspect workspace_operation_with_a_very_long_unbroken_identifier_that_must_fit_inside_a_small_screen."
				buttonProps={{ label: 'Reset search' }}
			/>
		</div>{/snippet}
</Story>
<Story name="Inline">
	{#snippet template()}<div
			style="max-width: 22rem; margin: 24px; border: 1px solid var(--color-border-base);"
		>
			<BlankState
				size="inline"
				title="No recent activity"
				description="Activity for this agent will appear after its next run."
			/>
		</div>{/snippet}
</Story>

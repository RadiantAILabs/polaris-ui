<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Skeleton } from './index';
	const { Story } = defineMeta({
		title: 'Components/Skeleton',
		component: Skeleton,
		tags: ['autodocs'],
		parameters: { layout: 'centered' },
		args: { style: 'width: 280px; height: 16px;' }
	});
</script>

<Story name="Default" />
<Story name="Circle" args={{ style: 'width: 40px; height: 40px; border-radius: 50%;' }} />
<Story name="Text">
	{#snippet template()}
		<div class="text-placeholder">
			<Skeleton /><Skeleton /><Skeleton style="width: 75%;" />
		</div>
	{/snippet}
</Story>

<style>
	.text-placeholder {
		display: grid;
		gap: 8px;
		width: 280px;
	}
</style>

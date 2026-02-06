<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Calendar } from './index.js';

	const { Story } = defineMeta({
		title: 'Components/Calendar',
		component: Calendar,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { getLocalTimeZone, today } from '@internationalized/date';

	let singleValue = today(getLocalTimeZone());
</script>

<Story name="Playground">
	{#snippet template()}
		<div class="space-y-4">
			<Calendar type="single" bind:value={singleValue} />
		</div>
	{/snippet}
</Story>

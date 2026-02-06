<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import UnderlineNav from './UnderlineNav.svelte';

	const { Story } = defineMeta({
		title: 'Components/UnderlineNav',
		component: UnderlineNav,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			activeTab: {
				control: { type: 'text' },
				description: 'ID of the currently active tab'
			}
		}
	});
</script>

<script lang="ts">
	let activeTabWithLinks = $state('Overview');

	const tabs = [
		{ label: 'Overview' },
		{ label: 'Analytics' },
		{ label: 'Reports' },
		{ label: 'Settings' }
	];
</script>

<Story name="Tabs">
	{#snippet template()}
		<div style="width: 600px;">
			<UnderlineNav
				{tabs}
				bind:activeTab={activeTabWithLinks}
				onTabChange={(id) => console.log('Tab changed to:', id)}
			/>
			<p style="margin-top: 16px; font-size: 14px; color: var(--color-text-tertiary);">
				Active tab: <strong>{activeTabWithLinks}</strong>
			</p>
		</div>
	{/snippet}
</Story>

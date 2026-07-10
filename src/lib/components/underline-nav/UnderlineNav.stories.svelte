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
	let activeTabWithBadge = $state('Overview');
	let activeTabPlain = $state('Overview');

	const tabsWithBadge = [
		{ label: 'Overview' },
		{ label: 'Analytics' },
		{ label: 'Reports', badge: 3 },
		{ label: 'Settings' }
	];

	const tabsPlain = [
		{ label: 'Overview' },
		{ label: 'Analytics' },
		{ label: 'Reports' },
		{ label: 'Settings' }
	];
</script>

<Story name="With Badge">
	{#snippet template()}
		<div style="width: 600px;">
			<UnderlineNav
				tabs={tabsWithBadge}
				bind:activeTab={activeTabWithBadge}
				onTabChange={(id) => console.log('Tab changed to:', id)}
			/>
			<p style="margin-top: 16px; font-size: 14px; color: var(--color-text-tertiary);">
				Active tab: <strong>{activeTabWithBadge}</strong>
			</p>
		</div>
	{/snippet}
</Story>

<Story name="Without Badge">
	{#snippet template()}
		<div style="width: 600px;">
			<UnderlineNav
				tabs={tabsPlain}
				bind:activeTab={activeTabPlain}
				onTabChange={(id) => console.log('Tab changed to:', id)}
			/>
			<p style="margin-top: 16px; font-size: 14px; color: var(--color-text-tertiary);">
				Active tab: <strong>{activeTabPlain}</strong>
			</p>
		</div>
	{/snippet}
</Story>

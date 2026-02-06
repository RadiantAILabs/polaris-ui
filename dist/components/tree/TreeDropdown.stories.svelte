<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tree from './index.js';

	const { Story } = defineMeta({
		title: 'Components/Tree/Dropdown',
		component: Tree.Dropdown,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: { type: 'boolean' },
				description:
					'Controls whether the dropdown is open (chevron pointing down) or closed (chevron pointing right)'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Disables the dropdown when set to true'
			},
			ariaLabel: {
				control: { type: 'text' },
				description: 'Accessible label for the dropdown button'
			}
		}
	});
</script>

<Story name="States">
	{#snippet template()}
		<div style="display: flex; flex-wrap: wrap; gap: 32px; padding: 40px;">
			<!-- Closed State -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Closed (Default)</h3>
				<Tree.Dropdown open={false} ariaLabel="Expand" />
			</div>

			<!-- Open State -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Open</h3>
				<Tree.Dropdown open={true} ariaLabel="Collapse" />
			</div>

			<!-- Disabled State -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Disabled</h3>
				<Tree.Dropdown open={true} ariaLabel="Collapse" disabled={true} />
			</div>
		</div>
	{/snippet}
</Story>

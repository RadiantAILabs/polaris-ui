<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Checkbox from './Checkbox.svelte';

	const { Story } = defineMeta({
		title: 'Components/Checkbox',
		component: Checkbox,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			checked: {
				control: { type: 'boolean' },
				description: 'Whether the checkbox is checked'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the checkbox is disabled'
			}
		}
	});
</script>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; gap: 32px; align-items: center;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Unchecked</h3>
				<Checkbox />
			</div>
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Checked</h3>
				<Checkbox checked={true} />
			</div>
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Disabled</h3>
				<Checkbox disabled={true} />
			</div>
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Disabled Checked</h3>
				<Checkbox checked={true} disabled={true} />
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		checked: false,
		disabled: false
	}}
>
	{#snippet template(args)}
		<Checkbox {...args} />
	{/snippet}
</Story>

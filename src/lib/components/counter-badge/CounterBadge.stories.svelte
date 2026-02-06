<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CounterBadge } from './index';

	const { Story } = defineMeta({
		title: 'Components/CounterBadge',
		component: CounterBadge,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'number' },
				description: 'The numeric count to display (numbers > 19 show as 9+)'
			},
			ariaLabel: {
				control: { type: 'text' },
				description: 'Accessible label for screen readers'
			}
		}
	});
</script>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; align-items: flex-start;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Different Values</h3>
				<div style="display: flex; gap: 16px; align-items: center;">
					<CounterBadge value={0} />
					<CounterBadge value={1} />
					<CounterBadge value={5} />
					<CounterBadge value={12} />
					<CounterBadge value={19} />
					<CounterBadge value={25} />
					<CounterBadge value={100} />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		value: 4,
		ariaLabel: '4 notifications'
	}}
>
	{#snippet template(args)}
		<CounterBadge {...args} />
	{/snippet}
</Story>

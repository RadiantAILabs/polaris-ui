<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { FilterChip } from './index';
	import { Popover } from '../popover';
	import { Input } from '../input';
	import { Button } from '../button';
	import { Icon } from '../icon';
	const { Story } = defineMeta({
		title: 'Components/FilterChip',
		component: FilterChip,
		tags: ['autodocs'],
		parameters: { layout: 'centered' }
	});
</script>

<script lang="ts">
	let value = $state('assistant');
	let editing = $state(false);
	let visible = $state(true);
</script>

<Story name="Query Controls">
	{#snippet template()}
		<div style="display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
			<FilterChip tone="neutral">Agent runs <Icon name="chevron-down" size="small" /></FilterChip>
			<FilterChip tone="neutral">Live <Icon name="chevron-down" size="small" /></FilterChip>
			{#if visible}
				<Popover.Root bind:open={editing}>
					<Popover.Trigger>
						{#snippet child({ props })}<FilterChip
								{...props}
								onDelete={() => (visible = false)}
								deleteLabel="Remove agent filter"
								>Agent <span style="opacity: .75;">is</span> {value}</FilterChip
							>{/snippet}
					</Popover.Trigger>
					<Popover.Content onOpenAutoFocus={(event) => event.preventDefault()}>
						<div style="display: flex; gap: 8px; align-items: center; padding: 8px;">
							<Input aria-label="Agent value" bind:value />
							<Button size="base" label="Update filter" onclick={() => (editing = false)} />
						</div>
					</Popover.Content>
				</Popover.Root>
			{:else}<Button
					variant="invisible"
					size="small"
					label="Restore filter"
					onclick={() => (visible = true)}
				/>{/if}
		</div>
	{/snippet}
</Story>
<Story name="States">
	{#snippet template()}
		<div style="display: flex; gap: 8px; align-items: center;">
			<FilterChip onDelete={() => {}}>Status <span style="opacity: .75;">is</span> Error</FilterChip
			>
			<FilterChip disabled onDelete={() => {}}>Disabled</FilterChip>
			<FilterChip tone="neutral">Traces</FilterChip>
		</div>
	{/snippet}
</Story>

<script lang="ts" module>
	/** Row action identified by a unique value, independent of its displayed label. */
	export interface DataTableActionItem {
		label: string;
		value: string;
		disabled?: boolean;
	}
	export interface DataTableActionsProps {
		actions: DataTableActionItem[];
		onAction?: (value: string) => void;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { DropdownMenu } from '../dropdown-menu';
	import { Button } from '../button';
	let { actions, onAction, disabled }: DataTableActionsProps = $props();
	let open = $state(false);
</script>

<div
	role="presentation"
	data-row-actions-open={open || undefined}
	onclick={(event) => event.stopPropagation()}
>
	<DropdownMenu.Root bind:open>
		<DropdownMenu.Trigger {disabled}>
			{#snippet child({ props })}<Button
					{...props}
					variant="invisible"
					icon="more-vert"
					size="small"
					aria-label="Row actions"
				/>{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			{#each actions as action (action.value)}<DropdownMenu.Item
					disabled={action.disabled}
					onSelect={() => onAction?.(action.value)}>{action.label}</DropdownMenu.Item
				>{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

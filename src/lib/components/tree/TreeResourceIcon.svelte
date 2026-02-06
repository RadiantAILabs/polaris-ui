<script lang="ts">
	import { Icon } from '../icon';
	import { cn } from '../../utils';

	/** Type of tree element resource */
	export type TreeElementType = 'agent' | 'component' | 'nli';

	export interface TreeResourceIconProps {
		/** Whether to show up connector */
		upConnector?: boolean;
		/** Whether to show down connector */
		downConnector?: boolean;
		/** Type of resource */
		type: TreeElementType;
		/** Additional CSS class */
		class?: string;
	}

	let {
		upConnector = true,
		downConnector = true,
		type,
		class: className
	}: TreeResourceIconProps = $props();

	// Map types to icon names
	const iconMap = {
		agent: 'agent',
		component: 'component',
		nli: 'message'
	} as const;
</script>

<div class={cn('tree-resource-icon', className)} role="presentation">
	{#if upConnector}
		<div class="tree-resource-icon__connector tree-resource-icon__connector--up"></div>
	{/if}

	<div class="tree-resource-icon__box">
		<Icon name={iconMap[type]} size="0.75rem" variant="tertiary" />
	</div>

	{#if downConnector}
		<div class="tree-resource-icon__connector tree-resource-icon__connector--down"></div>
	{/if}
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.tree-resource-icon {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 32px;

		&__connector {
			position: absolute;
			left: 50%;
			width: 0;
			margin-left: -0.25px;
			border-left: 1px solid var(--color-control-border-rest);

			&--up {
				top: 0;
				height: calc(50% - ($space-2-5 / 2));
			}

			&--down {
				bottom: 0;
				height: calc(50% - ($space-2-5 / 2));
			}
		}

		&__box {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			width: $space-2-5;
			height: $space-2-5;
			padding: $space-0-5;
			background-color: var(--color-background-base);
			border: 0.5px solid var(--color-control-border-rest);
			border-radius: 2px;
		}
	}
</style>

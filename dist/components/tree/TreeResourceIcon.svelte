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

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.tree-resource-icon {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 32px;
}
.tree-resource-icon__connector {
  position: absolute;
  left: 50%;
  width: 0;
  margin-left: -0.25px;
  border-left: 1px solid var(--color-control-border-rest);
}
.tree-resource-icon__connector--up {
  top: 0;
  height: calc(50% - 0.625rem);
}
.tree-resource-icon__connector--down {
  bottom: 0;
  height: calc(50% - 0.625rem);
}
.tree-resource-icon__box {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0.25rem;
  background-color: var(--color-background-base);
  border: 0.5px solid var(--color-control-border-rest);
  border-radius: 2px;
}</style>

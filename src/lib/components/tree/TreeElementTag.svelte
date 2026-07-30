<script lang="ts">
	import { cn } from '../../utils';
	import { Badge } from '../badge';

	export interface TreeElementTagProps {
		/** Whether to show up connector */
		upConnector?: boolean;
		/** Whether to show down connector */
		downConnector?: boolean;
		/** Short text rendered inside the boxed tag */
		text: string;
		/** Whether the element is in an error state */
		error?: boolean;
		/** Additional CSS class */
		class?: string;
	}

	let {
		upConnector = true,
		downConnector = true,
		text,
		error = false,
		class: className
	}: TreeElementTagProps = $props();
</script>

<div class={cn('tree-element-tag', className)} role="presentation">
	{#if upConnector}
		<div class="tree-element-tag__connector tree-element-tag__connector--up"></div>
	{/if}

	<Badge {text} variant={error ? 'error' : 'outline'} size="small" style="height: 1.25rem;" />

	{#if downConnector}
		<div class="tree-element-tag__connector tree-element-tag__connector--down"></div>
	{/if}
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.tree-element-tag {
		position: relative;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 20px;
		height: $space-4;

		&__connector {
			position: absolute;
			left: 10px;
			width: 0;
			margin-left: -0.25px;
			border-left: 1px solid var(--color-border-base);

			&--up {
				top: 0;
				height: calc(50% - ($space-2-5 / 2));
			}

			&--down {
				bottom: 0;
				height: calc(50% - ($space-2-5 / 2));
			}
		}
	}
</style>

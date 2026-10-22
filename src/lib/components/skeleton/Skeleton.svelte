<script module lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithElementRef, WithoutChildren } from '../../utils';

	export type SkeletonProps = WithElementRef<WithoutChildren<HTMLAttributes<HTMLDivElement>>>;
</script>

<script lang="ts">
	import { cn } from '../../utils';
	let { ref = $bindable(null), class: className, ...restProps }: SkeletonProps = $props();
</script>

<div {...restProps} bind:this={ref} class={cn('skeleton', className)} aria-hidden="true"></div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.skeleton {
		width: 100%;
		height: 1em;
		background: var(--color-background-emphasized-2);
		border-radius: $border-radius-base;
		animation: skeleton-pulse 2s ease-in-out infinite;
	}

	@keyframes skeleton-pulse {
		50% {
			opacity: 0.5;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton {
			animation: none;
		}
	}
</style>

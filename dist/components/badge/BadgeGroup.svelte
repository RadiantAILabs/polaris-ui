<script lang="ts" module>
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { BadgeProps } from './Badge.svelte';

	export type BadgeGroupProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		badges: Array<Omit<BadgeProps, 'ref'>>;
		dynamicSizing?: boolean;
	};
</script>

<script lang="ts">
	import { Badge } from '.';

	let {
		badges = [],
		ref = $bindable(null),
		class: className,
		...restProps
	}: BadgeGroupProps = $props();
</script>

<div bind:this={ref} class={cn('badge-group', className)} {...restProps}>
	{#each badges as badge, index (`${badge.text}-${index}`)}
		<Badge {...badge} />
	{/each}
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.badge-group {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 0.25rem;
  align-items: center;
  min-width: 0;
}</style>

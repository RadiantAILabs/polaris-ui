<script lang="ts">
	import { cn } from '../../utils';

	export interface TreeTrailProps {
		/** Whether to show vertical line down */
		down?: boolean;
		/** Whether to show outward trail */
		outward?: boolean;
		/** Whether to show inward trail */
		inward?: boolean;
		/** Additional CSS class */
		class?: string;
	}

	let { down = true, outward = false, inward = false, class: className }: TreeTrailProps = $props();
</script>

<div class={cn('tree-trail', className)} role="presentation" aria-hidden="true">
	{#if down}
		<div class="tree-trail__line tree-trail__line--vertical"></div>
	{/if}

	{#if inward}
		<div class="tree-trail__line tree-trail__line--inward"></div>
	{/if}

	{#if outward}
		<div class="tree-trail__line tree-trail__line--outward"></div>
	{/if}
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.tree-trail {
  position: relative;
  flex-shrink: 0;
  width: 20px;
  height: 32px;
}
.tree-trail__line {
  position: absolute;
  border: 0 solid var(--color-control-border-rest);
}
.tree-trail__line--vertical {
  top: 0;
  left: 50%;
  width: 0;
  height: 100%;
  margin-left: -0.25px;
  border-left-width: 1px;
}
.tree-trail__line--inward {
  top: 0;
  left: 50%;
  width: 50%;
  height: 50%;
  margin-left: -0.25px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-bottom-left-radius: 8px;
}
.tree-trail__line--outward {
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
  margin-left: -0.25px;
  border-top-width: 1px;
  border-left-width: 1px;
  border-top-left-radius: 8px;
}</style>

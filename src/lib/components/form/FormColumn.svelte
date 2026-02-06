<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../../utils';

	type Props = {
		columns?: 2 | 3;
		children: Snippet;
		class?: string;
	};

	let { columns = 2, children, class: className }: Props = $props();
</script>

<div class={cn('form-column', `form-column--columns-${columns}`, className)}>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.form-column {
		display: grid;
		gap: $space-2 $space-6;
		align-items: start;
		width: 100%;

		&--columns-2 {
			grid-template-columns: 1fr 1fr;
		}

		&--columns-3 {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>

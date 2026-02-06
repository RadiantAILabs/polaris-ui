<script lang="ts">
	import type { Snippet } from 'svelte';

	export interface DialogFooterProps {
		children?: Snippet;
	}

	let { children }: DialogFooterProps = $props();
</script>

<footer class="dialog__footer">
	{@render children?.()}
</footer>

<script lang="ts">
	import Button from '../button/Button.svelte';

	export interface PopoverHeaderProps {
		title: string;
		onBack?: () => void;
	}

	let { title, onBack }: PopoverHeaderProps = $props();

	const showBackButton = $derived(onBack !== undefined);

	function handleBackClick() {
		onBack?.();
	}
</script>

<div class="popover__header">
	{#if showBackButton}
		<Button
			icon="chevron-left"
			variant="invisible"
			onclick={handleBackClick}
			aria-label="Go back"
			size="small"
		/>
	{/if}
	<h2 class="popover__title">{title}</h2>
</div>

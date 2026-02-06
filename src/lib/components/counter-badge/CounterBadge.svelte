<script lang="ts">
	export type CounterBadgeProps = {
		value?: number;
		ariaLabel?: string;
	};

	let { value = 0, ariaLabel }: CounterBadgeProps = $props();

	const shouldShow = $derived(value > 0);
	const computedAriaLabel = $derived(ariaLabel || `${value} notifications`);
</script>

{#if shouldShow}
	<div class="counter-badge" role="status" aria-label={computedAriaLabel}>
		<span class="counter-badge__text">{value > 9 ? '9+' : String(value)}</span>
	</div>
{/if}

<style lang="scss">
	@use '../../styles/tokens' as *;

	.counter-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: $space-0-25 $space-0-5;
		background-color: var(--color-button-background-active);
		border-radius: $border-radius-base;

		&__text {
			@include typography('label');

			color: var(--color-text-primary);
			text-align: center;
			white-space: nowrap;
		}
	}
</style>

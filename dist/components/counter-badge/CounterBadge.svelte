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

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.counter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.25rem;
  background-color: var(--color-button-background-active);
  border-radius: 2px;
}
.counter-badge__text {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text-primary);
  text-align: center;
  white-space: nowrap;
}</style>

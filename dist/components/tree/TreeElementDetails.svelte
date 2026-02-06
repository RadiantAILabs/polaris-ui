<script lang="ts">
	import { Icon } from '../icon';
	import { cn } from '../../utils';

	export interface TreeElementDetailsProps {
		/** Time duration to display */
		time?: string;
		/** Token count to display */
		tokens?: string;
		/** Status of the element */
		status?: 'completed' | 'processing' | 'failed';
		/** Additional CSS class */
		class?: string;
	}

	let { time, tokens, status, class: className }: TreeElementDetailsProps = $props();

	const ariaLabel = $derived.by(() => {
		if (status === 'processing') return 'Processing';
		if (status === 'failed') {
			const parts = ['Failed'];
			if (time) parts.push(time);
			if (tokens) parts.push(`${tokens} tokens`);
			return parts.join(', ');
		}
		if (tokens && time) return `${time}, ${tokens} tokens`;
		if (time) return time;
		if (tokens) return `${tokens} tokens`;
		return undefined;
	});
</script>

<div class={cn('tree-element-details', className)} role="status" aria-label={ariaLabel}>
	{#if status === 'processing'}
		<Icon name="loader" size="0.75rem" variant="secondary" animation="spin" />
	{:else if status === 'failed'}
		<div class="tree-element-details__item">
			<Icon name="alert-circle" size="0.75rem" variant="error" />
			{#if time}
				<span class="tree-element-details__value tree-element-details__error">{time}</span>
			{/if}
		</div>
		{#if tokens}
			<div class="tree-element-details__item">
				<Icon name="tokens" size="0.75rem" variant="secondary" />
				<span class="tree-element-details__value">{tokens}</span>
			</div>
		{/if}
	{:else}
		{#if time}
			<div class="tree-element-details__item">
				<span class="tree-element-details__value">{time}</span>
			</div>
		{/if}

		{#if tokens}
			<div class="tree-element-details__item">
				<Icon name="tokens" size="0.75rem" variant="secondary" />
				<span class="tree-element-details__value">{tokens}</span>
			</div>
		{/if}
	{/if}
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.tree-element-details {
  display: inline-flex;
  gap: 1rem;
  align-items: center;
}
.tree-element-details__item {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}
.tree-element-details__value {
  color: var(--color-text-secondary);
  white-space: nowrap;
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.tree-element-details__error {
  color: var(--color-text-error);
}</style>

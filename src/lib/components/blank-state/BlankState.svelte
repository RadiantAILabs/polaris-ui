<script lang="ts" module>
	import type { ButtonProps } from '../button';

	export type BlankStateProps = {
		title?: string;
		description: string;
		buttonProps?: Omit<ButtonProps, 'size'>;
		/**
		 * Layout scale. `page` (default) fills its container for full-page empty
		 * states; `inline` is compact and sizeless for embedding inside a card,
		 * panel, or list.
		 */
		size?: 'page' | 'inline';
		class?: string;
	};
</script>

<script lang="ts">
	import { Button } from '../button';
	import { cn } from '../../utils';

	let {
		title,
		description,
		buttonProps,
		size = 'page',
		class: className
	}: BlankStateProps = $props();
</script>

<div class={cn('blank-state', `blank-state--${size}`, className)}>
	<div class="blank-state__text">
		{#if title}
			<h2 class="blank-state__title">{title}</h2>
		{/if}
		<p class="blank-state__description">{description}</p>
	</div>

	{#if buttonProps}
		<Button size="large" {...buttonProps} />
	{/if}
</div>

<style lang="scss">
	@use './BlankState';
</style>

<script lang="ts" module>
	import type { ButtonProps } from '../button';

	export type BlankStateProps = {
		title?: string;
		description: string;
		buttonProps?: Omit<ButtonProps, 'size'>;
		class?: string;
	};
</script>

<script lang="ts">
	import { Button } from '../button';
	import { cn } from '../../utils';

	let { title, description, buttonProps, class: className }: BlankStateProps = $props();
</script>

<div class={cn('blank-state', className)}>
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

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { IconName } from '../icon/icon-registry';
	import { Icon } from '../icon';

	export interface IconAndTextProps extends HTMLAttributes<HTMLDivElement> {
		icon?: IconName;
		text: string;
		size?: 'base' | 'large';
		variant?: 'default' | 'error';
	}

	let {
		icon,
		text,
		size = 'base',
		variant = 'default',
		class: className = '',
		...restProps
	}: IconAndTextProps = $props();

	const iconSize = $derived(size === 'large' ? '1rem' : '0.75rem');
	const iconVariant = $derived(variant === 'error' ? 'error' : 'primary');
</script>

<div class="icon-and-text icon-and-text--{size} {className}" {...restProps}>
	{#if icon}
		<Icon name={icon} variant={iconVariant} size={iconSize} />
	{/if}
	<span class="icon-and-text__text icon-and-text__text--{variant}">{text}</span>
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.icon-and-text {
		display: inline-flex;
		gap: $space-0-5;
		align-items: center;
		justify-content: center;

		&__text {
			flex-shrink: 0;
			color: var(--color-text-secondary);
			white-space: nowrap;

			@include transition-interactive;

			&--error {
				color: var(--color-text-error);
			}
		}

		// Size variants
		&--base {
			.icon-and-text__text {
				@include typography('body-base-semibold');
			}
		}

		&--large {
			.icon-and-text__text {
				@include typography('button-base');
			}
		}
	}
</style>

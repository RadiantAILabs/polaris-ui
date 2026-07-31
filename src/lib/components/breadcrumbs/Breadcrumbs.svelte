<script lang="ts" module>
	export interface BreadcrumbItem {
		label: string;
		href: string;
	}

	export interface BreadcrumbsProps {
		items: BreadcrumbItem[];
	}
</script>

<script lang="ts">
	let { items }: BreadcrumbsProps = $props();
</script>

<!-- Breadcrumb destinations are consumer-provided and may be relative, absolute, or external. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<nav class="breadcrumbs" aria-label="Breadcrumb">
	{#each items as item, index (index)}
		{#if index > 0}
			<span class="breadcrumbs__separator" aria-hidden="true">/</span>
		{/if}
		<a
			class="breadcrumbs__link"
			href={item.href}
			aria-current={index === items.length - 1 ? 'page' : undefined}>{item.label}</a
		>
	{/each}
</nav>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.breadcrumbs {
		display: flex;
		flex-wrap: wrap;
		gap: $space-0-5;
		align-items: center;

		@include typography('button-base');
	}

	.breadcrumbs__link {
		color: var(--color-text-tertiary);
		text-decoration: none;

		@include transition-interactive;

		&:hover {
			color: var(--color-text-primary);
		}
	}

	.breadcrumbs__separator {
		color: var(--color-text-tertiary);
	}
</style>

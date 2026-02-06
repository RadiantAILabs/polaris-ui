<script lang="ts">
	import { onMount } from 'svelte';

	export interface Tab {
		// Tab labels must be unique
		label: string;
	}

	export interface UnderlineNavProps {
		tabs: Tab[];
		activeTab?: string;
		onTabChange?: (value: string) => void;
		showBorder?: boolean;
	}

	let {
		tabs,
		activeTab = $bindable(),
		onTabChange,
		showBorder = true
	}: UnderlineNavProps = $props();

	let tabContainerElement: HTMLElement;
	let tabIndicatorElement: HTMLElement;
	let hoverBackgroundElement: HTMLElement;
	let tabElements: HTMLButtonElement[] = $state([]);
	let isMouseInsideNav = false;

	function handleTabClick(tabLabel: string) {
		activeTab = tabLabel;
		onTabChange?.(tabLabel);
		updateIndicatorPosition();
	}

	function updateIndicatorPosition() {
		if (!tabIndicatorElement || !activeTab) return;

		const activeTabElement = tabElements.find((el) => el.dataset.tabId === activeTab);

		if (activeTabElement) {
			const containerRect = tabContainerElement.getBoundingClientRect();
			const tabRect = activeTabElement.getBoundingClientRect();

			const left = tabRect.left - containerRect.left;
			const width = tabRect.width;

			tabIndicatorElement.style.width = `${width}px`;
			tabIndicatorElement.style.left = `${left}px`;
		}
	}

	function setupHoverListeners() {
		if (!tabContainerElement || !hoverBackgroundElement) return;

		const handleMouseEnter = (event: Event) => {
			const target = event.target as HTMLElement;
			if (hoverBackgroundElement) {
				// If mouse was outside nav, only apply fade transition
				if (!isMouseInsideNav) {
					hoverBackgroundElement.style.transitionProperty = 'opacity';
					hoverBackgroundElement.style.width = `${target.offsetWidth}px`;
					hoverBackgroundElement.style.left = `${target.offsetLeft}px`;
					// Force a reflow
					void hoverBackgroundElement.offsetHeight;
				}

				// Restore full transition for subsequent hovers
				hoverBackgroundElement.style.transitionProperty = 'opacity, width, left';

				hoverBackgroundElement.style.width = `${target.offsetWidth}px`;
				hoverBackgroundElement.style.left = `${target.offsetLeft}px`;
				hoverBackgroundElement.style.opacity = '1';
			}
			isMouseInsideNav = true;
		};

		const handleMouseLeave = () => {
			if (hoverBackgroundElement) {
				hoverBackgroundElement.style.opacity = '0';
			}
			isMouseInsideNav = false;
		};

		tabElements.forEach((tab) => {
			tab?.addEventListener('mouseenter', handleMouseEnter);
		});

		tabContainerElement.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			tabElements.forEach((tab) => {
				tab?.removeEventListener('mouseenter', handleMouseEnter);
			});
			tabContainerElement?.removeEventListener('mouseleave', handleMouseLeave);
		};
	}

	function handleKeyDown(event: KeyboardEvent, tabId: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleTabClick(tabId);
		}
	}

	$effect(() => {
		if (activeTab) {
			requestAnimationFrame(updateIndicatorPosition);
		}
	});

	onMount(() => {
		updateIndicatorPosition();
		const cleanup = setupHoverListeners();

		const handleResize = () => updateIndicatorPosition();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			cleanup?.();
		};
	});
</script>

<nav class="underline-nav">
	<div
		class="underline-nav__container"
		class:underline-nav__container--no-border={!showBorder}
		bind:this={tabContainerElement}
		role="tablist"
	>
		{#each tabs as tab, index (tab.label)}
			<button
				id={'tab-' + index}
				bind:this={tabElements[index]}
				type="button"
				class="underline-nav__tab"
				role="tab"
				aria-selected={activeTab === tab.label}
				aria-controls={'panel-' + index}
				data-tab-id={tab.label}
				data-active={activeTab === tab.label}
				onclick={() => handleTabClick(tab.label)}
				onkeydown={(e) => handleKeyDown(e, tab.label)}
			>
				{tab.label}
			</button>
		{/each}

		<div bind:this={hoverBackgroundElement} class="underline-nav__hover-bg">
			<div class="underline-nav__hover-bg-inner"></div>
		</div>

		<div bind:this={tabIndicatorElement} class="underline-nav__indicator"></div>
	</div>
</nav>

<style lang="scss">
	@use './UnderlineNav';
</style>

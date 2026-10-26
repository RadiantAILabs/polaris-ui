<script lang="ts">
	import { DropdownMenu } from '../dropdown-menu';
	import { tick } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Icon, type IconName } from '../icon';
	import { CounterBadge } from '../counter-badge';

	export interface TabAction {
		value: string;
		label: string;
		icon?: IconName;
		disabled?: boolean;
	}
	export interface Tab {
		/** Selection identity; supply unique IDs when labels may repeat. */
		id?: string;
		modified?: boolean;
		actions?: TabAction[];
		label: string;
		badge?: number;
		panelId?: string;
		/** DOM id for a panel’s aria-labelledby; defaults to an instance-scoped id. */
		buttonId?: string;
	}

	export interface UnderlineNavProps {
		tabs: Tab[];
		activeTab?: string;
		onAction?: (id: string, action: string) => void;
		onTabChange?: (value: string) => void;
		/** Enables dragging; the caller owns and persists the resulting tab order. */
		onReorder?: (ids: string[]) => void;
		showBorder?: boolean;
	}

	let {
		tabs,
		activeTab = $bindable(),
		onTabChange,
		onAction,
		onReorder,
		showBorder = true
	}: UnderlineNavProps = $props();

	const activeDefinition = $derived(tabs.find((tab) => (tab.id ?? tab.label) === activeTab));
	const instanceId = $props.id();
	let tabIndicatorElement: HTMLElement;
	let hoverBackgroundElement: HTMLElement;
	let tabElements: HTMLDivElement[] = $state([]);
	let isMouseInsideNav = false;
	let hoveredTabElement: HTMLElement | undefined;
	let draggedId: string | undefined = $state();
	let dropTarget: { id: string; after: boolean } | undefined = $state();

	function moveTab(id: string, target: string, after: boolean) {
		const ids = tabs.map((tab) => tab.id ?? tab.label);
		if (id === target || !ids.includes(id) || !ids.includes(target)) return;
		const reordered = ids.filter((value) => value !== id);
		reordered.splice(reordered.indexOf(target) + (after ? 1 : 0), 0, id);
		if (reordered.some((value, index) => value !== ids[index])) {
			onReorder?.(reordered);
			void focusTab(id);
		}
	}

	async function focusTab(tabId: string) {
		await tick();
		tabElements
			.find((element) => element?.dataset.tabId === tabId)
			?.querySelector<HTMLButtonElement>('[role="tab"]')
			?.focus();
	}

	async function handleTabClick(tabId: string) {
		const positions = tabElements.map((element) => element?.getBoundingClientRect().left);
		activeTab = tabId;
		onTabChange?.(tabId);
		await tick();
		for (const [index, element] of tabElements.entries()) {
			if (
				!element ||
				typeof element.getAnimations !== 'function' ||
				typeof element.animate !== 'function'
			)
				continue;
			// Preserve the measured visual position when interrupting a previous glide.
			for (const animation of element.getAnimations()) animation.cancel();
			const from = positions[index];
			if (prefersReducedMotion.current || from === undefined) continue;
			const distance = from - element.getBoundingClientRect().left;
			if (distance === 0) continue;
			element.animate(
				[{ transform: `translateX(${distance}px)` }, { transform: 'translateX(0)' }],
				{ duration: 160, easing: 'cubic-bezier(0.2, 0, 0, 1)' }
			);
		}
		await focusTab(tabId);
	}

	function updateIndicatorPosition() {
		if (hoveredTabElement && isMouseInsideNav) {
			hoverBackgroundElement.style.width = `${hoveredTabElement.offsetWidth}px`;
			hoverBackgroundElement.style.left = `${hoveredTabElement.offsetLeft}px`;
		}
		if (!tabIndicatorElement) return;

		const activeTabElement = tabElements.find((el) => el?.dataset.tabId === activeTab);

		if (!activeTabElement) {
			tabIndicatorElement.style.width = '0px';
			return;
		}

		// Layout coordinates stay stable while neighbouring tabs glide visually.
		const left = activeTabElement.offsetLeft;
		const width = activeTabElement.offsetWidth;

		tabIndicatorElement.style.width = `${width}px`;
		tabIndicatorElement.style.left = `${left}px`;
	}

	function showHover(target: HTMLElement | undefined) {
		if (!target || !hoverBackgroundElement) return;
		hoveredTabElement = target;
		if (!isMouseInsideNav) {
			hoverBackgroundElement.style.transitionProperty = 'opacity';
			hoverBackgroundElement.style.width = `${target.offsetWidth}px`;
			hoverBackgroundElement.style.left = `${target.offsetLeft}px`;
			void hoverBackgroundElement.offsetHeight;
		}
		hoverBackgroundElement.style.transitionProperty = 'opacity, width, left';
		hoverBackgroundElement.style.width = `${target.offsetWidth}px`;
		hoverBackgroundElement.style.left = `${target.offsetLeft}px`;
		hoverBackgroundElement.style.opacity = '1';
		isMouseInsideNav = true;
	}
	function hideHover() {
		hoverBackgroundElement.style.opacity = '0';
		isMouseInsideNav = false;
	}

	async function handleKeyDown(event: KeyboardEvent, tabId: string) {
		const index = tabs.findIndex((tab) => (tab.id ?? tab.label) === tabId);
		if (onReorder && event.altKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
			event.preventDefault();
			const next = tabs[index + (event.key === 'ArrowRight' ? 1 : -1)];
			if (next) moveTab(tabId, next.id ?? next.label, event.key === 'ArrowRight');
			return;
		}
		const next =
			event.key === 'ArrowRight'
				? (index + 1) % tabs.length
				: event.key === 'ArrowLeft'
					? (index - 1 + tabs.length) % tabs.length
					: event.key === 'Home'
						? 0
						: event.key === 'End'
							? tabs.length - 1
							: undefined;
		if (next === undefined) return;
		event.preventDefault();
		const tab = tabs[next];
		if (!tab) return;
		await handleTabClick(tab.id ?? tab.label);
	}

	$effect(() => {
		void activeTab;
		const observer = new ResizeObserver(updateIndicatorPosition);
		for (const element of tabElements) if (element?.isConnected) observer.observe(element);
		const frame = requestAnimationFrame(updateIndicatorPosition);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	});
</script>

<nav class="underline-nav" onmouseleave={hideHover}>
	<div
		class="underline-nav__container"
		class:underline-nav__container--no-border={!showBorder}
		role="tablist"
	>
		{#each tabs as tab, index (tab.id ?? tab.label)}
			{@const id = tab.id ?? tab.label}
			{@const domId = tab.buttonId ?? `${instanceId}-tab-${encodeURIComponent(id)}`}
			{#snippet tabButton(triggerProps: HTMLButtonAttributes = {})}
				<button
					{...triggerProps}
					id={domId}
					type="button"
					class="underline-nav__tab"
					role="tab"
					aria-selected={activeTab === id}
					aria-controls={tab.panelId}
					aria-describedby={[
						tab.modified ? `${instanceId}-modified` : undefined,
						onReorder ? `${instanceId}-reorder` : undefined
					]
						.filter(Boolean)
						.join(' ') || undefined}
					tabindex={activeTab === id || (!activeDefinition && index === 0) ? 0 : -1}
					data-tab-id={id}
					data-active={activeTab === id}
					onpointerdown={onReorder ? undefined : triggerProps.onpointerdown}
					onpointerup={(event) => {
						// Let an active tab start a drag before opening its menu on release.
						if (onReorder && event.pointerType !== 'touch') triggerProps.onpointerdown?.(event);
						else triggerProps.onpointerup?.(event);
					}}
					onclick={(event) => {
						triggerProps.onclick?.(event);
						if (activeTab !== id) void handleTabClick(id);
					}}
					onkeydown={(event) => {
						handleKeyDown(event, id);
						if (!event.defaultPrevented) triggerProps.onkeydown?.(event);
					}}
				>
					<span class:underline-nav__modified={tab.modified}>{tab.label}</span>
					{#if tab.badge != null && tab.badge > 0}
						<span class="underline-nav__badge"><CounterBadge value={tab.badge} /></span>
					{/if}
				</button>
			{/snippet}
			<div
				class="underline-nav__tab-group"
				data-active={activeTab === id}
				data-has-actions={Boolean(tab.actions?.length)}
				data-tab-id={id}
				draggable={Boolean(onReorder)}
				data-drop={dropTarget?.id === id ? (dropTarget.after ? 'after' : 'before') : undefined}
				ondragstart={(event) => {
					if (!onReorder || !event.dataTransfer) return;
					draggedId = id;
					event.dataTransfer.effectAllowed = 'move';
					event.dataTransfer.setData('text/plain', id);
				}}
				ondragover={(event) => {
					if (!draggedId || draggedId === id) return;
					event.preventDefault();
					if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
					const bounds = event.currentTarget.getBoundingClientRect();
					dropTarget = { id, after: event.clientX > bounds.left + bounds.width / 2 };
				}}
				ondragleave={() => {
					if (dropTarget?.id === id) dropTarget = undefined;
				}}
				ondrop={(event) => {
					event.preventDefault();
					if (draggedId && dropTarget?.id === id) moveTab(draggedId, id, dropTarget.after);
					draggedId = undefined;
					dropTarget = undefined;
				}}
				ondragend={() => {
					draggedId = undefined;
					dropTarget = undefined;
				}}
				bind:this={tabElements[index]}
				onmouseenter={() => showHover(tabElements[index])}
				role="presentation"
			>
				{#if activeTab === id && tab.actions?.length}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger id={domId}>
							{#snippet child({ props })}{@render tabButton(props)}{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							{#each tab.actions as action (action.value)}
								<DropdownMenu.Item
									icon={action.icon}
									disabled={action.disabled}
									onSelect={() => {
										onAction?.(id, action.value);
										if (activeTab !== undefined && activeTab !== id) void focusTab(activeTab);
									}}>{action.label}</DropdownMenu.Item
								>
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					{@render tabButton()}
				{/if}
				{#if tab.actions?.length}
					<span class="underline-nav__chevron" aria-hidden="true">
						<Icon name="chevron-down" size="small" />
					</span>
				{/if}
			</div>
		{/each}
		<div bind:this={hoverBackgroundElement} class="underline-nav__hover-bg">
			<div class="underline-nav__hover-bg-inner"></div>
		</div>
		<div bind:this={tabIndicatorElement} class="underline-nav__indicator"></div>
	</div>
	<span id={`${instanceId}-modified`} hidden>Unsaved changes</span>
	<span id={`${instanceId}-reorder`} hidden
		>Drag to reorder, or use Alt and the left or right arrow key.</span
	>
</nav>

<style lang="scss">
	@use './UnderlineNav';
</style>

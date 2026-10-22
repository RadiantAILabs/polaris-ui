<script module lang="ts">
	import { expect, userEvent, within, waitFor } from 'storybook/test';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import UnderlineNav from './UnderlineNav.svelte';

	const { Story } = defineMeta({
		title: 'Components/UnderlineNav',
		component: UnderlineNav,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			activeTab: {
				control: { type: 'text' },
				description: 'ID of the currently active tab'
			}
		}
	});
	async function useTabActions({ canvasElement }: { canvasElement: HTMLElement }) {
		await canvasElement.ownerDocument.fonts.ready;
		const canvas = within(canvasElement);
		const document = within(canvasElement.ownerDocument.body);
		const firstTab = () => {
			const tab = canvas.getAllByRole('tab')[0];
			if (!tab) throw new Error('Saved views requires its first traces tab');
			return tab;
		};
		const tracesWidth = firstTab().getBoundingClientRect().width;
		const agents = () => canvas.getByRole('tab', { name: 'All agent runs' });
		const custom = canvas.getAllByRole('tab')[2];
		if (!custom) throw new Error('Saved views requires its actionless custom tab');
		const agentsWidth = agents().getBoundingClientRect().width;
		await userEvent.click(agents());
		await waitFor(() => expect(agents()).toHaveFocus());
		await expect(document.queryByRole('menu')).not.toBeInTheDocument();
		await expect(firstTab().getBoundingClientRect().width).toBeLessThan(tracesWidth);
		await expect(agents().getBoundingClientRect().width).toBeGreaterThan(agentsWidth);
		await expect(
			canvasElement.querySelectorAll(
				'.underline-nav__tab-group[data-active="true"] .underline-nav__chevron'
			)
		).toHaveLength(1);
		await expect(agents().parentElement?.querySelector('.underline-nav__chevron')).not.toBeNull();
		await userEvent.click(agents());
		await userEvent.click(await document.findByRole('menuitem', { name: 'Save as new view' }));
		await expect(canvas.getByText('agents: save')).toBeVisible();
		agents().focus();
		await userEvent.keyboard('{ArrowRight}');
		await waitFor(() => expect(custom).toHaveFocus());
		await expect(custom).toHaveAttribute('aria-selected', 'true');
		await expect(canvas.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', custom.id);
		await userEvent.keyboard('{ArrowLeft}');
		await waitFor(() => expect(canvas.getByRole('tab', { name: 'All agent runs' })).toHaveFocus());
		// Each active tab owns its menu anchor, including after repeated tab changes.
		for (const tab of [firstTab, agents, firstTab, agents]) {
			await userEvent.click(tab());
			await userEvent.click(tab());
			const menu = await document.findByRole('menu');
			await waitFor(() => {
				const anchor = tab().getBoundingClientRect();
				const surface = menu.getBoundingClientRect();
				expect(Math.abs(surface.left - Math.max(8, anchor.left))).toBeLessThan(2);
				expect(surface.top).toBeGreaterThanOrEqual(anchor.bottom);
				expect(surface.top - anchor.bottom).toBeLessThan(12);
			});
			await expect(document.getAllByRole('menu')).toHaveLength(1);
			await userEvent.keyboard('{Escape}');
			await waitFor(() => expect(document.queryByRole('menu')).not.toBeInTheDocument());
			await waitFor(() =>
				expect(canvasElement.ownerDocument.body).not.toHaveStyle({ pointerEvents: 'none' })
			);
		}
		for (const key of ['{ArrowDown}', '{Enter}', ' ']) {
			await userEvent.keyboard(key);
			await expect(
				await document.findByRole('menuitem', { name: 'Save as new view' })
			).toBeVisible();
			await userEvent.keyboard('{Escape}');
			await waitFor(() =>
				expect(canvas.getByRole('tab', { name: 'All agent runs' })).toHaveFocus()
			);
		}
		await waitFor(() =>
			expect(canvasElement.ownerDocument.body).not.toHaveStyle({ pointerEvents: 'none' })
		);
		await userEvent.click(firstTab());
		await userEvent.click(firstTab());
		await userEvent.click(await document.findByRole('menuitem', { name: 'Reset changes' }));
		await waitFor(() => expect(agents()).toHaveFocus());
		await userEvent.keyboard('{Alt>}{ArrowRight}{/Alt}');
		await waitFor(() => expect(canvas.getAllByRole('tab')[2]).toBe(agents()));
		await expect(agents()).toHaveAttribute('aria-selected', 'true');
		await userEvent.keyboard('{Alt>}{ArrowLeft}{/Alt}');
		await waitFor(() => expect(canvas.getAllByRole('tab')[1]).toBe(agents()));
	}
</script>

<script lang="ts">
	let activeTabWithBadge = $state('Overview');
	let activeTabPlain = $state('Overview');
	let activeView = $state('traces');
	let lastAction = $state('');
	let viewOrder = $state<string[]>([]);

	const tabsWithBadge = [
		{ label: 'Overview' },
		{ label: 'Analytics' },
		{ label: 'Reports', badge: 3 },
		{ label: 'Settings' }
	];

	const tabsPlain = [
		{ label: 'Overview' },
		{ label: 'Analytics' },
		{ label: 'Reports' },
		{ label: 'Settings' }
	];
</script>

<Story name="With Badge">
	{#snippet template()}
		<div style="width: 600px;">
			<UnderlineNav
				tabs={tabsWithBadge}
				bind:activeTab={activeTabWithBadge}
				onTabChange={(id) => console.log('Tab changed to:', id)}
			/>
			<p style="margin-top: 16px; font-size: 14px; color: var(--color-text-tertiary);">
				Active tab: <strong>{activeTabWithBadge}</strong>
			</p>
		</div>
	{/snippet}
</Story>

<Story name="Without Badge">
	{#snippet template()}
		<div style="width: 600px;">
			<UnderlineNav
				tabs={tabsPlain}
				bind:activeTab={activeTabPlain}
				onTabChange={(id) => console.log('Tab changed to:', id)}
			/>
			<p style="margin-top: 16px; font-size: 14px; color: var(--color-text-tertiary);">
				Active tab: <strong>{activeTabPlain}</strong>
			</p>
		</div>
	{/snippet}
</Story>

{#snippet savedViewsExample(actionlessTab = false)}
	<div style="width: 600px;">
		<UnderlineNav
			bind:activeTab={activeView}
			tabs={[
				{
					id: 'traces',
					buttonId: 'saved-views-traces-tab',
					panelId: 'saved-views-panel',
					label: 'All traces',
					modified: true,
					actions: [
						{ value: 'save', label: 'Save as new view' },
						{ value: 'reset', label: 'Reset changes' }
					]
				},
				{
					id: 'agents',
					buttonId: 'saved-views-agents-tab',
					panelId: 'saved-views-panel',
					label: 'All agent runs',
					actions: [{ value: 'save', label: 'Save as new view' }]
				},
				{
					id: 'custom',
					label: actionlessTab ? 'All traces' : 'Errors',
					buttonId: 'saved-views-custom-tab',
					panelId: 'saved-views-panel',
					actions: actionlessTab
						? []
						: [
								{ value: 'edit', label: 'Edit view' },
								{ value: 'delete', label: 'Delete view' }
							]
				}
			].sort((a, b) => viewOrder.indexOf(a.id) - viewOrder.indexOf(b.id))}
			onReorder={(ids) => (viewOrder = ids)}
			onAction={(id, action) => {
				lastAction = `${id}: ${action}`;
				if (action === 'reset') activeView = 'agents';
			}}
		/>
		<div
			id="saved-views-panel"
			role="tabpanel"
			tabindex="0"
			aria-labelledby={`saved-views-${activeView}-tab`}
		>
			<p>{lastAction}</p>
		</div>
	</div>
{/snippet}

<Story name="Saved Views">
	{#snippet template()}{@render savedViewsExample()}{/snippet}
</Story>
<Story
	name="Saved Views interactions"
	tags={['interaction', '!dev', '!autodocs']}
	play={useTabActions}
>
	{#snippet template()}{@render savedViewsExample(true)}{/snippet}
</Story>

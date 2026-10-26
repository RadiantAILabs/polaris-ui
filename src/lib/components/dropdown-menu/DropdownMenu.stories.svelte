<script module lang="ts">
	import { expect, userEvent, within, waitFor } from 'storybook/test';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { DropdownMenu } from './index';
	import { Button } from '../button';

	const sampleItems = [
		'Apple',
		'Banana',
		'Cherry',
		'Date',
		'Elderberry',
		'Fig',
		'Grape',
		'Honeydew'
	];

	const { Story } = defineMeta({
		title: 'Components/DropdownMenu',
		component: DropdownMenu,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			buttonLabel: {
				control: { type: 'text' },
				description: 'Text displayed on the dropdown trigger button'
			},
			buttonProps: {
				control: { type: 'object' },
				description: 'Props to pass to the trigger button (variant, size, etc.)'
			},
			items: {
				control: { type: 'object' },
				description: 'Array of string items to display in the dropdown'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the dropdown menu is disabled'
			},
			align: {
				control: { type: 'select' },
				options: ['start', 'end'],
				description: 'Alignment of dropdown relative to trigger (start = left, end = right)'
			},
			onSelect: {
				action: 'selected',
				description: 'Callback function called when an item is selected'
			}
		}
	});
	async function openSubmenu({ canvasElement }: { canvasElement: HTMLElement }) {
		const canvas = within(canvasElement);
		const document = within(canvasElement.ownerDocument.body);
		const globalFocusStyle = canvasElement.ownerDocument.createElement('style');
		globalFocusStyle.textContent = ':focus-visible { outline: 2px solid black; }';
		canvasElement.ownerDocument.head.append(globalFocusStyle);
		try {
			await userEvent.click(canvas.getByRole('button', { name: 'View options' }));
			const group = await document.findByRole('menuitem', { name: 'Group by' });
			const trigger = canvas.getByRole('button', { name: 'View options' });
			const menu = group.closest('[role="menu"]')!;
			await waitFor(() =>
				expect(
					Math.abs(menu.getBoundingClientRect().top - trigger.getBoundingClientRect().bottom - 4),
					'menu stays anchored below its trigger'
				).toBeLessThan(2)
			);
			group.focus();
			await userEvent.keyboard('{ArrowRight}');
			const session = await document.findByRole('menuitem', { name: 'Session' });
			const submenu = session.closest('[role="menu"]');
			if (!submenu) throw new Error('Grouping options require their submenu');
			await waitFor(() =>
				expect(
					Math.abs(submenu.getBoundingClientRect().left - group.getBoundingClientRect().right - 4),
					'submenu opens beside its parent item'
				).toBeLessThan(2)
			);
			await expect(getComputedStyle(submenu).maxHeight).not.toBe('none');
			await expect(parseFloat(getComputedStyle(submenu).maxHeight)).toBeLessThanOrEqual(384);
			session.focus();
			await expect(
				getComputedStyle(session).outlineStyle,
				'keyboard highlight replaces the global focus outline'
			).toBe('none');
			await expect(
				getComputedStyle(session).backgroundColor,
				'keyboard focus remains visibly highlighted'
			).not.toBe('rgba(0, 0, 0, 0)');
			await userEvent.keyboard('{Escape}{Escape}');
		} finally {
			globalFocusStyle.remove();
		}
	}
</script>

<script lang="ts">
	let selectedValue = $state('');

	function handleSelect(value: string) {
		selectedValue = value;
		console.log('Selected:', value);
	}
</script>

<Story name="All Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; width: 300px;">
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Default</h3>
				<DropdownMenu buttonLabel="Select a fruit" items={sampleItems} onSelect={handleSelect} />
				{#if selectedValue}
					<p style="margin-top: 8px; font-size: 12px; color: #666;">
						Selected: <strong>{selectedValue}</strong>
					</p>
				{/if}
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Disabled</h3>
				<DropdownMenu buttonLabel="Select a fruit" items={sampleItems} disabled={true} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Empty Items</h3>
				<DropdownMenu buttonLabel="No options" items={[]} />
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Alignment Options</h3>
				<div style="display: flex; gap: 16px; align-items: center;">
					<div>
						<p style="margin: 0 0 8px; font-size: 12px; color: #666;">Start aligned</p>
						<DropdownMenu
							buttonLabel="Start"
							items={['Very Long Option Name That Extends', 'Short', 'Medium Length Option']}
							align="start"
						/>
					</div>
					<div>
						<p style="margin: 0 0 8px; font-size: 12px; color: #666;">End aligned</p>
						<DropdownMenu
							buttonLabel="End"
							items={['Very Long Option Name That Extends', 'Short', 'Medium Length Option']}
							align="end"
						/>
					</div>
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">Long Items List</h3>
				<DropdownMenu
					buttonLabel="Select from many"
					items={[
						...sampleItems,
						'Kiwi',
						'Lemon',
						'Mango',
						'Nectarine',
						'Orange',
						'Papaya',
						'Quince',
						'Raspberry',
						'Strawberry',
						'Tangerine'
					]}
					onSelect={handleSelect}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		buttonLabel: 'Select a fruit',
		items: sampleItems,
		disabled: false,
		align: 'start'
	}}
>
	{#snippet template(args)}
		<div style="width: 300px;">
			<DropdownMenu {...args} />
		</div>
	{/snippet}
</Story>

{#snippet compositionExample()}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger
			>{#snippet child({ props })}<Button
					{...props}
					variant="secondary"
					label="View options"
					icon="chevron-down"
				/>{/snippet}</DropdownMenu.Trigger
		>
		<DropdownMenu.Content style="width: 240px;">
			<DropdownMenu.Label id="view-menu-label">View</DropdownMenu.Label>
			<DropdownMenu.Group aria-labelledby="view-menu-label">
				<DropdownMenu.Item icon="search">Traces</DropdownMenu.Item>
				<DropdownMenu.Item>Agent runs</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>Group by</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.Item>Session</DropdownMenu.Item>
					<DropdownMenu.Item>Workflow</DropdownMenu.Item>
					<DropdownMenu.Item disabled>Unavailable</DropdownMenu.Item>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/snippet}

<Story name="Composition" template={compositionExample} />
<Story
	name="Composition interactions"
	tags={['interaction', '!dev', '!autodocs']}
	play={openSubmenu}
	template={compositionExample}
/>

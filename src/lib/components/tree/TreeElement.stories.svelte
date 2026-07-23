<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tree from './index.js';
	import type { TreeElementMetric } from './TreeElementDetails.svelte';

	// A token-count metric for the sample rows below.
	const tokens = (value: string): TreeElementMetric[] => [
		{ icon: 'brackets', value: `${value} tokens`, ariaLabel: `${value} tokens` }
	];

	const { Story } = defineMeta({
		title: 'Components/Tree/TreeElement',
		component: Tree.Element,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			expanded: {
				control: { type: 'boolean' },
				description: 'Controls whether the tree element is expanded'
			},
			tag: {
				control: { type: 'text' },
				description: 'Short text rendered in the boxed leading tag'
			},
			label: {
				control: { type: 'text' },
				description: 'The label text for the tree element'
			},
			indentLevel: {
				control: { type: 'number' },
				description: 'The indentation level (number of trail zones)'
			},
			upConnector: {
				control: { type: 'boolean' },
				description: 'Whether to show the up connector on the icon'
			},
			downConnector: {
				control: { type: 'boolean' },
				description: 'Whether to show the down connector on the icon'
			},
			inwardTrail: {
				control: { type: 'boolean' },
				description: 'Whether to show an inward trail zone before the icon'
			},
			badgeCount: {
				control: { type: 'number' },
				description: 'Optional badge count to display'
			},
			canExpand: {
				control: { type: 'boolean' },
				description: 'Whether the element can be expanded'
			},
			indentLines: {
				control: { type: 'object' },
				description:
					'Array of booleans indicating which indent levels should show vertical lines (left to right)'
			}
		}
	});
</script>

<Story name="Element Types">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Agent</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<Tree.Element tag="Agent" label="Agent Task" upConnector={false} downConnector={false} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Component</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<Tree.Element
						tag="Component"
						label="Component Task"
						upConnector={false}
						downConnector={false}
					/>
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">NLI</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<Tree.Element tag="NLI" label="NLI Task" upConnector={false} downConnector={false} />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="States">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Default</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<Tree.Element tag="Agent" label="Agent Task" upConnector={false} downConnector={false} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Selected</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<Tree.Element
						tag="Agent"
						label="Agent Task"
						upConnector={false}
						downConnector={false}
						selected={true}
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Details Variants">
	{#snippet template()}
		<div
			style="display: flex; flex-direction: column; gap: 16px; padding:
		24px;"
		>
			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Processing</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<Tree.Element
						tag="Agent"
						label="Processing Task"
						details={{ status: 'processing', time: '10s' }}
						upConnector={false}
						downConnector={false}
					/>
				</div>
			</div>
			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Completed</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<Tree.Element
						tag="Agent"
						label="Completed Task"
						details={{ status: 'completed', time: '13.6s', metrics: tokens('2523') }}
						upConnector={false}
						downConnector={false}
					/>
				</div>
			</div>

			<div>
				<h3
					style="margin: 0 0 12px; font-size: 14px; font-weight:
				500;"
				>
					No details
				</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<Tree.Element
						tag="Agent"
						label="Completed Task"
						upConnector={false}
						downConnector={false}
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Badge">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">With Badge Count</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<Tree.Element
						tag="Component"
						label="Task with Badge"
						badgeCount={5}
						upConnector={false}
						downConnector={false}
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Complete Tree">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; padding: 24px;">
			<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">
				Complete tree with nested children
			</h3>
			<div style="display: inline-flex; flex-direction: column; border: 1px dashed purple">
				<!-- Agent root -->
				<Tree.Element
					tag="Agent"
					label="Agent"
					indentLevel={0}
					downConnector={true}
					details={{ status: 'completed', time: '18.4s', metrics: tokens('5243') }}
				/>

				<!-- First NLI child -->
				<Tree.Element
					tag="NLI"
					label="NLI Call"
					indentLevel={1}
					inwardTrail={true}
					upConnector={false}
					downConnector={true}
					indentLines={[true]}
					details={{ status: 'completed', time: '2.1s', metrics: tokens('842') }}
				/>

				<!-- Second NLI child -->
				<Tree.Element
					tag="NLI"
					label="NLI Call"
					indentLevel={1}
					upConnector={true}
					downConnector={true}
					indentLines={[true]}
					details={{ status: 'completed', time: '1.8s', metrics: tokens('723') }}
				/>

				<!-- Component child with its own children -->
				<Tree.Element
					tag="Component"
					label="Component"
					indentLevel={1}
					upConnector={true}
					downConnector={true}
					indentLines={[true]}
					details={{ status: 'completed', time: '5.3s', metrics: tokens('1456') }}
				/>

				<!-- First nested NLI under Component -->
				<Tree.Element
					tag="NLI"
					label="NLI Call"
					indentLevel={2}
					inwardTrail={true}
					upConnector={false}
					downConnector={true}
					indentLines={[true, true]}
					details={{ status: 'completed', time: '2.6s', metrics: tokens('698') }}
				/>

				<!-- Last nested NLI under Component -->
				<Tree.Element
					tag="NLI"
					label="NLI Call"
					indentLevel={2}
					upConnector={true}
					downConnector={false}
					indentLines={[true, true]}
					details={{ status: 'completed', time: '2.7s', metrics: tokens('758') }}
				/>

				<!-- Fourth NLI child at level 1 -->
				<Tree.Element
					tag="NLI"
					label="NLI Call"
					indentLevel={1}
					upConnector={true}
					downConnector={true}
					indentLines={[true]}
					details={{ status: 'completed', time: '3.2s', metrics: tokens('1024') }}
				/>

				<!-- Fifth NLI child at level 1 -->
				<Tree.Element
					tag="NLI"
					label="NLI Call"
					indentLevel={1}
					upConnector={true}
					downConnector={false}
					indentLines={[true]}
					details={{ status: 'completed', time: '3.0s', metrics: tokens('900') }}
				/>

				<!-- Second Agent root -->
				<Tree.Element
					tag="Agent"
					label="Agent"
					indentLevel={0}
					upConnector={true}
					downConnector={true}
					details={{ status: 'completed', time: '12.7s', metrics: tokens('3842') }}
				/>

				<!-- First NLI child of second Agent -->
				<Tree.Element
					tag="NLI"
					label="NLI Call"
					indentLevel={1}
					inwardTrail={true}
					upConnector={false}
					downConnector={true}
					details={{ status: 'completed', time: '1.9s', metrics: tokens('654') }}
				/>

				<!-- Second NLI child of second Agent -->
				<Tree.Element
					tag="NLI"
					label="NLI Call"
					indentLevel={1}
					upConnector={true}
					downConnector={true}
					details={{ status: 'completed', time: '2.4s', metrics: tokens('812') }}
				/>

				<!-- Component child with nested child (last branch) -->
				<Tree.Element
					tag="Component"
					label="Component"
					indentLevel={1}
					upConnector={true}
					downConnector={true}
					details={{ status: 'completed', time: '8.4s', metrics: tokens('2376') }}
				/>

				<!-- Nested NLI under Component (last element) -->
				<Tree.Element
					tag="NLI"
					label="NLI Call"
					indentLevel={2}
					inwardTrail={true}
					upConnector={false}
					downConnector={false}
					details={{ status: 'completed', time: '8.4s', metrics: tokens('2376') }}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Overflow">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
			<div>
				<h3
					style="margin: 0 0 12px; font-size: 14px; font-weight:
				500;"
				>
					Text overflow
				</h3>
				<div style="width: 300px;  border: 1px dashed purple;">
					<Tree.Element
						tag="Component"
						label="This is a very long task name that should overflow and show an ellipsis"
						details={{ status: 'completed', time: '13.6s', metrics: tokens('2523') }}
						upConnector={false}
						downConnector={false}
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Expandable">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 24px; padding: 24px;">
			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Collapsed</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<Tree.Element
						tag="Component"
						label="Element"
						expanded={false}
						canExpand={true}
						upConnector={false}
						downConnector={false}
					/>
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 500;">Expanded</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<Tree.Element
						tag="Component"
						label="Element"
						canExpand={true}
						expanded={true}
						upConnector={false}
						downConnector={false}
					/>
				</div>
			</div>

			<div>
				<h3
					style="margin: 0 0 12px; font-size: 14px; font-weight:
				500;"
				>
					Not expandable
				</h3>
				<div style="display: inline-flex; border: 1px dashed purple">
					<Tree.Element
						tag="Component"
						label="Element"
						canExpand={false}
						upConnector={false}
						downConnector={false}
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story
	name="Playground"
	args={{
		expanded: true,
		canExpand: true,
		tag: 'Agent',
		label: 'Tree Element',
		indentLevel: 0,
		upConnector: true,
		downConnector: true,
		inwardTrail: false
	}}
>
	{#snippet template(args)}
		<div style="display: inline-flex; border: 1px dashed purple">
			<Tree.Element {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Label Tooltip">
	{#snippet template()}
		{#snippet card()}
			<div style="display: flex; flex-direction: column; gap: 4px; padding: 8px 12px;">
				<strong>checkout-agent</strong>
				<span style="opacity: 0.75;">Handles checkout, refunds, and order lookups.</span>
			</div>
		{/snippet}
		<div style="display: inline-flex; width: 20rem; border: 1px dashed purple;">
			<Tree.Element tag="Agent" label="Agent Task" labelTooltip={card} />
		</div>
	{/snippet}
</Story>

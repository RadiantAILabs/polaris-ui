<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tree from './index.js';

	const { Story } = defineMeta({
		title: 'Components/Tree/TreeTrail',
		component: Tree.Trail,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			down: {
				control: { type: 'boolean' },
				description: 'Whether the trail line continues below'
			},
			outward: {
				control: { type: 'boolean' },
				description: 'Whether the trail line goes to the right'
			},
			inward: {
				control: { type: 'boolean' },
				description: 'Whether the trail line comes back from the right'
			}
		}
	});
</script>

<Story name="Variants">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 32px; padding: 40px;">
			<!-- All combinations of down, outward, and inward -->
			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					(down=false, outward=false, inward=false)
				</h3>
				<div
					style="display: inline-flex; background: var(--color-background-raised); border: 1px
				dashed purple; border-radius: 2px;"
				>
					<Tree.Trail down={false} outward={false} inward={false} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					(down=false, outward=false, inward=true)
				</h3>
				<div
					style="display: inline-flex; background: var(--color-background-raised); border: 1px
				dashed purple; border-radius: 2px;"
				>
					<Tree.Trail down={false} outward={false} inward={true} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					(down=false, outward=true, inward=false)
				</h3>
				<div
					style="display: inline-flex; background: var(--color-background-raised); border: 1px
				dashed purple; border-radius: 2px;"
				>
					<Tree.Trail down={false} outward={true} inward={false} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					(down=false, outward=true, inward=true)
				</h3>
				<div
					style="display: inline-flex; background: var(--color-background-raised); border: 1px
				dashed purple; border-radius: 2px;"
				>
					<Tree.Trail down={false} outward={true} inward={true} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					(down=true, outward=false, inward=false)
				</h3>
				<div
					style="display: inline-flex; background: var(--color-background-raised); border: 1px
				dashed purple; border-radius: 2px;"
				>
					<Tree.Trail down={true} outward={false} inward={false} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					(down=true, outward=false, inward=true)
				</h3>
				<div
					style="display: inline-flex; background: var(--color-background-raised); border: 1px
				dashed purple; border-radius: 2px;"
				>
					<Tree.Trail down={true} outward={false} inward={true} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					(down=true, outward=true, inward=false)
				</h3>
				<div
					style="display: inline-flex; background: var(--color-background-raised); border: 1px
				dashed purple; border-radius: 2px;"
				>
					<Tree.Trail down={true} outward={true} inward={false} />
				</div>
			</div>

			<div>
				<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 500;">
					(down=true, outward=true, inward=true)
				</h3>
				<div
					style="display: inline-flex; background: var(--color-background-raised); border: 1px
				dashed purple; border-radius: 2px;"
				>
					<Tree.Trail down={true} outward={true} inward={true} />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Resizable, { type Pane } from './index.js';
	import { Button } from '../button/index.js';

	const { Story } = defineMeta({
		title: 'Components/Resizable',
		// TODO figure out why this breaks the storybook build
		// component: Resizable.PaneGroup,
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['autodocs'],
		argTypes: {
			direction: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical'],
				description: 'The direction of the resizable panels'
			}
		}
	});
</script>

<script lang="ts">
	let rightPane: Pane | undefined = $state(undefined);
	let collapsed = $state(false);
</script>

<Story name="Horizontal">
	{#snippet template()}
		<div style="height: 100vh; padding: 16px;">
			<div style="width: 100%; height: 100%; border: 1px dashed purple;">
				<Resizable.PaneGroup direction="horizontal">
					<Resizable.Pane defaultSize={50} minSize={20} maxSize={80}>
						<div
							style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-base);"
						>
							<div style="text-align: center;">
								<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Left Panel</h3>
								<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
									Default 50% - Min 20% - Max 80%
								</p>
							</div>
						</div>
					</Resizable.Pane>

					<Resizable.PaneResizer />

					<Resizable.Pane defaultSize={50}>
						<div
							style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-raised);"
						>
							<div style="text-align: center;">
								<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Right Panel</h3>
								<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
									Default 50%
								</p>
							</div>
						</div>
					</Resizable.Pane>
				</Resizable.PaneGroup>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Vertical">
	{#snippet template()}
		<div style="height: 100vh; padding: 16px;">
			<div style="width: 100%; height: 100%; border: 1px dashed purple;">
				<Resizable.PaneGroup direction="vertical">
					<Resizable.Pane defaultSize={40} minSize={20}>
						<div
							style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-base);"
						>
							<div style="text-align: center;">
								<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Top Panel</h3>
								<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
									Default 40% - Min 20%
								</p>
							</div>
						</div>
					</Resizable.Pane>

					<Resizable.PaneResizer />

					<Resizable.Pane defaultSize={60}>
						<div
							style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-raised);"
						>
							<div style="text-align: center;">
								<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Bottom Panel</h3>
								<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
									Default 60%
								</p>
							</div>
						</div>
					</Resizable.Pane>
				</Resizable.PaneGroup>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Three Panels">
	{#snippet template()}
		<div style="height: 100vh; padding: 16px;">
			<div style="width: 100%; height: 100%; border: 1px dashed purple;">
				<Resizable.PaneGroup direction="horizontal">
					<Resizable.Pane defaultSize={25} minSize={15} maxSize={40}>
						<div
							style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-base);"
						>
							<div style="text-align: center;">
								<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Sidebar</h3>
								<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
									Default 25% - Min 15% - Max 40%
								</p>
							</div>
						</div>
					</Resizable.Pane>

					<Resizable.PaneResizer />

					<Resizable.Pane defaultSize={50} minSize={30}>
						<div
							style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-raised);"
						>
							<div style="text-align: center;">
								<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Main Content</h3>
								<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
									Default 50% - Min 30%
								</p>
							</div>
						</div>
					</Resizable.Pane>

					<Resizable.PaneResizer />

					<Resizable.Pane defaultSize={25} minSize={15} maxSize={40}>
						<div
							style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-base);"
						>
							<div style="text-align: center;">
								<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Inspector</h3>
								<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
									Default 25% - Min 15% - Max 40%
								</p>
							</div>
						</div>
					</Resizable.Pane>
				</Resizable.PaneGroup>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Nested">
	{#snippet template()}
		<div style="height: 100vh; padding: 16px;">
			<div style="width: 100%; height: 100%; border: 1px dashed purple;">
				<Resizable.PaneGroup direction="horizontal">
					<Resizable.Pane defaultSize={30} minSize={20}>
						<div
							style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-base);"
						>
							<div style="text-align: center;">
								<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Sidebar</h3>
								<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
									Default 30% - Min 20%
								</p>
							</div>
						</div>
					</Resizable.Pane>

					<Resizable.PaneResizer />

					<Resizable.Pane defaultSize={70}>
						<Resizable.PaneGroup direction="vertical">
							<Resizable.Pane defaultSize={60} minSize={30}>
								<div
									style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-raised);"
								>
									<div style="text-align: center;">
										<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">
											Main Content
										</h3>
										<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
											Default 60% - Min 30%
										</p>
									</div>
								</div>
							</Resizable.Pane>

							<Resizable.PaneResizer />

							<Resizable.Pane defaultSize={40} minSize={20}>
								<div
									style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-base);"
								>
									<div style="text-align: center;">
										<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">
											Bottom Panel
										</h3>
										<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
											Default 40% - Min 20%
										</p>
									</div>
								</div>
							</Resizable.Pane>
						</Resizable.PaneGroup>
					</Resizable.Pane>
				</Resizable.PaneGroup>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Collapsible with Animation">
	<div style="height: 100vh; padding: 16px;">
		<div style="width: 100%; height: 100%; border: 1px dashed purple;">
			<Resizable.PaneGroup direction="horizontal">
				<Resizable.Pane defaultSize={50}>
					<div
						style="display: flex; flex-direction: column; gap: 16px; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-base);"
					>
						<div style="text-align: center;">
							<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Main Panel</h3>
							<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
								Click the button to toggle the right panel with animation
							</p>
						</div>
						{#if collapsed}
							<Button label="Expand Right Panel" onclick={() => rightPane?.expand()} />
						{:else}
							<Button label="Collapse Right Panel" onclick={() => rightPane?.collapse()} />
						{/if}
					</div>
				</Resizable.Pane>

				<Resizable.PaneResizer />

				<Resizable.Pane
					bind:this={rightPane}
					defaultSize={50}
					minSize={20}
					maxSize={80}
					collapsible={true}
					collapsedSize={0}
					onCollapse={() => (collapsed = true)}
					onExpand={() => (collapsed = false)}
				>
					<div
						style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-raised);"
					>
						<div style="text-align: center;">
							<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Collapsible Panel</h3>
							<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
								This panel animates when collapsing/expanding
							</p>
						</div>
					</div>
				</Resizable.Pane>
			</Resizable.PaneGroup>
		</div>
	</div>
</Story>

<Story name="Disabled Resizer">
	{#snippet template()}
		<div style="height: 100vh; padding: 16px;">
			<div style="width: 100%; height: 100%; border: 1px dashed purple;">
				<Resizable.PaneGroup direction="horizontal">
					<Resizable.Pane defaultSize={50} minSize={20} maxSize={80}>
						<div
							style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-base);"
						>
							<div style="text-align: center;">
								<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Left Panel</h3>
								<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
									The resizer is disabled - you cannot drag it
								</p>
							</div>
						</div>
					</Resizable.Pane>

					<Resizable.PaneResizer disabled={true} />

					<Resizable.Pane defaultSize={50}>
						<div
							style="display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; color: var(--color-text-primary); background-color: var(--color-background-raised);"
						>
							<div style="text-align: center;">
								<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Right Panel</h3>
								<p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
									Default 50%
								</p>
							</div>
						</div>
					</Resizable.Pane>
				</Resizable.PaneGroup>
			</div>
		</div>
	{/snippet}
</Story>

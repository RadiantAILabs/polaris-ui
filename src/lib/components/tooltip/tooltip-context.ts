import { getContext, setContext } from 'svelte';

const TOOLTIP_PROVIDER_KEY = Symbol('polaris-tooltip-provider');

/** Marks that a shared tooltip provider is mounted above this point in the tree. */
export function setTooltipProviderContext(): void {
	setContext(TOOLTIP_PROVIDER_KEY, true);
}

/** Whether a shared tooltip provider is mounted above the calling component. */
export function hasTooltipProviderContext(): boolean {
	return getContext(TOOLTIP_PROVIDER_KEY) === true;
}

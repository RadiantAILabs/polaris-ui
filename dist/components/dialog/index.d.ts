declare const Dialog: import("svelte").Component<import("./Dialog.svelte").DialogProps, {}, "open"> & {
    Footer: import("svelte").Component<import("./DialogFooter.svelte").DialogFooterProps, {}, "">;
};
export { Dialog, Dialog as default };
export type { DialogProps } from './Dialog.svelte';
export type { DialogFooterProps } from './DialogFooter.svelte';

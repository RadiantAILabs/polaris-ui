import DialogComponent from './Dialog.svelte';
import DialogFooter from './DialogFooter.svelte';
const Dialog = Object.assign(DialogComponent, {
    Footer: DialogFooter
});
export { Dialog, Dialog as default };

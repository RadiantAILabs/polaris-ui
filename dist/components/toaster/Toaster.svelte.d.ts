import { Toaster } from 'svelte-sonner';
export interface ToasterProps {
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    duration?: number;
    visibleToasts?: number;
    closeButton?: boolean;
    expand?: boolean;
    offset?: string;
    class?: string;
}
declare const Toaster: import("svelte").Component<ToasterProps, {}, "">;
type Toaster = ReturnType<typeof Toaster>;
export default Toaster;

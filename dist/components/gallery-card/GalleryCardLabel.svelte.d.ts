import type { Snippet } from 'svelte';
export type GalleryCardLabelProps = {
    value?: string;
    label?: string;
    position?: 'below' | 'right';
    span?: number;
    children?: Snippet;
};
declare const GalleryCardLabel: import("svelte").Component<GalleryCardLabelProps, {}, "">;
type GalleryCardLabel = ReturnType<typeof GalleryCardLabel>;
export default GalleryCardLabel;

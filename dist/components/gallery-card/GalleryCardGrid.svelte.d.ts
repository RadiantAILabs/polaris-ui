import type { Snippet } from 'svelte';
export type GalleryCardGridProps = {
    columns?: 2 | 3 | 4;
    children: Snippet;
};
declare const GalleryCardGrid: import("svelte").Component<GalleryCardGridProps, {}, "">;
type GalleryCardGrid = ReturnType<typeof GalleryCardGrid>;
export default GalleryCardGrid;

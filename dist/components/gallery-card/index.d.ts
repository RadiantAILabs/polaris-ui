declare const GalleryCard: import("svelte").Component<import("./GalleryCard.svelte").GalleryCardProps, {}, "ref"> & {
    Grid: import("svelte").Component<import("./GalleryCardGrid.svelte").GalleryCardGridProps, {}, "">;
    Label: import("svelte").Component<import("./GalleryCardLabel.svelte").GalleryCardLabelProps, {}, "">;
};
export { GalleryCard as default };
export type { GalleryCardProps } from './GalleryCard.svelte';
export type { GalleryCardGridProps } from './GalleryCardGrid.svelte';
export type { GalleryCardLabelProps } from './GalleryCardLabel.svelte';

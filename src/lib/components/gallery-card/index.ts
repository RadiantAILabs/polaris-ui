import GalleryCardComponent from './GalleryCard.svelte';
import GalleryCardGrid from './GalleryCardGrid.svelte';
import GalleryCardLabel from './GalleryCardLabel.svelte';

const GalleryCard = Object.assign(GalleryCardComponent, {
	Grid: GalleryCardGrid,
	Label: GalleryCardLabel
});

export { GalleryCard as default };
export type { GalleryCardProps } from './GalleryCard.svelte';
export type { GalleryCardGridProps } from './GalleryCardGrid.svelte';
export type { GalleryCardLabelProps } from './GalleryCardLabel.svelte';

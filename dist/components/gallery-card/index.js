import GalleryCardComponent from './GalleryCard.svelte';
import GalleryCardGrid from './GalleryCardGrid.svelte';
import GalleryCardLabel from './GalleryCardLabel.svelte';
const GalleryCard = Object.assign(GalleryCardComponent, {
    Grid: GalleryCardGrid,
    Label: GalleryCardLabel
});
export { GalleryCard as default };

/* Photos dropped into src/assets/cards/<slug>/ are picked up automatically (see README there). */
const files = import.meta.glob('../assets/cards/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const bySlug = {};
Object.keys(files).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).forEach((path) => {
  const slug = path.split('/').slice(-2)[0];
  (bySlug[slug] ||= []).push(files[path]);
});

export const getPhotos = (slug) => bySlug[slug] || [];
export const photoClass = (slug) => (getPhotos(slug).length ? 'has-photos' : '');

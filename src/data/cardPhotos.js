/* Photos dropped into src/assets/cards/<slug>/ are picked up automatically (see README there). */
const files = import.meta.glob('../assets/cards/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
});

/* documents, screenshots and logos are shown whole instead of being cropped to the card */
const DOC = /(cert|offer|letter|recog|badge|logo|ieee|\bui\b|project|retailsense|industry|nptel|merit-cert)/i;

const bySlug = {};
Object.keys(files).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).forEach((path) => {
  const parts = path.split('/');
  const slug = parts[parts.length - 2];
  (bySlug[slug] ||= []).push({ src: files[path], doc: DOC.test(parts[parts.length - 1]) });
});

export const getPhotos = (slug) => bySlug[slug] || [];
export const photoClass = (slug) => (getPhotos(slug).length ? 'has-photos' : '');

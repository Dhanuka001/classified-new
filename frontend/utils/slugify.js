export function createSlug(ad) {
  const cleanTitle = `${ad.title}`.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/^-+|-+$/g, '')     
    .replace(/--+/g, '-');

  return `${ad.category}/${cleanTitle}-${ad._id}`;
}

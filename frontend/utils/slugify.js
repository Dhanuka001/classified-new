export function createSlug(ad) {
    const base = `${ad.title}-${ad.location}`;
    return base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') 
      .replace(/^-+|-+$/g, '')     
      .replace(/--+/g, '-')       
      + `-${ad.id}`;
  }
  
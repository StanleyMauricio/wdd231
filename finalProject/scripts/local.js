
const FAVORITES_KEY = 'pt_favorites_v1';

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorite(id, active) {
  try {
    let favs = getFavorites();
    id = Number(id);
    if (active) {
      if (!favs.includes(id)) favs.push(id);
    } else {
      favs = favs.filter(i => i !== id);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  } catch (e) {
    console.error('saveFavorite error', e);
  }
}

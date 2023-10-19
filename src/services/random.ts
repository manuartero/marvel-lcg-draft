export function pickN<T>(pool: T[], n: number) {
  const items: T[] = [];
  while (items.length < n && pool.length >= 3) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    const randomCard = pool[randomIndex];
    items.push(randomCard);
    pool.splice(randomIndex, 1);
  }

  return items;
}

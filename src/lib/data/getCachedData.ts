export async function getCacheData<T>(
  item: string,
  cb: () => Promise<T>,
  seconds: number = 60
): Promise<T> {
  const cache = localStorage.getItem(item);
  const cachedData = cache ? JSON.parse(cache) : null;

  if (cachedData && new Date().getTime() < cachedData.expiry) {
    console.log(`using cached ${item}...`);
    return cachedData.data;
  } else {
    // const upgrades = await fetchUpgradesJSON();
    const data = await cb();
    console.log(`fetched ${item} from server...`);
    localStorage.setItem(
      item,
      JSON.stringify({
        expiry: new Date().getTime() + seconds * 1000,
        data,
      })
    );
    return data;
  }
}

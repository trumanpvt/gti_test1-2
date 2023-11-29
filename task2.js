(async function () {
  // эмулирую localStorage на случай если код запускаем не в браузере и не имеем window
  const storage = typeof window !== "undefined" ? localStorage : {};

  if (typeof window === "undefined") {
    Object.defineProperty(storage, "getItem", {
      value: function (key) {
        return this[key];
      },
      enumerable: false,
    });

    Object.defineProperty(storage, "setItem", {
      value: function (key, value) {
        this[key] = value;
      },
      enumerable: false,
    });
  }

  const getCache = (date, isins) => {
    const cache = storage.getItem(date);

    if (cache) {
      let cacheIsValid = !!cache;
      const parsedCache = JSON.parse(cache);
      isins.forEach((isin) => {
        cacheIsValid = parsedCache.some((item) => item["isin"] === isin);
      });

      return cacheIsValid && parsedCache;
    }

    return false;
  };

  const getBondsData = async ({ date, isins }) => {
    const cache = getCache(date, isins);
    if (cache) return cache;

    // запрос на тестовый API
    const url = "https://my-json-server.typicode.com/trumanpvt/sov_test1-2";

    const response = await fetch(`${url}/${date}?isins=${isins}`);

    const data = await response.json();

    storage.setItem(date, JSON.stringify(data));

    return data;
  };

  // кэш пуст, будет запрос на API
  const test = await getBondsData({
    date: "20231129",
    isins: ["SU26244RMFS2", "RU000A1059P4"],
  });

  console.log("test data from server", test);

  // в кэше нужные данные, запроса не будет
  const testFromCache = await getBondsData({
    date: "20231129",
    isins: ["SU26244RMFS2", "RU000A1059P4"],
  });

  console.log("test data from cache, ", testFromCache);

  // в кэше не хватает данных, новый запрос
  const testFromServer = await getBondsData({
    date: "20231129",
    isins: ["SU26244RMFS2", "RU000A1059P4", "newIsin"],
  });

  console.log("new test data from server, ", testFromServer);
})();

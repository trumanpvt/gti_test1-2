const getCache = (date, isins) => {
  const cache = localStorage.getItem(date);
  let cacheIsValid = !!cache;

  if (cache) {
    isins.forEach((isin) => {
      cacheIsValid = cache.hasOwnProperty(isin);
    });
  }

  return cacheIsValid && cache;
};

const getBondsData = async ({ date, isins }) => {
  const cache = getCache(date, isins);
  if (cache) return cache;

  const result = await http.post({
    url: `/bonds/${date}`,
    body: isins,
  });

  return result.json();
};
// Пример вызова функции:
const test = getBondsData({
  date: "20231129",
  isins: ["SU26244RMFS2", "RU000A1059P4"],
});
// Результат:
// const result = [
//   {
//     isin: "SU26244RMFS2",
//     data: {
//       yield: 11.84,
//       coupon: 47.47,
//       maturity_date: "15.03.2034",
//       coupon_payment_date: "27.03.2024",
//     },
//   },
//   {
//     isin: "RU000A1059P4",
//     data: {
//       yield: 4.78,
//       coupon: 14,
//       maturity_date: "26.04.2027",
//       coupon_payment_date: "26.04.2024",
//     },
//   },
// ];

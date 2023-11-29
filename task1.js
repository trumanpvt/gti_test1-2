const getRandomArray = (length) => {
  // генератор массива
  return Array.from({ length }, () => Math.floor(Math.random() * 100));
};

const getPercentsArr = (arr) => {
  const maxLength = 30000000; // по результатам замера на моем ПК

  if (arr.length > maxLength) {
    console.log("array is too big, result will be empty");

    return [];
  }

  const sum = arr.reduce((prev, curr) => prev + parseFloat(curr), 0);

  return arr.map((item) => (100 / (sum / item)).toFixed(3));
};

const randomArray = getRandomArray(100);
// const start = new Date().getTime(); // при желании измерить примерное время выполнения
const percentsArr = getPercentsArr(randomArray);
// const end = new Date().getTime(); // при желании измерить примерное время выполнения
// console.log(`SecondWay: ${end - start}ms`); // при желании измерить примерное время выполнения
console.log("result: ", percentsArr);

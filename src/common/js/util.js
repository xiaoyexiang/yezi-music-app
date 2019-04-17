function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 字符串后四位转化为万
 * @param {String} num
 * @return {String}
 */
export const handleCount = (num) => {
  if (num) {
    const str = String(num);
    if (str.length > 5) {
      return str.replace(/\d{4}$/, '万');
    }
    return str;
  }
  return '';
};

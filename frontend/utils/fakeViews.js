export function getFakeViewsByType(promotion) {
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    if (promotion === 'vip') return `${random(10, 25)}k+`;
    if (promotion === 'super') return `${random(5, 10)}k+`;
    return `${random(1, 5)}k+`;
  }
  
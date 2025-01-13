export function addCommas(price: number) {
  if (price == null || isNaN(price)) {
    return '';
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

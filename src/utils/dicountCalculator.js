export default function discountCalculator(realPrice, offPrice, decimal = 1) {
  return (((realPrice - offPrice) * 100) / realPrice).toFixed(decimal);
}

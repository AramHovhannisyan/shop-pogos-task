export function getClientChange(paid: number, total: number) {
  return parseFloat((paid - total).toFixed(2));
}

export function getClientNewTotal(oldTotal: number, saleTotal: number) {
  return oldTotal + saleTotal;
}

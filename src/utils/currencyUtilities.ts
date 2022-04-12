export function priceToFloat(value: string): string {
  return value.toString().replace(/(\d)(\d{2})$/, '$1.$2');
}

export function currencyFormatted(value: string): string {
  const price = priceToFloat(value);
  return `R$ ${Number(price).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  })}`;
}

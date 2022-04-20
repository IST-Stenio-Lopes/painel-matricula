export function cepMasked(e: string): string {
  const temp = e.replace(/^(\d{5})(\d)/g, '$1-$2');
  return temp;
}

export function telMasked(e: string): string {
  let temp = e;

  if (e.length < 11) temp = e.replace(/(\d{2})(\d{4})(\d)/g, '($1) $2-$3');
  else temp = e.replace(/(\d{2})(\d{5})(\d)/g, '($1) $2-$3');

  return temp;
}

export function cellPhoneMasked(e: string): string {
  const temp = e.replace(/(\d{2})(\d{5})(\d)/g, '($1) $2-$3');
  return temp;
}

export function cpfMasked(e: string): string {
  const temp = e.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  return temp;
}

export function cpnjMasked(e: string): string {
  const temp = e.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  return temp;
}

export function timeMasked(e: string): string {
  const temp = e.replace(/(\d{2})(\d{2})$/, '$1:$2');
  return temp;
}

export function dateMasked(e: string): string {
  const temp = e.replace(/(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
  return temp;
}

export function metersMasked(e: string): string {
  let temp = e;
  temp = temp.replace(/\D/g, '');
  temp = temp.replace(/(\d)$/g, '$1 m²');
  return temp;
}

export function removeMask(e: string): string {
  const temp = e.replace(/\D/g, '');
  return temp;
}

// eslint-disable-next-line no-useless-escape
export const phoneRegExp = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g;

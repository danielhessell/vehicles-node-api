export function validatePlaca(placa: string): boolean {
  const regexOld = /^[A-Z]{3}\d{4}$/; // ABC-1234
  const regexMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/; // ABC1D23

  return regexOld.test(placa) || regexMercosul.test(placa);
}

export function validarChassi(chassi: string): boolean {
  const regexChassi = /^[A-HJ-NPR-Z0-9]{17}$/; // 17 caracteres, sem I, O, Q
  return regexChassi.test(chassi.toUpperCase());
}

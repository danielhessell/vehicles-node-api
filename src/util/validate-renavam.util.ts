export function validateRenavam(renavam: string): boolean {
  const regexRenavam = /^\d{9}|\d{11}$/;
  return regexRenavam.test(renavam);
}

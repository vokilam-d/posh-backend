export const isObject = <T>(obj: T): boolean => {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

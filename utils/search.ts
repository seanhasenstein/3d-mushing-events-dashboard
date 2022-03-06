export function registrationSearch<T>(
  object: T,
  properties: Array<keyof T>,
  query: string
): boolean {
  if (query.length < 2) {
    return true;
  }

  return properties.some(property => {
    const value = object[property];

    if (typeof value === 'string' || typeof value === 'number') {
      return value.toString().toLowerCase().includes(query.toLowerCase());
    }

    return false;
  });
}

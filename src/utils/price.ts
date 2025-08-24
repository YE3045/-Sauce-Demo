export function parsePrice(text: string): number {
  // e.g. "$29.99" -> 29.99
  const num = text.replace(/[^0-9.-]+/g, '');
  return parseFloat(num);
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

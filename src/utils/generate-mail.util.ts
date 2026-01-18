export function generateUniqueEmail(prefix = 'test', domain = 'gmail.com'): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}_${timestamp}_${random}@${domain}`;
}

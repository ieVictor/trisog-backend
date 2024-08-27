export function isValidFirebaseUID(uid: string): boolean {
  const uidRegex = /^[A-Za-z0-9-_]{28,256}$/;
  return uidRegex.test(uid);
}
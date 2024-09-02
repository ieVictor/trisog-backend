export function isValidFirebaseUID(uid: string): boolean {
  const uidRegex = /^[A-Za-z0-9-_]{28,256}$/;
  return uidRegex.test(uid);
}

export function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}
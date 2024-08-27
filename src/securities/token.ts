import admin from '../utils/firebase';

export class Token {
  static async verifyToken(token: string): Promise<string | null> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken.uid;
    } catch (error) {
      return null
    }
  }
}
import { User, UserInsert } from "../models/userModel";
import prismaClient from "../utils/database";

type UsersResponse = {
  users: User[] | null;
  error: string | null
}

type UserResponse = {
  user: User | null;
  error: string | null
}

export class UserService {
  static async getUsers(): Promise<UsersResponse> {
    try {
      const users = await prismaClient.user.findMany();
      return { users, error: null}
    } catch (error) {
      console.error('Error retrieveing users: ', error);
      return { users: null, error: 'Internal server error' };
    }
  }

  static async getUsersCounter(): Promise<{users: number | null, error: string | null}> {
    try {
      const users = await prismaClient.user.count();
      return { users, error: null}
    } catch (error) {
      console.error('Error retrieveing users: ', error);
      return { users: null, error: 'Internal server error' };
    }
  }

  static async getUserById(user_id: string): Promise<UserResponse> {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: user_id
        },
      });
      if (user) return { user, error: null };
      return { user: null, error: null };

    } catch (error) {
      console.error('Error retrieving user: ', error);
      return { user: null, error: 'Internal server error' };
    }
  }

  static async createUser(data: UserInsert): Promise<{ createdUserId: string | null, error: string | null}> {
    try {
      const result = await prismaClient.user.create({
        data: { ...data },
      });

      return { createdUserId: result.id, error: null };
    }  catch (error) {
      console.error('Error creating user in database: ', error);
      return { createdUserId: null, error: 'Internal server error' };
    }
  }
}
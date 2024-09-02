import { Request, Response } from "express";
import { isValidFirebaseUID } from "../utils/validate";
import { UserService } from "../services/userService";
import { UserInsert } from "../models/userModel";
import { validate } from "class-validator";

export class UserControler {
  static async getUsers(req: Request, res: Response): Promise<Response> {
    const { users, error: getUsersError } = await UserService.getUsers();
    if (getUsersError) return res.status(500).json({ msg: getUsersError });
    return res.status(200).json(users);
  }

  static async getUsersCounter(req: Request, res: Response): Promise<Response> {
    const { users, error: getUsersError } = await UserService.getUsersCounter();
    if (getUsersError) return res.status(500).json({ msg: getUsersError });
    return res.status(200).json(users);
  }

  static async getUserById(req: Request, res: Response): Promise<Response> {
    const userId = req.params.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    const { user, error: getUserError } = await UserService.getUserById(userId);
    if (getUserError) return res.status(500).json({ msg: getUserError });
    return res.status(200).json(user);
  }

  static async createUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    if (!isValidFirebaseUID(id)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    let payload: UserInsert;

    if (req.body.img === null) {
      const { img, ...requestBody } = req.body;
      payload = new UserInsert(requestBody);
    }
    else payload = new UserInsert(req.body)

    const errors = await validate(payload)
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints ? Object.values(firstError.constraints)[0] : 'Invalid and/or incomplete parameters';
      return res.status(400).json({ msg: errorMessage });
    }

    const { createdUserId, error: createUserError } = await UserService.createUser(payload);
    if (createUserError) return res.status(500).json({ msg: createUserError });
    if (!createdUserId || createdUserId === "") return res.status(404).json({ msg: 'No data found' });

    const { user, error: getUserError } = await UserService.getUserById(createdUserId);
    if (getUserError) return res.status(500).json({ msg: getUserError });
    if (!user) return res.status(404).json({ msg: 'No data found' });

    return res.status(201).json(user);
  }
}
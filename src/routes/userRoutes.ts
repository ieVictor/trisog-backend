import { Router } from "express";
import { UserControler } from "../controllers/userController";
const router = Router();

router.get('/', UserControler.getUsers);
router.get('/:user_id', UserControler.getUserById);

router.post('/', UserControler.createUser);

export default router
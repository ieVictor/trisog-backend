import { Router } from "express";
import { UserControler } from "../controllers/userController";
import { authMiddleware } from "../middlewares/auth";
const router = Router();

router.get('/', authMiddleware, UserControler.getUsers);
router.get('/counter', UserControler.getUsersCounter)
router.get('/:user_id', authMiddleware, UserControler.getUserById);

router.post('/', authMiddleware, UserControler.createUser);

export default router
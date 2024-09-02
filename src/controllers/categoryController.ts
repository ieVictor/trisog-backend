import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

export class CategoryController {
  static async getCategories(req: Request, res: Response): Promise<Response> {
    const { categories, error: getCategoriesError } = await CategoryService.getCategories();
    if (getCategoriesError) return res.status(500).json({ msg: getCategoriesError });
    if (!categories) return res.status(404).json({ msg: 'No data found' });
    return res.status(200).json(categories)
  }
}
import { Router } from "express";
import { CountryController } from "../controllers/countryController";
// import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get('/', CountryController.getCountries);
router.get('/:country_id', CountryController.getCountryById);
router.post('/', CountryController.createCountry);

export default router
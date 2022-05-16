import { application, Router } from "express";
import { methods  as hotelesController } from "../controllers/hoteles.controller.js";

const router = Router();

router.get("/", hotelesController.getHoteles);
router.get("/precio", hotelesController.getHotelesPrecio);
router.get("/precio/asc", hotelesController.getHotelesPrecioAsc);
router.post("/nuevo", hotelesController.postHotel);
router.delete("/:Nombre", hotelesController.deleteHotel);
router.put("/:id", hotelesController.updateHotel);

export default router;
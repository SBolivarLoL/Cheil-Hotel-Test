import { application, Router } from "express";
import { methods  as hotelesController } from "../controllers/hoteles.controller.js";

/* Creating a new instance of the Router class. */
const router = Router();

router.get("/", hotelesController.getHoteles);
router.get("/precio", hotelesController.getHotelesPrecio);
router.get("/precio/desc", hotelesController.getHotelesPrecioDesc);
router.post("/nuevo", hotelesController.postHotel);
router.delete("/:Nombre", hotelesController.deleteHotel);//hay que arreglar para que acepte el id y no el nombre
router.put("/:id", hotelesController.updateHotel);

export default router;
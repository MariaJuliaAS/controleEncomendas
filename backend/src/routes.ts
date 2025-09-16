import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { DetailUserController } from "./controller/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateOrderController } from "./controller/order/CreateOrderController";
import { AddItemController } from "./controller/order/AddItemController";
import { DeleteOrderController } from "./controller/order/DeleteOrderController";
import { DeleteItemController } from "./controller/order/DeleteItemController";
import { EditOrderController } from "./controller/order/EditOrderController";
import { EditItemController } from "./controller/order/EditItemController";
import { ListOrdersController } from "./controller/order/ListOrdersController";
import { ListItensController } from "./controller/order/ListItensController";

const router = Router();

router.post("/users", new CreateUserController().handle)
router.post("/session", new AuthUserController().handle)
router.get("/me", isAuthenticated, new DetailUserController().handle)

router.post("/orders", isAuthenticated, new CreateOrderController().handle)
router.delete("/orders", isAuthenticated, new DeleteOrderController().handle)
router.post("/orders/itens", isAuthenticated, new AddItemController().handle)
router.delete("/orders/itens", isAuthenticated, new DeleteItemController().handle)
router.put("/orders", isAuthenticated, new EditOrderController().handle)
router.put("/orders/itens", isAuthenticated, new EditItemController().handle)
router.get("/orders", isAuthenticated, new ListOrdersController().handle)
router.get("/orders/itens", isAuthenticated, new ListItensController().handle)

export { router }
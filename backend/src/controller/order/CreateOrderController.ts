import { Request, Response } from "express";
import { CreateOrderService } from "../../service/order/CreateOrderService";

class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { name, status, delivery_date, contact, adress, observation } = req.body;
        const createOrderService = new CreateOrderService();
        const order = await createOrderService.execute({ name, status, delivery_date, contact, adress, observation })

        return res.json(order);
    }
}

export { CreateOrderController }
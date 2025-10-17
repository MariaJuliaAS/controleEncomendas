import { Request, Response } from "express";
import { CreateOrderService } from "../../service/order/CreateOrderService";

class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { name, status, delivery_date, contact, adress, observation } = req.body;
        const user_id = req.query.user_id as string;
        const createOrderService = new CreateOrderService();
        const order = await createOrderService.execute({ user_id, name, status, delivery_date, contact, adress, observation })

        return res.json(order);
    }
}

export { CreateOrderController }
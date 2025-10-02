import { Request, Response } from "express";
import { DetailOrderService } from "../../service/order/DetailOrderService";

class DetailOrderController {
    async handle(req: Request, res: Response) {
        const order_id = req.query.order_id as string;
        const order = await new DetailOrderService().execute({ id: order_id });
        return res.json(order);
    }
}

export { DetailOrderController }
import { Request, Response } from "express";
import { ListOrdersService } from "../../service/order/ListOrdersService";

class ListOrdersController {
    async handle(req: Request, res: Response) {
        const order_by = req.query.order_by as string;
        const user_id = req.query.user_id as string;
        const listOrdersService = new ListOrdersService();
        const orders = await listOrdersService.execute({ order_by, user_id });

        return res.json(orders);
    }
}

export { ListOrdersController };
import { Request, Response } from "express";
import { ListOrdersService } from "../../service/order/ListOrdersService";

class ListOrdersController {
    async handle(req: Request, res: Response) {
        const listOrdersService = new ListOrdersService();
        const orders = await listOrdersService.execute();

        return res.json(orders);
    }
}

export { ListOrdersController };
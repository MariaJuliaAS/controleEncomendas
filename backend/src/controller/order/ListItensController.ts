import { Request, Response } from "express";
import { ListItensService } from "../../service/order/ListItensService";

class ListItensController {
    async handle(req: Request, res: Response) {
        const order_id = req.query.order_id as string;

        const listItensService = new ListItensService();
        const itens = await listItensService.execute({ order_id });

        return res.json(itens);
    }
}

export { ListItensController };
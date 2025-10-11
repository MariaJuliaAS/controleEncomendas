import { Request, Response } from 'express';
import { EditOrderSerivce } from '../../service/order/EditOrderSerivce';

class EditOrderController {
    async handle(req: Request, res: Response) {
        const { name, status, delivery_date, contact, adress, observation } = req.body;
        const order_id = req.query.order_id as string;
        const editOrderService = new EditOrderSerivce();
        const order = await editOrderService.execute({ order_id, name, status, delivery_date, contact, adress, observation });

        return res.json(order);
    }
}

export { EditOrderController }
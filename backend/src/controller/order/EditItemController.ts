import { Request, Response } from "express";
import { EditItemService } from "../../service/order/EditItemService";

class EditItemController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;
        const item_id = req.query.item_id as string;

        const editItemService = new EditItemService();
        const item = await editItemService.execute({ item_id, name });

        return res.json(item);
    }
}

export { EditItemController };
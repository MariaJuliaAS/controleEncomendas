"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditItemController = void 0;
const EditItemService_1 = require("../../service/order/EditItemService");
class EditItemController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nameItem } = req.body;
            const item_id = req.query.item_id;
            const editItemService = new EditItemService_1.EditItemService();
            const item = yield editItemService.execute({ item_id, nameItem });
            return res.json(item);
        });
    }
}
exports.EditItemController = EditItemController;

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
exports.EditOrderController = void 0;
const EditOrderSerivce_1 = require("../../service/order/EditOrderSerivce");
class EditOrderController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, status, delivery_date, contact, adress, observation } = req.body;
            const order_id = req.query.order_id;
            const editOrderService = new EditOrderSerivce_1.EditOrderSerivce();
            const order = yield editOrderService.execute({ order_id, name, status, delivery_date, contact, adress, observation });
            return res.json(order);
        });
    }
}
exports.EditOrderController = EditOrderController;

import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    nameItem: string
}

class AddItemService {
    async execute({ order_id, nameItem }: ItemRequest) {
        const item = await prismaClient.iten.create({
            data: {
                order_id: order_id,
                nameItem: nameItem
            }
        })

        return item;
    }
}

export { AddItemService }
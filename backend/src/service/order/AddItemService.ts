import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    name: string
}

class AddItemService {
    async execute({ order_id, name }: ItemRequest) {
        const item = await prismaClient.iten.create({
            data: {
                order_id: order_id,
                name: name
            }
        })

        return item;
    }
}

export { AddItemService }
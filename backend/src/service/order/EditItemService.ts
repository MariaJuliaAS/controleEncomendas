import prismaClient from "../../prisma";

interface ItemRequest {
    item_id: string;
    name: string;
}

class EditItemService {
    async execute({ item_id, name }: ItemRequest) {
        const item = await prismaClient.iten.update({
            where: {
                id: item_id
            },
            data: {
                name
            }
        })

        return item;
    }
}

export { EditItemService }
import prismaClient from "../../prisma";

interface ItemRequest {
    item_id: string;
    nameItem: string;
}

class EditItemService {
    async execute({ item_id, nameItem }: ItemRequest) {
        const item = await prismaClient.iten.update({
            where: {
                id: item_id
            },
            data: {
                nameItem
            }
        })

        return item;
    }
}

export { EditItemService }
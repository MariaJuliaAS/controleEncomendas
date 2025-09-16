import prismaClient from "../../prisma";

interface ItensRequest {
    order_id: string;
}

class ListItensService {
    async execute({ order_id }: ItensRequest) {
        const item = await prismaClient.iten.findMany({
            where: {
                order_id: order_id
            }
        })

        return item;
    }
}

export { ListItensService };
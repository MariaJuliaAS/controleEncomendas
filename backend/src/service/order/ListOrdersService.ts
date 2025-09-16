import prismaClient from "../../prisma";

class ListOrdersService {
    async execute() {
        const orders = await prismaClient.order.findMany({
            orderBy: {
                created_at: 'desc'
            },
            include: {
                itens: true
            }
        })

        return orders;
    }
}

export { ListOrdersService }
import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class DeleteOrderService {
    async execute({ order_id }: OrderRequest) {
        await prismaClient.iten.deleteMany({
            where: {
                order_id: order_id
            }
        })

        const order = await prismaClient.order.delete({
            where: {
                id: order_id
            }
        })

        return order;
    }
}

export { DeleteOrderService }
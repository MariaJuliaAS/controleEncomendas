import prismaClient from "../../prisma";

interface ListOrderProps {
    order_by: string;
}

class ListOrdersService {
    async execute({ order_by }: ListOrderProps) {
        const orders = await prismaClient.order.findMany({
            orderBy: {
                created_at: order_by === "desc" ? "desc" : "asc",
            },
            include: {
                itens: true
            }
        })

        return orders;
    }
}

export { ListOrdersService }
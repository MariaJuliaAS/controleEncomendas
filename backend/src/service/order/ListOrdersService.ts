import prismaClient from "../../prisma";

interface ListOrderProps {
    order_by: string;
    user_id: string;
}

class ListOrdersService {
    async execute({ order_by, user_id }: ListOrderProps) {
        const orders = await prismaClient.order.findMany({
            where: {
                user_id: user_id
            },
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
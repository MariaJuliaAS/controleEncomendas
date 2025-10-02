import prismaClient from "../../prisma";

interface OrderRequest {
    id: string;
}


class DetailOrderService {
    async execute({ id }: OrderRequest) {
        const order = await prismaClient.order.findFirst({
            where: {
                id: id
            },
            include: {
                itens: true
            }
        })

        return order
    }
}

export { DetailOrderService }
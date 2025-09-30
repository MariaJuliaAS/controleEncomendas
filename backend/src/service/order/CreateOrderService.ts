import prismaClient from "../../prisma";

interface OrderRequest {
    name: string;
    status: string;
    delivery_date?: string;
    contact?: string;
    adress?: string;
    observation?: string;
}

class CreateOrderService {
    async execute({ name, status, delivery_date, contact, adress, observation }: OrderRequest) {
        const order = await prismaClient.order.create({
            data: {
                name,
                status,
                delivery_date,
                contact,
                adress,
                observation,
            }
        })

        return order;
    }
}

export { CreateOrderService }
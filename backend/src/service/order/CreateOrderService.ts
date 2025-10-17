import prismaClient from "../../prisma";

interface OrderRequest {
    user_id: string;
    name: string;
    status: string;
    delivery_date?: string;
    contact?: string;
    adress?: string;
    observation?: string;
}

class CreateOrderService {
    async execute({ user_id, name, status, delivery_date, contact, adress, observation }: OrderRequest) {
        const order = await prismaClient.order.create({
            data: {
                user_id,
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
import prismaClient from "../../prisma";

interface OrderRequest {
    name: string;
    status: string;
    delivery_date?: string;
    contact?: string;
    adress?: string;
    observation?: string;
    payment_type?: string;
    value?: string;
}

class CreateOrderService {
    async execute({ name, status, delivery_date, contact, adress, observation, payment_type, value }: OrderRequest) {
        const order = await prismaClient.order.create({
            data: {
                name,
                status,
                delivery_date,
                contact,
                adress,
                observation,
                payment_type,
                value
            }
        })

        return order;
    }
}

export { CreateOrderService }
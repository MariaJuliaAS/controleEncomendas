import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
    name: string;
    status: string;
    delivery_date: string;
    contact: string;
    adress: string;
    observation: string;
    payment_type: string;
    value: string;
}

class EditOrderSerivce {
    async execute({ order_id, name, status, delivery_date, contact, adress, observation, payment_type, value }: OrderRequest) {
        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
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

export { EditOrderSerivce }
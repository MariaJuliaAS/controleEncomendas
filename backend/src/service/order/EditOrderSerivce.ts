import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
    name: string;
    status: string;
    delivery_date: string;
    contact: string;
    adress: string;
    observation: string;
}

class EditOrderSerivce {
    async execute({ order_id, name, status, delivery_date, contact, adress, observation }: OrderRequest) {
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
            }
        })

        return order;
    }
}

export { EditOrderSerivce }
import {axiosClientJson}  from "../axiosClient";
import { Ticket } from "@/constants/DBDatatypes";

const ticketApi = {
    getTicket: (id: number) => axiosClientJson.get(`/tickets/${id}`),
    getTicketExtended: (id: number) => axiosClientJson.get(`/tickets/${id}/extended`),
    getTicketS: () => axiosClientJson.get('/tickets'),
    getTicketsShop: (id: number) => axiosClientJson.get(`/tickets/buy/${id}`)
    //spot: (data: Ticket) => axiosClientJson.post('/spots',data),

}

export default ticketApi
import {axiosClientJson}  from "../axiosClient";
import { Ticket } from "@/constants/DBDatatypes";

const ticketApi = {
    getTicket:(id: number) => axiosClientJson.get(`/tickets/${id}`),
    getTicketS: () => axiosClientJson.get('/tickets') 
    //spot: (data: Ticket) => axiosClientJson.post('/spots',data),

}

export default ticketApi
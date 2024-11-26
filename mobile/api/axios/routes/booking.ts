import { Booking, BookingExtended } from "@/constants/DBDatatypes";
import {axiosClient, axiosClientJson}  from "../axiosClient";

const bookingApi = {
    bookings: (data: Booking) => axiosClientJson.post('/bookings',data),
    getBoughtTickets: () => axiosClientJson.get('/bookings/bought_tickets'),
    bookingOrder: (data: BookingExtended) => axiosClientJson.post('/bookings/order', data) 
}


export default bookingApi
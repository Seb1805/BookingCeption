import {axiosClient, axiosClientJson}  from "../axiosClient";
import { Location } from "@/constants/DBDatatypes";

const locationApi = {
    location: (data: Location) => axiosClientJson.post('/locations',data),
    getLocations: () => axiosClientJson.get('/locations') 
}


export default locationApi
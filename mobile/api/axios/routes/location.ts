import {axiosClientJson}  from "../axiosClient";
import { Location } from "@/constants/DBDatatypes";

const locationApi = {
    location: (data: Location) => axiosClientJson.post('/locations',data),
    getLocations: () => axiosClientJson.get('/locations'),
    getMyLocations: () => axiosClientJson.get('/locations/me')
}


export default locationApi
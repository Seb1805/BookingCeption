import {axiosClientJson}  from "../axiosClient";
import { Location } from "@/constants/DBDatatypes";

const locationApi = {
    location: (data: Location) => axiosClientJson.post('/locations',data)

}


export default locationApi
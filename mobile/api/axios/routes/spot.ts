import {axiosClientJson}  from "../axiosClient";
import { Spot } from "@/constants/DBDatatypes";

const spotApi = {
    spot: (data: Spot) => axiosClientJson.post('/sections',data),

}

export default spotApi
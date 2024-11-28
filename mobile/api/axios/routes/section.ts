import {axiosClientJson}  from "../axiosClient";
import { Section } from "@/constants/DBDatatypes";

const sectionApi = {
    section: (data: Section) => axiosClientJson.post('/sections',data),
    getSections:() => axiosClientJson.get('/sections')
}

export default sectionApi
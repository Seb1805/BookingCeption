import {axiosClientJson}  from "../axiosClient";
import { Section } from "@/constants/DBDatatypes";

const sectionApi = {
    section: (data: Section) => axiosClientJson.post('/spots',data),

}

export default sectionApi
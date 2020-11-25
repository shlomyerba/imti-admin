import axios from "axios";
import VueCookies from "vue-cookies";
import { baseUrl } from "./url";

export async function getAllEvents() {
    let token = await VueCookies.get("token");
    let url = `${baseUrl}/admin/report/event/all?uuid=${token}`;
    try {
        let response = await axios.get(url);
        if (response.data) {
            console.log(response.data);
            return response.data;
        }
    } catch (e) {
        console.log("e", e);
    }
}
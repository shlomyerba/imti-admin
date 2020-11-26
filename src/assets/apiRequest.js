import axios from "axios";
import VueCookies from "vue-cookies";
import { baseUrl } from "./url";


export async function generalGetRequest(url) {
    try {
        let response = await axios.get(url);
        if (response.data) {
            console.log(response.data);
            return response.data;
        }
    } catch (e) {
        console.log("e", e);
        return null;
    }
}

export async function generalPostRequest(url, formData) {
    try {
        let response = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/mixed; boundary=gc0p4Jq0M2Yt08jU534c0p",
            },
        });
        console.log("response", response);
    } catch (e) {
        console.log("e", e);
    }
}

export async function getAllEvents() {
    let token = await VueCookies.get("token");
    let url = `${baseUrl}/admin/report/event/all?uuid=${token}`;
    return await generalGetRequest(url);
}

export async function getAllParties() {
    let token = await VueCookies.get("token");
    let url = `${baseUrl}/admin/report/party/all?uuid=${token}`;
    return await generalGetRequest(url);
}


export async function getAllMks() {
    let token = await VueCookies.get("token");
    let url = `${baseUrl}/admin/report/mk/all?imageIncluded=false&uuid=${token}`;
    return await generalGetRequest(url);
}


export async function getAllUsers() {
    let token = VueCookies.get("token");
    let url = `${baseUrl}/admin/report/user/all?uuid=${token}`;
    return await generalGetRequest(url);
}
import axios from 'axios'
import { MAIN_URL } from './Url'
let token = localStorage.getItem('_token');

export function getPosts() {
    return axios.get(`${MAIN_URL}fetchpost`);
}
export function getProduct() {
    return axios.get(`${MAIN_URL}fetchproduct`);
}

export function getcategory(category_id, color_id) {
    return axios.get(`${MAIN_URL}getcategory/${category_id}&&${color_id}`);
}
export function getchangepassword(data) {
    return axios.put(`${MAIN_URL}changepassword`, data);
}
// export function updateProfile(id, data) {
//     console.log(data)
//     return axios.put(`${MAIN_URL}updateprofile/${id}`, data);

// }
export function getEmail(data) {
    return axios.post(`${MAIN_URL}forgetemail`, data);
}
export function getMulter(data, user) {
    return axios.post(`${MAIN_URL}user-profile/${user}`, data);
}
export function getImage(user) {
    return axios.get(`${MAIN_URL}getmulter/${user}`);
}
// export function getProfile(email) {
//     return axios.get(`${MAIN_URL}profile/${email}`);
// }
export function getsingleproduct(data) {
    return axios.get(`${MAIN_URL}singleproduct/` + data);
}

export function addOrders() {
    return axios.post(`${MAIN_URL}addorder`);
}
export function addUser(data) {
    return axios.post(`${MAIN_URL}adduser`, data);
}

export function login(data) {
    return axios.post(`${MAIN_URL}login`, data);
}
// export function deletePosts(){
//     return axios.post(`${MAIN_URL}posts/deletepost/:id`);
// }
export function StarRating(id, data) {
    console.log(data);
    return axios.put(`${MAIN_URL}Rating/${id}`, data);
}
//profile fileds
export function addAddress(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}addaddress`, data)
}
export function editAddress(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}editaddress`, data)
}
export function deleteAddr(email) {
    return axios.delete(`${MAIN_URL}deleteadd/${email}`);
}

export function updProfile(id, data) {
    console.log(data)
    return axios.put(`${MAIN_URL}updprofile/${id}`, data);

}
//my account getprofile
export function getProfile(email) {
    return axios.get(`${MAIN_URL}profile/${email}`, {
        headers: { "authorization": `Bearer ${token}` }
    });
}//get address
export function getaddress1(email) {
    return axios.get(`${MAIN_URL}getaddress/${email}`, {
        headers: { "authorization": `Bearer ${token}` }
    });
}

export function changePass(id, data) {
    return axios.put(`${MAIN_URL}changepass/${id}`, data);
}
//get orderdata
export function getOrderdata(email) {
    return axios.get(`${MAIN_URL}getorder/${email}`);
}
//checkout
export function createOrders(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}carddetails`, data)
}//checkout address
export function cardaddress(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}cardaddress`, data)
}
export function authentication(token) {
    return axios.get(`${MAIN_URL}loginfirst`, {
        headers: { "authorization": `Bearer ${token}` }
    });
}
//get invoice
export function getinvoice(orderno) {
    return axios.get(`${MAIN_URL}getinvoice/${orderno}`, {
        headers: { "authorization": `Bearer ${token}` }
    });
}
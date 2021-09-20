import { CUSTOMER_SIGNUP, OWNER_SIGNUP } from "./userTypes";
import endPointObj from '../endPointUrl.js';
import axios from "axios";

export const customerSignup = (customerData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(endPointObj.url + 'custRegister', customerData)
        .then(response => dispatch({
            type: CUSTOMER_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: CUSTOMER_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}
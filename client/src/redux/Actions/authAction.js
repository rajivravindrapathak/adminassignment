// Actions/authAction.js

import * as actionTypes from "../actionTypes";

export const onLogin = (payload) => ({
    type: actionTypes.ON_LOGIN,
    payload,
});

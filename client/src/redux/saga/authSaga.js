// saga/authSaga.js

import { takeEvery, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { postRequest } from '../../utils/apiRequests';
import { admin_login, api_url, base_url } from "../../utils/Constants";
import { useHistory } from "react-router-dom"; // Import useHistory hook


function* onLogin(actions) {
    console.log("On Login Saga")
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log("payload", payload)
        const response = yield postRequest({
            url: base_url + admin_login,
            data: {
                username: payload.username,
                password: payload.password
            }
        })
        console.log("response", response)
        if (response && response.status) {
            yield put({ type: actionTypes.LOGIN_SUCCESS, payload: response.user });
            // localStorage.setItem("result", JSON.stringify(response.user)); // Save user details in localStorage
            localStorage.setItem("token", response.result);
            yield call(payload?.onComplete)
            return true;
        } else {
            yield put({ type: actionTypes.LOGIN_FAILURE, payload: response?.message || "Login failed" });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('hii', e);
    }
}



export default function* authSaga() {
    yield takeLeading(actionTypes.ON_LOGIN, onLogin);
}
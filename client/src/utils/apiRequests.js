// utils/apiRequest.js page


import axios from "axios";

export const postRequest = async ({ url = null, data = null, header = 'json' }) => {
    try {
        const response = await axios({
            method: 'post',
            url: url,
            headers: {
                'Content-Type': header == 'json' ? 'application/json' : 'multipart/form-data'
            },
            data: data
        })

        if (response.data) {
            return response.data
        }
        return null

    } catch (e) {
        console.log(e)
        return null
    }
}

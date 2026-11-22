import {Template} from "../../../Template";

var axios = require('axios');



axios({
    method: 'get',
    maxBodyLength: Infinity,
    url: `${Template.baseUrl}/api/pricePlans`,
    headers: {
        'x-api-key': '1234',
        'Accept': 'application/json',
        'Authorization': Template.token,
    }}).then(function (response: { data: any; }) {


    console.log(JSON.stringify(response.data));








})
    .catch(function (error: any) {
        console.log(error);
    });


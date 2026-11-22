import {Config} from "../../../Config";
import {Template} from "../../../Template";


var axios = require('axios');


const baseUrl=process.env.BASE_URL!;
var config = {
    method: 'get',
    maxBodyLength: Infinity,

    url: `${Template.baseUrl}/api/pricePlans`,
    headers: {
        'x-api-key': '1234',
        'Accept': 'application/json',
        'Authorization': Config.token,
    }
};

axios(config)
    .then(function (response: { data: any; }) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error: any) {
        console.log(error);
    });

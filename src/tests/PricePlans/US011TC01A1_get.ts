import axios from 'axios';
import {Config} from "../../../Config";


axios.request({
    method: 'get',
    url: 'https://qa.instulearn.com/api/pricePlans',
    headers: {
        'x-api-key': Config.apiKey,
        'Accept': Config.accept,
        'Authorization': Config.token
    }
})
    .then(response => {
        const data = response.data.data; // array

        // Tüm ID'leri çek
        const ids = data.map((item: any) => item.id);
        console.log('Tüm ID\'ler:', ids);

        // Max ve Min ID
        const maxId = Math.max(...ids);
        const minId = Math.min(...ids);
        console.log('Max ID:', maxId);
        console.log('Min ID:', minId);
    })
    .catch((error) => {
        console.log(error);
    });














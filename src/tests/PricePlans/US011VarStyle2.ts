var request = require('request');
var options = {
    'method': 'GET',
    'url': 'https://qa.instulearn.com/api/pricePlans',
    'headers': {
        'x-api-key': '1234',
        'Accept': 'application/json',
        'Authorization': 'Bearer 34510|yDrNx0Ld71BJAz7BEPQjYQ7R8TAGDY0IzpsX61CU'
    }
};
request(options, function (error: string | undefined, response: { body: any; }) {
    if (error) throw new Error(error);
    console.log(response.body);
});

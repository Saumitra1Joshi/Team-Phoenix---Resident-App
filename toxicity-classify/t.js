const {google} = require('googleapis');

        API_KEY = 'AIzaSyDvG3vlovfaGB-ZxN27LHIIFbuzIRr6sz0';
        DISCOVERY_URL =
            'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

        google.discoverAPI(DISCOVERY_URL)
         .then(client => {
                const analyzeRequest = {
                comment: {
                text: "Trump is an idiot",
                },
                requestedAttributes: {
                TOXICITY: {},
                },
            };

        client.comments.analyze(
          {
            key: API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            if(response.data.attributeScores.TOXICITY.spanScores[0].score.value>0.45){
                console.log("true")
            }
            else {
                console.log("false")
            }
          });
     })
    .catch(err => {
      throw err;
    });
    
var request = require('request');   // install request module by - 'npm install request'
var querystring = require('querystring')

const form_data = {
    'modelId' : 'e4745b0e-70fb-447e-8870-61566137c8ab',
    'urls': 'https://miro.medium.com/max/875/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
}

const options = {
    url : 'https://app.nanonets.com/api/v2/ImageCategorization/LabelUrls/',
    body: querystring.stringify(form_data),
    headers: {
        'Authorization' : 'Basic ' + Buffer.from('-haYmFRR1siZGxd6GqF0fB3frdMLXqV5' + ':').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
request.post(options, function(err, httpResponse, body) {
    console.log(body);
    body = JSON.parse(body)
    console.log(body.result[0].prediction[0].probability)
});

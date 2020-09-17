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
    
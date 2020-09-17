const express = require('express');
const router = express.Router();

router.get('/currloc', function(req, res) {
      db.collection('posts').aggregate([
      { 
            "$geoNear": {
                "near": {
                     "type": "Point",
                     "coordinates": [parseFloat(req.params.lng), parseFloat(req.params.lat)]
                 },
                 "distanceField": "distance",
                 "maxDistance": 1000,
                 "spherical": true,
                 "query": { "loc.type": "Point" }
             }
        },
        { 
             "$sort": {"distance": -1}
        } 
    ],
    function(err, docs) {
         res.json(docs);       
    });      
});
const fs = require('fs');

fs.open('./data/data.json', 'utf-8', function(err, data){
    if(err) console.log(err);
    console.log(data);
});
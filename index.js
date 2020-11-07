const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require("fs");

const urls = require('./db/urls');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('./public'));

//var data = fs.readFileSync('input.txt');
//console.log("data: " + data.toString());

var sites = { "name":"runoob" , "url":"https://www.runoob.com" }//JSON.parse(data.toString());

app.get('/:name', (req, res) => {

    const puny = sites.hasOwnProperty(req.params.name);

        if (puny) {
            res.redirect(sites[req.params.name]);
        } else { 
            res.redirect(`/404.html?name=${req.params.name}`);
        }


});

app.post('/api/puny', (req, res) => {
  console.log(req.body);
  try {
      const puny = sites.hasOwnProperty(req.body.name);
      console.log(req.body.name);
      if (puny) {
          res.status(500);
          err = {"err":"Name has been used!"}
          res.json(err);
      } else { 
          sites[req.body.name]=req.body.url;
          //var last = JSON.stringify(sites);
          //fs.writeFile('input.txt',last,  function(err) {
              //if (err) {
                 // return console.error(err);
            //  }
            //  console.log("write ok!");
         // });


          res.json(req.body.url);
      }

  } catch (error) {
    res.status(500);
    res.json(error);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
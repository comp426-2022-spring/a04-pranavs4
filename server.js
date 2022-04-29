// Require Express.js

const express = require('express');
const app = express();
const args = require('minimist')(process.argv.slice(2))
args['port']
const HTTP_PORT = args.port ? args.port : 5000;

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage);
    
});

app.get('/app/flip/', (req, res) => {
    res.status(200).json({'flip' : coinFlip()});
    res.writeHead(res.statusCode, {'Content-Type' : 'application/json'});
});

// app.get('app/flip/', (req,res) => {
//     const flip = coinFlip();
//     res.statusCode = 200;
//     res.json({"flip" : flip});
// });

// app.get('app/flip/', (req,res) => {
//     res.statusCode(200).json({"flip" : coinFlip()});
// })

app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number);
    const summary = countFlips(flips);
    res.statusCode = 200;
    res.json({"raw" : flips, "summary" : summary});
   //res.statusCode(200).json({"raw": flips, "summary": summary});
});

// app.get('/app/flip/call/:call', (req,res) => {
//     const output = flipACoin(req.params.call);

//     // var heads1 = flipACoin("heads");
//     res.statusCode = 200;
//     res.json(output);
// });

app.get('/app/flip/call/heads', (req,res) => {
    var heads = flipACoin("heads");
    res.statusCode = 200;
    res.json(heads);
});

app.get('/app/flip/call/tails', (req,res) => {
    var tails = flipACoin("tails");
    res.statusCode = 200;
    res.json(tails);
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).end('Endpoint does not exist');
    res.type("text/plain");
});

/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

 function coinFlip() {

    // let flip = Math.random();
    // // var outcome = "";
    // if (flip > 0.5) {
    //   // outcome =  "heads";
    //   return "heads";
    // }
    // else {
    //   // outcome = "tails";
    //   return "tails";
    // }
    // // return outcome;
    // let random = Math.random * 2;
    // return random >=1 ? "heads" : "tails";
    return (Math.random() < 0.5 ? ("tails") : ("heads"));  
  }
  
  //console.log(coinFlip))
  
  /** Multiple coin flips
   */
  
  function coinFlips(flips) {
  
    let flipArray = [];
  
    for(var x = 0; x < flips; x++) {
    //   let flip1 = Math.random();
    //   if(flip1 < 0.5){
    //     flipArray[x] = "heads"
    //   } else {
    //     flipArray[x] = "tails"
    //   } 
    // }
    // return flipArray
      flipArray[x] = coinFlip();
    }
  
    return flipArray;
  
  }
  
  /** Count multiple flips
   */
  
  function countFlips(array) {
  
    // var headCount = 0; 
    // var tailCount = 0;
  
    // for(var x = 0; x < array.length; x++) {
    //   if(array[x] == "tails"){
    //     tailCount ++;
    //   } else {
    //     headCount ++;
    //   }
    // }
    // return {
    //   "heads": headCount,
    //   "tails": tailCount
    // }

    let heads = 0;
    let tails = 0;

    for(var x = 0; x < array.length; x++){
        array[x] == "heads" ? heads++ : tails++
    }
    if(tails == 0) {
        return {
            heads : heads
        };
    } else if(heads == 0) {
        return {
            tails : tails
        };
    } else {
        return {
            heads: heads, tails: tails
        };
    }
  }
  
  /** Flip a coin!
    */
  
  function flipACoin(call) {
  
    // var results = coinFlip();
    // if(results == call) {
    //   return{ call:call, flip: results, results : "win"}
    // }
    // else {
    //   return{call:call, flip:results, results:"lose"}
    // };

    let results = {call: call, flip: "", result: ""};
    results.flip = coinFlip();
    results.result = results.flip === call ? "win" : "lose";
    return results; 
  }


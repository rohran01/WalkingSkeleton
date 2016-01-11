var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var router = express.Router();

mongoose.connect('mongodb://localhost:WalkingSkeleton');

var Cat = mongoose.model('Cat', {name:String});

router.post('/add', function(request, response, next) {
    console.log('router request received ', request.data);
    var kitty = new Cat({name:request.body.name});
    console.log('router kitty ', kitty);
    kitty.save(function(err) {
        if(err)console.log('meeeeow: ', err);
        response.send(kitty.toJSON());
        next();
    })
});

router.get('/cats', function(request, response, next) {
    return Cat.find({}).exec(function(err, cats) {
        if(err)throw new Error(err);
        response.send(JSON.stringify(cats));
        next();
    })
});

// I tried to add a delete function, but it wasn't working :'(

//router.delete('/remove', function(request, response, next) {
//    console.log(request.name);
//   //return Cat.find(request).exec(function(err, kitty) {
//   //    if(err)console.log('meeeeow: ', err);
//   //    request.delete(kitty);
//   //    next();
//   //});
//});

router.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
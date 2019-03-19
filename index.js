const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var jsondata = require('./movies.json');
var _und = require('underscore');
app.use(bodyParser.urlencoded({extended: true}));//insert post
app.use(bodyParser.json());
const port = 8080;
var router = express.Router();

router.get('/',function(req,res){
    res.json(jsondata);
})

router.post('/postdata',function(req,res){
    //console.log(req.body);
    if (req.body.title && req.body.id){
        jsondata.push(req.body);
        res.json(jsondata);
    }else{
            console.log("insert data");
    }
})
router.put('/update/:id',function(req,res){
    console.log(req.body);
    if (req.params.id){
        _und.each(jsondata,function(elem,index){
            if(req.params.id === elem.id){
                elem.title = "njfd";
            }
        }) 
        res.json(jsondata);
    }else{
            console.log("invalide request");
    }
})
router.delete('/deletedata/:id',function(req,res){
    getindextodelete = -1; 
    if (req.params.id){
        _und.each(jsondata,function(elem,index){
            if(elem.id === req.params.id){
                getindextodelete = index;
            }
        }) 
        if(getindextodelete > -1){
            jsondata.splice(getindextodelete,1);
        }
        res.json(jsondata);
    }else{
            console.log("invalide request");
    }
})

app.use('/api',router);
app.listen(port);

//importing express
const express = require('express');
// creating server
const bodyParser = require('body-parser');
const server=express();
const port=5000;
server.use(bodyParser.json());
const item=[{id:1,name:"jeans"},{id:2,name:"shirt"
    },{
        id:3,
        name:"t-shirt"
    }
];
server.get('/',(req,res)=>{
    res.send('Server is running');
});
server.get('/products',(req,res)=>{
    res.send(item);
}
);
//server.post('/products',(req,res)=>{
//    item.push({id:4,name:"shoes"});
//   res.send(item);
//}
//                                                                              );
server.post('/products',(req,res)=>{
    item.push({id:item.length+1,name:req.body.name});
    res.status(201).send(item);
});
server.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
});
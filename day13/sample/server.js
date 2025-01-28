// Importing express
const express = require('express');
// Creating server
const bodyParser = require('body-parser');
const server = express();
const port = 5000;

server.use(bodyParser.json());

const item = [
    { id: 1, name: "jeans" },
    { id: 2, name: "shirt" },
    { id: 3, name: "t-shirt" }
];

server.get('/', (req, res) => {
    res.send('Server is running');
});

server.get('/products', (req, res) => {
    res.send(item);
});

server.post('/products', (req, res) => {
    item.push({ id: item.length + 1, name: req.body.name });
    res.status(201).send(item);
});

server.delete('/products/:id', (req, res) => {
    const itemid = parseInt(req.params.id);
    const itemIndex = item.findIndex((item) => item.id === itemid);
    if (itemIndex !== -1) {
        const deletedItem = item.splice(itemIndex, 1);
        res.json(deletedItem);
    } else {
        res.status(404).send('Item not found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
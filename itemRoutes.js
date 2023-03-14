const express = require("express");
const router = new express.Router();
const cart = require('./fakeDb');
const ExpressError = require('./error');


router.get('/', function(req, res) {
    res.json({cart})
});

router.post('/', function(req, res) {
    const newItem = { name: req.body.name, 
    price: req.body.price }
    cart.push(newItem)
    res.status(201).json({ item: newItem })
})

router.get('/:name', function(req, res) {
    const findItem = cart.find(item => cart.name === req.params.name)
    if(findItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    res.json({ item: findItem })
})

router.pathc('/:name', function(req, res) {
    const findItem = cart.find(item => cart.name === req.params.name)
    if(findItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    findItem.name = req.body.name
    res.json({ item: findItem })
})

router.delete('/:name', function(req, res) {
    const findItem = cart.findIdex(item => cart.name === req.params.name)
    if(findItem === -1) {
        throw new ExpressError("Item not found", 404)
    }
    cart.splice(findItem, 1)
    res.json({message: "Deleted"})
})

module.exports = router;
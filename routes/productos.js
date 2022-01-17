var express = require('express');
var router = express.Router();

const Producto = require('../Producto');

let productos = []

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(201).send(productos)
});

router.get('/:id', function(req, res, next) {
    const objError = {"error": "producto no encontrado"} 
    const find = productos.find(producto => producto.id == req.params.id) || objError;
    res.status(201).send(find)
});

router.post('/', function(req, res, next) {
    if (req.body.titulo !== undefined && req.body.precio !== undefined && req.body.thumbnail !== undefined) {
        let obj = new Producto.Producto(req.body.titulo, req.body.precio, req.body.thumbnail)

        let idMasAlto = 0;

        if (productos.length > 0) {
            idMasAlto = productos.reduce((acum, proximo) => acum > proximo.id ? acum : proximo.id, 0);
        }
        obj.id = parseInt(idMasAlto) + 1

        productos.push(obj);

        res.status(201).send(obj);
    }
    else{
        res.status(400).send({error: "datos incorrectos"})
    }
});

router.put('/:id', function(req, res, next) {
    const objError = {"error": "producto no encontrado"} 
    const find = productos.find(producto => producto.id == req.params.id) || objError;
    if(find !== objError){
        find.titulo = req.body.titulo;
        find.precio = req.body.precio;
        find.thumbnail = req.body.thumbnail;
    }
    res.status(201).send(find)
});

router.delete('/:id', function(req, res, next) {
    const objError = {"error": "producto no encontrado"} 
    const find = productos.find(producto => producto.id == req.params.id) || objError;
    if(find !== objError){
        productos = productos.filter(producto => producto.id != req.params.id);
        
        res.status(201).send(productos)
    }else{
        res.status(201).send(find)
    }
    
});
module.exports = router;
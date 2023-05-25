import { Router } from "express";
import ProductManagerMongo from "../Dao/managers/productManagerMongo.js";
import productModel from "../Dao/models/products.model.js";

const router = Router();

const productManagerMongo = new ProductManagerMongo();

router.get('/', (req, res)=>{
    try{
        res.status(200).render('admin', {user: req.session.user});
    }catch(err){
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});

export default router;
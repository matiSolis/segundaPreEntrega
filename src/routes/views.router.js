import { Router } from "express";
import ViewsManagerMongo from "../Dao/managers/viewsManagerMongo.js";

const router = Router();

router.get('/', async (req, res) => {
        await ViewsManagerMongo.homeRender(req, res);
    });
    router.get('/carts/:cid', async (req, res) => {
        await ViewsManagerMongo.cartRender(req, res);
    });
    router.get('/product/:pid', async (req, res) => {
        await ViewsManagerMongo.productRender(req, res);
    });
    router.get('/products', async (req, res) => {
        await ViewsManagerMongo.productsRender(req, res);
    });


export default router;


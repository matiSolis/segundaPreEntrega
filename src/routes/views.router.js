import { Router } from "express";
import productModel from "../Dao/models/products.model.js";
import ViewsManagerMongo from "../Dao/managers/viewsManagerMongo.js";

const router = Router();

const adminSession = (req, res, next) => {
    if(req.session.user.role !== 'Admin'){
        return res.status(403).send({error: { status:403, message:'Access denied.'}})
    };
    next();
};
const publicAcces = (req,res,next) =>{
    if(req.session.user) return res.redirect('/profile');
    next();
};
const privateAcces = (req,res,next)=>{
    if(!req.session.user) return res.redirect('/login');
    next();
};
//router admin
router.get('/', privateAcces, async (req, res) => {
        if(req.session.user.role ==='Admin'){
            return res.redirect('/admin');
        }else{
            await ViewsManagerMongo.homeRender(req, res);
        };
    });
router.get('/admin', adminSession, async (req, res) => {
        try {
            const products = await productModel.find().lean();
            res.render('admin', { user: req.session.user, products });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: 'Error',
                msg: 'Error del servidor.',
            });
        };
    });
//router profile lo ven todos admin o user
router.get('/profile', privateAcces ,(req,res)=>{
        res.render('profile',{
            user: req.session.user
        });
    });
//router users
router.get('/carts/:cid', privateAcces, async (req, res) => {
        await ViewsManagerMongo.cartRender(req, res);
    });
router.get('/product/:pid', privateAcces, async (req, res) => {
        await ViewsManagerMongo.productRender(req, res);
    });
router.get('/products', privateAcces, async (req, res) => {
        await ViewsManagerMongo.productsRender(req, res);
    });
//router registro y logueo
router.get('/register', publicAcces, (req,res)=>{
        res.render('register');
    });
router.get('/login', publicAcces, (req,res)=>{
        res.render('login');
    });


export default router;


import { Router } from "express";
import ViewsManagerMongo from "../Dao/managers/viewsManagerMongo.js";

const router = Router();


const publicAcces = (req,res,next) =>{
    if(req.session.user) return res.redirect('/');
    next();
}

const privateAcces = (req,res,next)=>{
    if(!req.session.user) return res.redirect('/login');
    next();
}

const adminSession = (req, res, next) => {
    if(!req.session.user || req.session.user.role !== 'admin'){
        return res.redirect('/login');
    }
    next();
};

router.get('/admin', adminSession, async (req, res) => {
    // await ViewsManagerMongo.productRender(req, res);
    res.render('admin', { user: req.session.user});
});
router.get('/', privateAcces, async (req, res) => {
        await ViewsManagerMongo.homeRender(req, res);
    });
router.get('/carts/:cid', privateAcces, async (req, res) => {
        await ViewsManagerMongo.cartRender(req, res);
    });
router.get('/product/:pid', privateAcces, async (req, res) => {
        await ViewsManagerMongo.productRender(req, res);
    });
router.get('/products', privateAcces, async (req, res) => {
        await ViewsManagerMongo.productsRender(req, res);
    });
router.get('/profile', privateAcces ,(req,res)=>{
        res.render('profile',{
            user: req.session.user
        });
    });
router.get('/register', publicAcces, (req,res)=>{
        res.render('register');
    });
router.get('/login', publicAcces, (req,res)=>{
        res.render('login');
    });


export default router;


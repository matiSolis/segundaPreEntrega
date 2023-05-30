import { Router } from "express";
import ManagerAcces from "../Dao/managers/managerAccess.js";
import passport from "passport";

const router = Router();
const managerAccess = new ManagerAcces();

router.post('/register', passport.authenticate('register', { failureRedirect:'/failregister'} ),async (req, res) =>{
    res.send({status:"succes", message:"User registered"});
});
router.get('/failregister', async (req,res)=>{
    console.log('Fallo en el registro');
    res.send({error: 'Error en el registro'})
});
router.post('/login', passport.authenticate('login', {failureRedirect:'/faillogin'}),async (req, res) => {
    if(!req.user) return res.status(400).send({status:"error", error: 'Invalid credentials'});
    req.session.user = {
        firsName : req.user.firsName,
        lastName: req.user.lastName,
        age: req.user.age,
        email: req.user.email
    };
    await managerAccess.createRecord('USER LOGIN'); 
    res.send({status:"succes", payload:req.res.user, message:"Logueo de usuario exitoso."});
});
router.get('/faillogin', async (req, res) => {
    console.log('Fallo en el ingreso')
    res.status(400).send({error:'Error en el ingreso.'})
});
router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"});
        res.redirect('/login');
    });
});
router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req, res)=>{

});
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res)=>{
    req.session.user = req.user;
    res.redirect('/');
})

export default router;
import { Router } from "express";
import userModel from "../Dao/models/user.model.js";
import ManagerAcces from "../Dao/managers/managerAccess.js";
import UserSessionMongo from "../Dao/managers/userSessionMongo.js";

const router = Router();
const managerAccess = new ManagerAcces();
const userSessionMongo = new UserSessionMongo();
router.post('/register', async (req, res) => {
    try {
        const {firstName, lastName, age, email, password} = req.body;
        if (!firstName || !lastName || !age || !email || !password) {
            throw new Error("Faltan datos");
        };
        const userExist = await userModel.findOne({email});
        if(userExist){
            return res.status(400).send({status:"error", error:"User already exists."});
        };
        const user = {firstName, lastName, age, email, password};
        const result = await userModel.create(user);
        await managerAccess.createRecord('USER CREATED', user.firstName, user.lastName, user.email);
        res.status(200).send({status:"succes", message:"User registered."});
    }catch (err) {
        res.status(500).send({ error: 'Error interno del servidor.'});
    };
});
router.post('/login', async (req, res) => {
    try{
        let user;
        const {email, password} = req.body;
        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
            user = {
                firstName: 'Coder',
                lastName: 'House',
                email: email,
                age: 18,
                role: 'Admin'
            };
            await managerAccess.createRecord('ADMIN LOGIN'); 
        }else{
            user = await userModel.findOne({email, password});
            await managerAccess.createRecord('USER LOGIN'); 
        }
        if(!user){ return res.status(404).send({status:"error", error:"Datos incorrectos."});}
        const role = user.role === 'Admin' ? 'Admin' : 'Usuario';
        req.session.user={
            name: `${user.firstName} ${user.lastName}`,
            age: user.age,
            email: user.email,
            role: role
        };
        res.status(200).send({status:"succes", payload:req.res.user, message:"Logueo de usuario exitoso."});
    }catch (err){
        res.status(500).send({ error: 'Error interno del servidor.'});
    };
});
router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"})
        res.redirect('/login');
    });
});

export default router;
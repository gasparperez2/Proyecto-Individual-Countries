const { Router } = require('express');
const fetch = require('node-fetch')
const { Activity } = require('../db.js');

const router = Router();

router.get('/', async (req,res)=> {
    
    console.log(Activity)
        try{
            const activitiesDb = await Activity.findAll()
            res.json(activitiesDb)
        }catch(e){
            res.status(400).json({msj: 'An Error has ocurred', error: e})
        }

})

router.post('/', async (req,res)=> {
    const { name, difficulty} = req.body
    try{
        if (!name || !difficulty) return res.status(400).json({msg: 'Missing Parameters', error: e})
        const newActivity = await Activity.create(req.body)
        res.json(newActivity)
    }catch(e) {
        res.status(404).json(e)
    }
})



module.exports = router;
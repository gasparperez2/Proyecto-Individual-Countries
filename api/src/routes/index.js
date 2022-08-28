const { Router } = require('express');
const fetch = require('node-fetch');
const { Country } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

function searchById(json, id) {
    arr = []
    for(let i=0;i<json.length;i++) {
        if(json[i].cca3==id) return json[i]
    }
}

let filterArrayOfObjects = (json, jn) => {
    let arr = []
    for(let i=0;i<json.length; i++) {
        arr.push(jn.filter(jn => jn.name.common === json[i].name.common))
    }
    let arr2 = []
    for(let i=0;i<arr.length; i++) {
        if(arr[i].length !== 0) {
            arr2.push(arr[i])
        }
    }
    let arr3 = []
    for(let i=0;i<arr2.length; i++) {
        arr3 = [...arr3, ...arr2[i]]
    }
    return arr3
}

function filterNessesaryProperties(json) {
    return json.map((v) => {
        var copy = {};
        for(key in v) {
            if(key === 'cca3' || key === 'flag' || key === 'continents' || key === 'subregion' || key === 'area' || key === 'population' || key === 'capital') {
                copy[key] = v[key]
            }
            if(key === 'name') {
                copy[key] = v[key].official
            }
            if(key === 'flags') {
                copy[key] = v[key].png
            }
        }
        return copy
    })
}


router.get('/:id', (req,res)=> {
    const { id } = req.params

    if(id) {
        fetch(`http://localhost:3001/countries`)
            .then(r => r.json())
            .then(json => {
                let response = searchById(json, id)
                res.json(response)
            })
    } else {
        res.status(404).send('Somthing went wrong')
    }
})


router.get('/', async (req,res)=> {

    let { name } = req.query
    if(name){
        fetch(`https://restcountries.com/v3/name/${name}`)
            .then(r => r.json())
            .then(json =>
                fetch(`http://localhost:3001/countries`)
                .then(r => r.json())
                .then(jn => {
                    let response = filterArrayOfObjects(json, jn)
                    res.json(response)
                })
            )  
    }else {
        try{
            const countriesDb = await Country.findAll()
            res.json(countriesDb)
        }catch(e){
            res.status(400).json({msj: 'An Error has ocurred', error: e})
        }
    }

})

router.post('/', async (req,res)=> {
    const { cca3, name, flags, continents } = req.body

        if(Array.isArray(req.body)) {
            try {
                let arr = []
                for(let i=0;i<req.body.length;i++) {
                    let newCountry = await Country.create(req.body[i])
                    arr.push(newCountry)
                }
                return res.json(arr)
            }catch(e) {
                return res.status(404).json({msg: 'An Error has ocurred' ,  error: e })
            }
        }
        else {
            if(!cca3 || !name || !flags || !continents) {
                return res.status(404).send('Parameters missing')
            }
            else if (cca3.length !== 3) {
                return res.status(404).send('Id must contain 3 characters')
            }
            try{
                const newCountry = await Country.create(req.body)
                return res.status(201).json(newCountry)
            }catch(e) {
                return res.status(404).json({ msg: 'An Error has ocurred', error: e })
            }
        }
})

module.exports = router;

const Joi = require('joi');
const config = require('config');
const express = require('express');
const router = express.Router();

/*const resources = [
    {id: 1, name: 'resource1'},
    {id: 2, name: 'resource2'},
    {id: 3, name: 'resource3'}
];*/

const resources = config.get('resources');

const resourceSchema = {
    name: Joi.string().min(3).required()
};

const handleNotFound = (res, id) => res.status(404).send({error: `Resource not found with id: ${id}`});
const findSingleResource = (id) => {
    const intId = parseInt(id);
    return resources.find(c => intId === c.id);
};

router.get('/', (req, res) => {
    res.send(resources);
});

router.post('/', (req, res) =>{
    const {error} = Joi.validate(req.body, resourceSchema);
    if(error) return res.status(400).send(error.details);

    const resource = {
        id: resources.length + 1,
        name: req.body.name
    };
    
    resources.push(resource);

    res.status(200).send(resource);
});

router.get('/:id', (req, res) => {
    const resource = findSingleResource(req.params.id);
    if(!resource) return handleNotFound(res, req.params.id);

    res.send(resource);
});

router.put('/:id', (req, res) => {
    const resource = findSingleResource(req.params.id);
    if(!resource) return handleNotFound(res, req.params.id);

    const {error} = Joi.validate(req.body, resourceSchema);
    if(error) return res.status(400).send(error.details);

    resource.name = req.body.name;

    res.send(resource);
});

router.delete('/:id', (req,res) => {
    const resource = findSingleResource(req.params.id);
    if(!resource) return handleNotFound(res, req.params.id);

    const index = resources.indexOf(resource);
    resources.splice(index, 1);

    res.status(200).send(resource);
});

module.exports = router;
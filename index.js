const express = require('express');
const db = require('./data/dbConfig');

const server = express();

server.use(express.json());

server.post('/api/cars', validateCar, async (req, res) => {
    try {
        let createdCarId = await db('cars').insert(req.body);
        let createdCar = await db('cars').where({ id: createdCarId[0] });
        res.status(201).json(createdCar);
    } catch (err) {
        res.status(500).json({ error: 'There was an error while saving the car to the database.' });
    }
});

server.get('/api/cars', async (req, res) => {
    try {
        let cars = await db('cars');
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: 'The cars information could not be retrieved.' });
    }
});

server.get('/api/cars/:id', validateCarId, (req, res) => {
    res.status(200).json(req.car);
});

async function validateCarId(req, res, next) {
    try {
        let car = await db('cars').where({id: req.params.id});
        if (car) {
            req.car = car;
            next();
        } else {
            res.status(404).json({ message: 'The car with the specified ID does not exist.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'The car information could not be retrieved.' });
    }
}

async function validateCar(req, res, next) {
    if (req.body) {
        if (req.body.VIN) {
            if (req.body.make) {
                if (req.body.model) {
                    if (req.body.mileage) {
                        next();
                    } else {
                        res.status(400).json({ message: 'Missing required mileage field.'});
                    }
                } else {
                    res.status(400).json({ message: 'Missing required model field.'});
                }
            } else {
                res.status(400).json({ message: 'Missing required make field.'});
            }
        } else {
            res.status(400).json({ message: 'Missing required VIN field.'});
        }
    } else {
        res.status(400).json({ message: 'Missing car data.' });
    }
}

const port = 8000;

server.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
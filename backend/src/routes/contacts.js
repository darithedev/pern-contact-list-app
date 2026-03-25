import express from 'express';
import pool from '../db/pools.js'

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const { id } = req.query;
        const result = await pool.query(
            //`SELECT * FROM contacts WHERE id = $1`,
            `SELECT contacts.id, 
                contacts.name, 
                contacts.email, 
                contacts.phone_number, 
                contacts.address, 
                contacts.birthday, 
                contacts.notes, 
                users.name 
                AS owned_by
            FROM contacts
            JOIN users ON contacts.user_id = users.id
            WHERE users.id = $1;`,
            [id]
        );
        res.status(200).json(result.rows);
    } catch(error) {
        console.error('Error with getting contacts.', error);
        res.status(500).json({ error: 'Error! Could not get contacts.' });
    }
});

router.post('/', async(req, res) => {

});

router.get('/:id', async(req, res) => {

});

router.put('/:id', async(req, res) => {

});

router.delete('/:id', async(req, res) => {

});

export default router;
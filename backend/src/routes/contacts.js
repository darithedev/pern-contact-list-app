import express from 'express';
import pool from '../db/pools.js'
import authMiddleware from '../helpers/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, async(req, res) => {
    try {
        const userId = req.userId;

        if (userId === null) {
            return res.status(401).json({
                error: 'Unauthenticated user.'
            });
        }

        const result = await pool.query(
            //`SELECT * FROM contacts WHERE id = $1`,
            `SELECT contacts.id, 
                contacts.name, 
                contacts.email, 
                contacts.phone_number, 
                contacts.address, 
                contacts.birthday, 
                contacts.notes,
                contacts.is_favorite, 
                users.name 
                AS owned_by
            FROM contacts
            JOIN users ON contacts.user_id = users.id
            WHERE users.id = $1;`,
            [userId]
        );
        res.status(200).json(result.rows);
    } catch(error) {
        console.error('Error with getting contacts.', error);
        res.status(500).json({ error: 'Error! Could not get contacts.' });
    }
});

router.post('/', authMiddleware, async(req, res) => {
    try {
        const userId = req.userId;

        if (userId === null) {
            return res.status(401).json({
                error: 'Unauthenticated user.'
            });
        }

        const { name, email, phone_number, address, birthday, notes } = req.body;

        if (!name || !phone_number) {
            return res.status(400).json({
                error: "A name and phone number is required!"
            });
        };

        if(Number.isNaN(Number(phone_number)) === NaN || phone_number.length !== 11) {
            return res.status(400).json({
                error: "A valid phone number with 11 digits is required."
            });
        };

        if (!email.includes('@')) {
            return res.status(400).json({
                error: "A valid email is required!"
            });
        }

        const result = await pool.query(
            `INSERT INTO contacts (user_id, name, email, phone_number, address, birthday, notes)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [userId, name, email, phone_number, address, birthday, notes]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error with adding new contact.', error.message);
        res.status(500).json({ error: 'Error! Could not add contact.' });
    }
});

router.get('/:id', authMiddleware, async(req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        if (userId === null) {
            return res.status(401).json({
                error: 'Unauthenticated user.'
            });
        } else if (id === null) {
            return res.status(400).json({
                error: 'Could not find individual contact.'
            })
        }

        const result = await pool.query(`
            SELECT * FROM contacts WHERE id = $1 AND user_id = $2`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                error: 'Error! Contact does not exist.'
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error with getting individual contact.', error);
        res.status(500).json({ error: 'Error! Could not get individual contact.' });
    }
});

router.put('/:id', authMiddleware, async(req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const { name, email, phone_number, address, birthday, notes } = req.body;

        if (userId === null) {
            return res.status(401).json({
                error: 'Unauthenticated user.'
            });
        } else if (id === null) {
            return res.status(400).json({
                error: 'Could not find individual contact.'
            });
        }

        if (!name || !phone_number) {
            return res.status(400).json({
                error: "A name and phone number is required!"
            });
        };

        if(Number.isNaN(Number(phone_number)) === NaN || phone_number.length !== 11) {
            return res.status(400).json({
                error: "A valid phone number with 11 digits is required."
            });
        };

        if (!email.includes('@')) {
            return res.status(400).json({
                error: "A valid email is required!"
            });
        }

        const result = await pool.query(
            `UPDATE contacts 
            SET name = $1, email = $2, phone_number = $3, address = $4, birthday = $5, notes = $6
            WHERE user_id = $7 AND id = $8
            RETURNING *`,
            [name, email, phone_number, address, birthday, notes, userId, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error with editing this contact.', error.message);
        res.status(500).json({ error: 'Error! Could not edit this contact.' });
    }
});

router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const { is_favorite } = req.body;

        if (userId === null) {
            return res.status(401).json({
                error: 'Unauthenticated user.'
            });
        } else if (id === null) {
            return res.status(400).json({
                error: 'Could not find individual contact.'
            });
        }

        const result = await pool.query(
            `UPDATE contacts 
            SET is_favorite = $1
            WHERE user_id = $2 AND id = $3
            RETURNING *`,
            [is_favorite, userId, id]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                error: 'Error! Contact does not exist.'
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error with updating favorite for this contact.', error.message);
        res.status(500).json({ error: 'Error! Could not update favorite for this contact.' });
    }
});

router.delete('/:id', authMiddleware, async(req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        if (userId === null) {
            return res.status(401).json({
                error: 'Unauthenticated user.'
            });
        } else if (id === null) {
            return res.status(400).json({
                error: 'Could not find individual contact.'
            });
        }

        const result = await pool.query(
            `DELETE FROM contacts WHERE user_id = $1 AND id = $2 RETURNING *`,
            [userId, id]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                error: 'Error! Contact does not exist.'
            });
        }

        res.status(200).json({ message: `The contact: ${result.rows[0].name}, has been deleted.`});
    } catch (error) {
        console.error('Error with deleting this contact.', error.message);
        res.status(500).json({ error: 'Error! Could not delete this contact.' });
    }
});

export default router;
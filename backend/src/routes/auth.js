import express from 'express';
import pool from '../db/pools.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authMiddleware from '../helpers/authMiddleware.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "A registered email and password is required to login."
            })
        }

        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                error: 'Error logging in to your account!'
            });
        }

        const user = result.rows[0];
        const loginResult = await bcrypt.compare(password, user.password);

        if (!loginResult) {
            return res.status(400).json({
                error: 'Your email or password is invalid! Please try again.'
            });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET)

        res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error with login!', error);
        res.status(500).json({ error: 'Error! Could not login user.' });
    }
});

router.post('/signup', async(req, res) => {
    try {
        const { name, phone_number, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({
                error: "A valid name, email, and password is required to signup."
            });
        }

        if (!email.includes('@')) {
            return res.status(400).json({
                error: "A valid email is required!"
            });
        }

        if (typeof(phone_number) !== 'number') {
            return res.status(400).json({
                error: "A valid 10 digit phone number is required!"
            });
        }
        
        const passwordBcrypt = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `INSERT INTO users (name, phone_number, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, phone_number, email`,
            [name, phone_number, email, passwordBcrypt]
        );

        const user = result.rows[0];

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Error with signup!', error);
        res.status(500).json({ error: 'Error! Could not signup user.' });
    }
});

router.get('/me', authMiddleware, async(req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, phone_number, email FROM users WHERE id = $1`,
            [req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User could not be found.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error! Could not get user.');
        res.status(500).json({ error: 'Error! Could not get user.' });
    }
});

// User should have the ability to change their password
router.put('/me', authMiddleware, async(req, res) => {
    try {
        const userId = req.userId;
        const { name, email, phone_number } = req.body; // password

        if (userId === null) {
            return res.status(401).json({
                error: 'Unauthenticated user.'
            });
        }

        if (!name || !phone_number ) {
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
            `UPDATE users 
            SET name = $1, email = $2, phone_number = $3
            WHERE id = $4
            RETURNING *`,
            [name, email, phone_number, userId]
        );
        res.status(200).json({ message: `Data for user: ${name}, has been updated.`});
    } catch (error) {
        console.error('Error with editing this user.', error.message);
        res.status(500).json({ error: 'Error! Could not edit this user.' });
    }
});

router.delete('/me', authMiddleware, async(req, res) => {
    try {
        const userId = req.userId;

        if (userId === null) {
            return res.status(401).json({
                error: 'Unauthenticated user.'
            });
        }

        const result = await pool.query(
            `DELETE FROM users WHERE id = $1 RETURNING *`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                error: 'Error! User does not exist.'
            });
        }

        res.status(200).json({ message: `The User: ${result.rows[0].name}, has been deleted.`});
    } catch (error) {
        console.error('Error with deleting this user.', error.message);
        res.status(500).json({ error: 'Error! Could not delete this user.' });
    }
});

export default router;
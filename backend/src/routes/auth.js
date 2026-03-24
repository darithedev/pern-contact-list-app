import express from 'express';
import pool from '../db/pools.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

});

router.get('/me', async(req, res) => {

});

router.put('/me', async(req, res) => {

});

router.delete('/me', async(req, res) => {

});
import express from 'express'
import authRouter from './auth.js'
import contactsRouter from './contacts.js'

const router = express.Router();

router.use('/auth', authRouter);
router.use('/contacts', contactsRouter);

export default router;
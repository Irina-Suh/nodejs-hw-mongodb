import express from 'express';
import {
    handleGetAllContacts,
  handleGetContactById,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/', handleGetAllContacts);
router.get('/:contactId', handleGetContactById);

export default router;
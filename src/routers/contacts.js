
import { Router } from "express";
import {
    handleGetAllContacts,
  handleGetContactById,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from "../middlewares/isValidId.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactSchemas.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);
router.use('/:contactId',isValidId);

router.get('/', ctrlWrapper(handleGetAllContacts));
router.get('/:contactId',ctrlWrapper(handleGetContactById));
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;

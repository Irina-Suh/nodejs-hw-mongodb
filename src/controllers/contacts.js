import { createContact, deleteContactById, getAllContacts, getContactById, patchContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';


export const handleGetAllContacts = async (req, res, next) => {


    const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;
    const userId = req.user._id;
    const result = await getAllContacts({
      page: Number(page),
      perPage: Number(perPage),
      sortBy,
      sortOrder,
      userId
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: result,
    });

};

export const handleGetContactById = async (req, res, next) => {

    const { contactId } = req.params;
    const userId = req.user._id;
    const contact = await getContactById(contactId,userId);

    if (!contact) {

      throw createHttpError(404, 'Contact not found');

    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });

};




export const createContactController = async (req, res) => {

  const userId = req.user._id;
  const newContact = await createContact(req.body,userId);


  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: newContact,
  });
};


export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const updatedData = req.body;
  const userId = req.user._id;
  const updatedContact = await patchContactById(contactId, updatedData,userId);

  if (!updatedContact) {
    throw createHttpError(404, 'Not update');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};



export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await deleteContactById(contactId,userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};


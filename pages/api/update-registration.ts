import { NextApiResponse } from 'next';
import nc from 'next-connect';
import database from '../../middleware/db';
import { event } from '../../db';
import { ExtendRequest, UpdateRegistrationFormData } from '../../interfaces';
import { formatRegistrationForDb } from '../../utils/registration';
import { getRaceTotals } from '../../utils/event';

interface UpdateRegistrationRequest extends ExtendRequest {
  body: {
    eventId: string;
    registrationId: string;
    formData: UpdateRegistrationFormData;
  };
}

const handler = nc<UpdateRegistrationRequest, NextApiResponse>()
  .use(database)
  .post(async (req, res) => {
    const fetchedEvent = await event.getEventById(req.db, req.body.eventId);
    const updatedRegistration = formatRegistrationForDb(
      req.body.formData,
      fetchedEvent.dates[0]
    );

    const result = await event.updateRegistration(
      req.db,
      fetchedEvent._id,
      updatedRegistration
    );

    if (!result) {
      res.json({ error: 'Failed to update the registration.' });
      return;
    }

    const raceTotals = getRaceTotals(result);

    res.json({ ...result, raceTotals });
  });

export default handler;

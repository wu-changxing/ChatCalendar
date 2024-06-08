// pages/api/calendar.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { google, calendar_v3 } from 'googleapis';

interface CalendarEvent {
  summary: string;
  location: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const accessToken = req.headers.authorization?.split(' ')[1] || req.body.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token not provided' });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken as string });
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  switch (method) {
    case 'GET':
      try {
        const events = await calendar.events.list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime',
        });

        res.status(200).json(events.data.items);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      break;

    case 'POST':
      try {
        const { summary, location, description, startDateTime, endDateTime } = req.body as CalendarEvent;

        const event = await calendar.events.insert({
          calendarId: 'primary',
          requestBody: {
            summary,
            location,
            description,
            start: {
              dateTime: startDateTime,
              timeZone: 'UTC',
            },
            end: {
              dateTime: endDateTime,
              timeZone: 'UTC',
            },
          },
        });

        res.status(201).json(event.data);
      } catch (error) {
        console.error('Error creating calendar event:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
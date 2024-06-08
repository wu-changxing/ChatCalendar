// components/GetEventsButton.tsx
import { useState } from 'react';
import { calendar_v3 } from 'googleapis';
import { getAuth } from 'firebase/auth';
import useAuthStore from '../../../authStore';

const GetEvents: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [events, setEvents] = useState<calendar_v3.Schema$Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCalendarEvents = async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const accessToken = await currentUser.getIdToken();


        const response = await fetch(`/api/calendar?uid=${user.uid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const data = await response.json();
        setEvents(data);
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      setError('Failed to fetch calendar events');
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={fetchCalendarEvents} disabled={loading}>
        {loading ? 'Loading...' : 'Get Calendar Events'}
      </button>
      {error && <p>{error}</p>}
      {events.length > 0 && (
        <ul>
          {events.map((event) => (
            <li key={event.id}>{event.summary}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetEvents;
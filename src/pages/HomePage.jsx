import { baseUrl } from '../../config';
import Spinner from '../Spinner.jsx';
import { useState, useEffect } from 'react';
import Navbars from '../Navbar.jsx';

const HomePage = () => {

  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/events`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (error) return <div>Error: {error.message}</div>;

 const formattedEventDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(event.date);
const formattedCreatedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(event.createdAt);

  return (
    <Navbars>
      <div className="max-w-screen m-6">
        <h1 className="text-2xl font-bold mb-6">All Events</h1>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-10/12 mx-auto">
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">
                        { event.title }
                      </h2>
                      <p>{event.description.substring(0, 90) + '...'}</p>
                      <p>{formattedEventDate}</p>
                      <p>{event.location}</p>
                      <p>created on {formattedCreatedDate}</p>
                      <div className="card-actions justify-between align-bottom">
                        <button className="btn btn-primary">View</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Nothing happening yet. Get the party started by created your own event! <button>Link to CreateEventPage</button></p>
              )}
            </div>
          </>
        )}
      </div>
    </Navbars>
  )
}

export default HomePage

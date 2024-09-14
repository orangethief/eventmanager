import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import { useState, useEffect } from 'react';
import { baseUrl } from '../../config';

const EventDetailsPage = () => {
  const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/events/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setEvent(data.results);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }, []);

    if (error) return <div>Error: {error.message}</div>;


  const formatEventDate = (event) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(event.date));
  };
  const formatCreatedDate = (event) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(event.createdAt));
  };

  return (
    <>
      <div key={id} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">
                        { events.title }
                      </h2>
                      <p>{event.description.substring(0, 90) + '...'}</p>
                      <p>{formatEventDate(event)}</p>
                      <p>{event.location}</p>
                      <p>created on {formatCreatedDate(event)}</p>
                      <div className="card-actions justify-between align-bottom">
                        <Link to={`/events/${event.id}`} className="btn btn-primary">View</Link>
                      </div>
                    </div>
                  </div>
    </>
  )
}

export default EventDetailsPage

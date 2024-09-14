import { useParams, Link } from "react-router-dom";
import Spinner from "../Spinner";
import { useState, useEffect } from 'react';
import { baseUrl } from '../../config';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const EventDetailsPage = () => {
  const { id } = useParams();

    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      console.log(id)
       const fetchEvent = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/events/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setEvent(data);
          console.log(data)
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvent() ;
    }, []);

    useEffect(() => {
      if (event.latitude && event.longitude) {
      const map = L.map('map').setView([event.latitude, event.longitude], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'

      }).addTo(map);

      L.marker([event.latitude, event.longitude]).addTo(map)
        .bindPopup(event.title)
        .openPopup();

        return () => {
          map.remove();
        }
      }
    }, [event]);

    if (error) return <div>Error: {error.message}</div>;


  const formatEventDate = (event) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(event.date));
  };
  const formatCreatedDate = (event) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(event.createdAt));
  };

  return (
    <>
    <div className="max-w-screen m-6 mx-8">
    <Link to="/" className="btn btn-primary">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-chevron-left"><circle cx="12" cy="12" r="10"/><path d="m14 16-4-4 4-4"/></svg>
    all events
    </Link>

    {loading ? (
      <Spinner loading={loading} />
    ) : (
      <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p>{event.description}</p>
          <p>{formatEventDate(event)}</p>
          <p>{event.location}</p>
          <p><i>created on {formatCreatedDate(event)}</i></p>
          <div id="map" className="h-96 w-1/3" key={event.latitude + event.longitude}>
        </div>


        </div>
      </div>
    </>
     )}
    </div>
    </>

  )
}

export default EventDetailsPage

import { useParams, Link } from "react-router-dom";
import Spinner from "../Spinner";
import { useState, useEffect } from 'react';
import { baseUrl } from '../../config';
import { CircleChevronLeft } from "lucide-react";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const EventDetailsPage = () => {
  const { id } = useParams();

  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/events/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent() ;
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
      <div className="max-w-screen m-6 mx-8">
        <Link to="/" className="btn btn-primary">
          <CircleChevronLeft />
          all events
        </Link>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-6">
              <div className="col-span-2 my-4">
                <h1 className="text-2xl font-bold">{event.title}</h1>
                <p>{event.description}</p>
                <p>{formatEventDate(event)}</p>
                <p>{event.location}</p>
                <p><i>created on {formatCreatedDate(event)}</i></p>
              </div>
              {event && (
                <div className="col-span-4 lg:my-4">
                  <MapContainer
                    center={[event.latitude, event.longitude]} // Set initial map center (latitude, longitude)
                    zoom={13}
                    ref={setMap}
                    style={{ height: '650px', width: '100%' }}
                    className="rounded-lg"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {event && (
                      <Marker position={[event.latitude, event.longitude]} icon={customMarkerIcon} />
                    )}
                  </MapContainer>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>

  )
}

export default EventDetailsPage

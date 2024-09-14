import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Pagination } from "./Pagination";

const customMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const GridView = ({ events, totalPages, currentPage, setPage }) => {
  const navigate = useNavigate();

  const formatEventDate = (event) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(event.date));
  };
  const formatCreatedDate = (event) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(event.createdAt));
  };

  return (
    <>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 w-10/12 mx-auto">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="card bg-gray-800 shadow-xl">
              <figure>
                <MapContainer
                  center={[event.latitude, event.longitude]}
                  zoom={15}
                  style={{ height: '200px', width: '100%' }}
                  dragging={false}
                  zoomControl={false}
                  trackResize={false}
                  boxZoom={false}
                  doubleClickZoom={false}
                  scrollWheelZoom={false}
                  touchZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[event.latitude, event.longitude]} icon={customMarkerIcon} />
                </MapContainer>
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  { event.title }
                </h2>
                <p>{event.description.substring(0, 90) + '...'}</p>
                <p>{formatEventDate(event)}</p>
                <p>{event.location}</p>
                <p>created on {formatCreatedDate(event)}</p>
                <div className="card-actions justify-between align-bottom">
                  <Button onClick={() => navigate(`/events/${event.id}`)}>View</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nothing happening yet. Get the party started by created your own event! <Link to="/new-event">Link to CreateEventPage</Link></p>
        )}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} setPage={setPage} />
    </>
  )
}

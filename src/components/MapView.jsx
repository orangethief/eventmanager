import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
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

export const MapView = ({ events }) => {
  const formatEventDate = (event) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(event.date));
  };
  const formatCreatedDate = (event) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(event.createdAt));
  };
  const [position, setPosition] = useState(null); // For latitude and longitude
  const [currentEvent, setCurrentEvent] = useState({}); // For latitude and longitude
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    setCurrentEvent(events[0] ?? {});
  }, [events]);

  useEffect(() => {
    if (currentEvent.latitude && currentEvent.longitude) {
      setPosition(new LatLng(currentEvent.latitude, currentEvent.longitude));
    }
  }, [currentEvent]);

  useEffect(() => {
    map && map.setView(position, zoom, {
      animate: true
    })
  }, [position]);

  return (
    <section className="grid grid-cols-6">
      <div className="col-span-2">
        <div className="join join-vertical w-full gap-2">
          {events.length > 0 ? (
            events.map((event) => (
              <div className="collapse bg-base-300" key={event.id}>
                <input type="radio" name="events" value={event} checked={currentEvent.id == event.id} onChange={() => setCurrentEvent(event)} />
                <div className="collapse-title text-xl font-medium">{event.title} ({formatEventDate(event)})</div>
                <div className="collapse-content">
                  <p>{event.description}</p>
                  <p className="py-2">{event.location}</p>
                  <p><i>created on {formatCreatedDate(event)}</i></p>
                </div>
              </div>
            ))
          ) : (
            <p>Nothing happening yet. Get the party started by created your own event! <Link to="/new-event">Link to CreateEventPage</Link></p>
          )}
        </div>
      </div>
      <div className="col-span-4">
        <MapContainer
          center={[51.505, -0.09]} // Set initial map center (latitude, longitude)
          zoom={zoom}
          style={{ height: '650px', width: '100%' }}
          ref={setMap}
          className="rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {position && (
            <Marker position={position} icon={customMarkerIcon} />
          )}
        </MapContainer>
      </div>
    </section>
  )
}

import { useState } from 'react';
import Navbars from "../Pages/Navbar";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet marker icon issues for modern ES6 module environments
const customMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CreateEventPage = () => {
  const [position, setPosition] = useState(null);

  // Custom Map component to handle clicks
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng); // Set marker position to clicked coordinates
      },
    });
    return null;
  }

  return (
    <>
      <Navbars />
      <div className="CreateForm flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl p-4">
          {/* Form Section */}
          <form className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>

            <div>
              <label htmlFor="tittle" className="block text-gray-700 font-semibold">Enter Title</label>
              <input type="text" id="tittle" className="input input-bordered w-full mt-1" />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 font-semibold">Enter Description</label>
              <input type="text" id="description" className="input input-bordered w-full mt-1" />
            </div>

            <div>
              <label htmlFor="date" className="block text-gray-700 font-semibold">Enter Date</label>
              <input type="date" id="date" className="input input-bordered w-full mt-1" />
            </div>

            <div>
              <label htmlFor="location" className="block text-gray-700 font-semibold">Enter Location</label>
              <input type="text" id="location" className="input input-bordered w-full mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="longitude" className="block text-gray-700 font-semibold">Longitude</label>
                <input
                  type="text"
                  id="longitude"
                  className="input input-bordered w-full mt-1"
                  value={position ? position.lng : ''}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="latitude" className="block text-gray-700 font-semibold">Latitude</label>
                <input
                  type="text"
                  id="latitude"
                  className="input input-bordered w-full mt-1"
                  value={position ? position.lat : ''}
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary w-full mt-4">Create Event</button>
            </div>
          </form>

          {/* Leaflet Map Section */}
          <div className="rounded-lg shadow-lg overflow-hidden">
            <MapContainer
              center={[51.505, -0.09]} // Set initial map center (latitude, longitude)
              zoom={13}
              style={{ height: '650px', width: '100%' }}
              className="rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapClickHandler />
              {position && (
                <Marker position={position} icon={customMarkerIcon} />
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEventPage;

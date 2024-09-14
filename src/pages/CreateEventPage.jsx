import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { baseUrl } from '../../config';
import { Button } from '../components/Button';

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
  const [position, setPosition] = useState(null); // For latitude and longitude
  const [address, setAddress] = useState(''); // For address (human-readable location)
  const [title, setTitle] = useState(''); // For title
  const [description, setDescription] = useState(''); // For description
  const [date, setDate] = useState(''); // For date

  // Custom Map component to handle clicks
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const latlng = e.latlng;
        setPosition(latlng); // Set the marker position to clicked coordinates
        reverseGeocode(latlng); // Get the address from the lat/lng
      },
    });
    return null;
  }

  // Function to perform reverse geocoding (latitude/longitude -> address)
  const reverseGeocode = async (latlng) => {
    const { lat, lng } = latlng;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setAddress(data.display_name || 'Unknown Location');
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
      setAddress('Unknown Location');
    }
  };

  // Function to handle map creation and geocoder integration
  const handleMapCreated = (mapInstance) => {
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on('markgeocode', function (e) {
        const latlng = e.geocode.center;
        mapInstance.setView(latlng, 13); // Set the map view to the searched location
        setPosition(latlng); // Set the position for marker
        reverseGeocode(latlng); // Get address from lat/lng
      })
      .addTo(mapInstance);
  };

  // Function to handle form submission and POST request
  const handleCreateEvent = async (e) => {
    e.preventDefault();

    // Get token from local storage
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      alert("You need to be logged in to create an event.");
      return;
    }

    if (!title || !description || !date || !position || !address) {
      alert("Please fill in all fields and select a location.");
      return;
    }

    const eventData = {
      title: title,
      description: description,
      date: new Date(date).toISOString(),
      location: address,
      latitude: position.lat,
      longitude: position.lng,
    };

    try {
      const response = await fetch(`${baseUrl}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the token from localStorage
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert("Event created successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error creating event: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="CreateForm flex justify-center items-center min-h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl p-6">
        {/* Form Section */}
        <form className="p-8 rounded-lg shadow-lg space-y-6 bg-gray-800 border border-gray-600" onSubmit={handleCreateEvent}>
          <h2 className="text-3xl font-semibold text-center text-gray-200">Create Event</h2>

          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="title" className="block text-gray-400 font-semibold">Enter Title</label>
              <input
                type="text"
                id="title"
                className="w-full mt-2 px-4 py-3 bg-gray-700 text-gray-300 border-none rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="relative">
              <label htmlFor="description" className="block text-gray-400 font-semibold">Enter Description</label>
              <textarea
                id="description"
                className="w-full mt-2 px-4 py-3 bg-gray-700 text-gray-300 border-none rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="relative">
              <label htmlFor="date" className="block text-gray-400 font-semibold">Enter Date</label>
              <input
                type="datetime-local"
                id="date"
                className="w-full mt-2 px-4 py-3 bg-gray-700 text-gray-300 border-none rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="relative">
              <label htmlFor="location" className="block text-gray-400 font-semibold">Enter Location</label>
              <input
                type="text"
                id="location"
                className="w-full mt-2 px-4 py-3 bg-gray-700 text-gray-300 border-none rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                value={address}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="relative">
              <label htmlFor="longitude" className="block text-gray-400 font-semibold">Longitude</label>
              <input
                type="text"
                id="longitude"
                className="w-full mt-2 px-4 py-3 bg-gray-700 text-gray-300 border-none rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                value={position ? position.lng : ''}
                readOnly
              />
            </div>
            <div className="relative">
              <label htmlFor="latitude" className="block text-gray-400 font-semibold">Latitude</label>
              <input
                type="text"
                id="latitude"
                className="w-full mt-2 px-4 py-3 bg-gray-700 text-gray-300 border-none rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                value={position ? position.lat : ''}
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button type="submit" className="w-full py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition">
              Create Event
            </button>
          </div>
        </form>

        {/* Leaflet Map Section */}
        <div className="rounded-lg shadow-lg overflow-hidden border-2 border-gray-700">
          <MapContainer
            center={[51.505, -0.09]} // Set initial map center (latitude, longitude)
            zoom={13}
            style={{ height: '700px', width: '100%' }}
            whenCreated={handleMapCreated}
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
  );
};

export default CreateEventPage;

import Navbars from "../Pages/Navbar";

const CreateEventPage = () => {
  return (
    <>
      <Navbars />
      <div className="CreateForm flex justify-center items-center min-h-screen">
        <form className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>

          <div>
            <label htmlFor="tittle" className="block text-gray-700 font-semibold">Enter Title</label>
            <input
              type="text"
              id="tittle"
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold">Enter Description</label>
            <input
              type="text"
              id="description"
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-700 font-semibold">Enter Date</label>
            <input
              type="date"
              id="date"
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700 font-semibold">Enter Location</label>
            <input
              type="text"
              id="location"
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="longitude" className="block text-gray-700 font-semibold">Longitude</label>
              <input
                type="text"
                id="longitude"
                className="input input-bordered w-full mt-1"
              />
            </div>
            <div>
              <label htmlFor="latitude" className="block text-gray-700 font-semibold">Latitude</label>
              <input
                type="text"
                id="latitude"
                className="input input-bordered w-full mt-1"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateEventPage;

import { Link } from 'react-router-dom';
import { baseUrl } from '../../config';
import Spinner from '../Spinner.jsx';
import { useState, useEffect } from 'react';
import { GridView } from '../components/GridView.jsx';
import { MapView } from '../components/MapView.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { LayoutGrid, Map } from 'lucide-react';

const HomePage = () => {

  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState(localStorage.getItem('preferredView') || 'grid');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/events?page=${page || 1}&limit=4`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTotalPages(data.totalPages);
      setEvents(data.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page]);

  useEffect(() => {
    localStorage.setItem('preferredView', view);
  }, [view]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="max-w-screen m-6">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl font-bold mb-6">All Events</h1>
          <div className="form-control w-32">
            <label className="label cursor-pointer">
              <span className="label-text"><LayoutGrid/></span>
              <input type="checkbox" className="toggle" checked={view == 'map'} onChange={() => setView(prev => prev == 'grid' ? 'map' : 'grid')} />
              <span className="label-text"><Map/></span>
            </label>
          </div>
        </div>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            {view == 'grid' && <GridView events={events} totalPages={totalPages} currentPage={page} setPage={setPage} />}
            {view == 'map' && <MapView events={events} totalPages={totalPages} currentPage={page} setPage={setPage} />}
          </>
        )}
      </div>
      </>
  )
}

export default HomePage

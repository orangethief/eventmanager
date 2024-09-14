export const Pagination = ({ totalPages, currentPage, setPage }) => {
  if (totalPages == 1) {
    return <></>;
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(<button key={i} className={`join-item btn ${currentPage == i ? 'btn-active' : ''}`} onClick={() => setPage(i)}>{i}</button>);
  }

  return (
    <div className="flex justify-center w-full mt-5">
      <div className="join">
        <button disabled={currentPage == 1} className="join-item btn" onClick={() => setPage(1)}>&laquo; First</button>
        {pages}
        <button disabled={currentPage == totalPages} className="join-item btn" onClick={() => setPage(totalPages)}>Last &raquo;</button>
      </div>
    </div>
  )
}

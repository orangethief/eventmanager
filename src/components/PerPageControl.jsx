

const PerPageControl = ({ perPage, setPerPage }) => {


  return (
    <div className="dropdown dropdown-hover">
  <div tabIndex={0} role="button" className="btn mx-3 -mt-2 mb-2 text-base">Events per Page</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[401] w-52 p-2 shadow">
    <li onClick={() => {setPerPage(4); document.activeElement?.blur()}}><a>4</a></li>
    <li onClick={() => {setPerPage(8); document.activeElement?.blur()}}><a>8</a></li>
    <li onClick={() => {setPerPage(16); document.activeElement?.blur()}}><a>16</a></li>
  </ul>
</div>
  );

};


export default PerPageControl
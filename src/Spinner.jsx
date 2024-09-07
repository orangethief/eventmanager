import PuffLoader from 'react-spinners/PuffLoader';

const override = {
    display: 'block',
    margin: '100px auto',

}

const Spinner = ( { loading}) => {
  return (
    <PuffLoader
    color="#C59F60"
    loading={loading}
    cssOverride={override}
    size={150}
    speedMultiplier={2}
    />);
};

export default Spinner;
import Loader from "../assets/img/loader.svg";

const Spinner = () => {
  return (
    <div className="flex flex-col flex-grow justify-center items-center">
      <img src={Loader} alt="Loading..." />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
export default Spinner;

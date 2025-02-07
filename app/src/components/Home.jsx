import { Link } from "react-router";

const Home = ({ setRoute }) => {
  return (
    <>
      <h1>Home</h1>
      <Link to="/about">About</Link>
      <br />
      <Link to="/contact">Contact</Link>
    </>
  );
};

export default Home;

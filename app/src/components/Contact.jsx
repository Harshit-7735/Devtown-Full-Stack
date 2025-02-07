import { Link } from "react-router-dom";
const Contact = ({ setRoute }) => {
  return (
    <>
      <h1>Contact</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/about">About</Link>
    </>
  );
};

export default Contact;

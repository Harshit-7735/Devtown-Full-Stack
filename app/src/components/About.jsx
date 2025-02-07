import{Link} from 'react-router-dom';
const About = ({setRoute}) => {
    return ( 
        <>
        <h1>About</h1>
        <Link to="/">Home</Link>
        <br />
        <Link to="/contact">Contact</Link>
        </>
     );
}
 
export default About;
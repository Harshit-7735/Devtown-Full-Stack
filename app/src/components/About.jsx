import { useEffect, useState } from 'react';
import{Link} from 'react-router-dom';
const About = ({setRoute}) => {
    const [count,setCount] = useState(0);
    console.log("render");
    useEffect(()=>{
        console.log("mount");
        return ()=>{
            console.log("unmount");
        }
    },[]); // empty array means it will only run on mount and unmount 
    useEffect(()=>{
        console.log("count changed");
    },[count]);
    
    return ( 
        <>
        <nav>
        <Link to="/">Home</Link>
        <br />
        <Link to="/contact">Contact</Link>
        </nav>
        <h1>About</h1>
        {count}
        <button onClick={()=>setCount(count+1)}>Increment</button>
        </>
     );
}
 
export default About;
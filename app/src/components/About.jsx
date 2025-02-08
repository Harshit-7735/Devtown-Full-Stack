import { useEffect, useState } from 'react';
import{Link} from 'react-router-dom';
const About = ({setRoute}) => {
    // const [count,setCount] = useState(0);
    // console.log("render");
    // useEffect(()=>{
    //     console.log("mount");
    //     return ()=>{
    //         console.log("unmount");
    //     }
    // },[]); // empty array means it will only run on mount and unmount 
    // useEffect(()=>{
    //     console.log("count changed");
    // },[count]);

    const [timer,setTimer] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setTimer(timer+1);
        },1000);
        return ()=>{
            clearInterval(interval);
        }
    },[timer]);
    
    return ( 
        <>
        <nav>
        <Link to="/">Home</Link>
        <br />
        <Link to="/contact">Contact</Link>
        </nav>
        <h1>About</h1>
        {/* {count}
        <button onClick={()=>setCount(count+1)}>Increment</button> */
        
        }
        <h2>{timer}</h2>
        </>
     );
}
 
export default About;
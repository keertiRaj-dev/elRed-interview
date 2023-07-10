
import "./App.css";
import Resume from "./images/resume.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useState, useEffect} from "react";

function Mybio() {
const location = useLocation();
const data = location.state;
const skillsdata = location.state;
const navigate = useNavigate();
const [ethical, setEthical] = useState([]);
const [real, setReal] = useState([]);
const [ethicShow, setEthicShow] = useState(false);
const [realShow, setRealShow] = useState(false);

const edit = ()=>{
    navigate("/my-bio-edit");
}
const skills = ()=>{
    navigate("/skills");
}

//fetch ratings
const fetchEthical = async()=>{
    await fetch("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsEthicalCodeResponse.json")
    .then(response=> response.json())
    .then(data=>setEthical(data))
}

const fetchReal = async()=>{
    await fetch("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsVirtuallyMetResponse.json")
    .then(response=> response.json())
    .then(data=>setReal(data))
}

useEffect(()=>{
    fetchEthical();
    fetchReal();
}, [])

console.log(real)
console.log(ethical);

    return(
        <div className="mybio">
            <h2><i class="fa-solid fa-angle-left"></i>  My bio</h2>
            <div className="about">
            <span className="about-head">About Me</span>
            <span className="pen"><button className="edit" onClick={edit}><i class="fa-solid fa-pen"></i></button></span>
            <div className="about-content">
            {data ? data.about : <p>No About Me added yet</p>}
                <hr className="about-line"/>
            </div>
            </div>

            <div className="about">
                <span className="about-head">Blood Group</span>
                <span className="pen">{data?.blood}</span>
            </div>

            <div className="resume">
            <span><img src={Resume} className="resume-img"/></span>
            <span className="resume-text">Resume</span>
            <span className="pen"><i class="fa-solid fa-angle-right"></i></span>
        
            </div>
    
            <div className="skills">
            <span className="skills-head">Skills</span>
            <span className="pen"><button className="edit" onClick={skills}><i class="fa-solid fa-pen"></i></button></span>
            </div>
            <div className="skills-content">
                    <p className= "skills-para">I'm incredible at these skills/professionally great at</p>
                    <div  className="skill-box">
                    {skillsdata ? skillsdata.skills.map((item, index)=>
                <span className="main-skills">{item}</span>) :  null} 
                  <hr className="about-line"/>
                    </div>
                  
            </div>

            <div className="hobbies-content">
        
                    <p className= "skills-para">Hobbies I'm passionate about</p>
                    <div  className="skill-box">
                    {skillsdata ? skillsdata.hobbies.map((item, index)=>
                <span className="main-skills">{item}</span>) :  null} 
                <hr className="about-line"/>
                    </div>
            
            </div>

            <div className="hobbies-content">
        
        <p className= "skills-para">My favourite subjects are</p>
        <div  className="skill-box">
        {skillsdata ? skillsdata.subjects.map((item, index)=>
    <span className="main-skills">{item}</span>) :  null} 

<hr className="about-line"/>
        </div>

</div>

<div className="ratings">
<i class="fa-solid fa-star star"></i>
    <div className="upper-ratings">
    <h3 className="ratings-head"> Ratings </h3>
    <div className="rating-box1">
        <span onClick={()=>setEthicShow(true)}className="count">{ethical.ethicalCodeCount}</span>
        <span>Say has ethical code of conduct abd is safe to do business with</span>
    </div>
    <hr className="rating-line"/>
    <div className="rating-box2">
        
        <span onClick={()=>setRealShow(true)} className="count">{real.virtuallyMetCount}</span>
        <span>Have met in real life/vido call</span>
    </div>
    </div>
    
    {ethicShow && <div className="ethic-div">
        <div className="model-head">
        <span><span className="head-count">{ethical.ethicalCodeCount} </span>Say has ethical code of con...</span>
        <span onClick={()=>setEthicShow(false)}><i className="fa-solid fa-xmark cross"></i></span>
        </div>
        {ethical && ethical.result.map((item, index)=>
        <div className="raters-box">
            <img className="dp" src={item.dpURL} />
            <div className="rater-details">
            <h3>{item.firstname}   {item.lastname}</h3>
            <p className="design">{item.title[0].value}</p>
            </div>
            </div>
        )}
        </div>
        }

{realShow && <div className="ethic-div">
        <div className="model-head">
        <span><span className="head-count">{ethical.virtuallyMetCount} </span>Have met in real life...</span>
        <span onClick={()=>setRealShow(false)}><i className="fa-solid fa-xmark cross"></i></span>
        </div>
        {real && real.result.map((item, index)=>
        <div className="raters-box">
            <img className="dp" src={item.dpURL} />
            <div className="rater-details">
            <h3>{item.firstname}   {item.lastname}</h3>
            <p className="design">{item.title[0].value}</p>
            </div>
            </div>
        )}
        </div>
        }

</div>
           
        </div>
    )
}
 export default Mybio;
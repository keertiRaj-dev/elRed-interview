
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"

function Skills() {
const navigate = useNavigate()
//States

const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
const [skills, setSkills] = useState([]);
const [skillsClicked, setSkillsClicked] = useState(false);
const [great, setGreat] = useState([]);
const [hobbies, setHobbies] = useState([]);
const [myHobbies, setMyHobbies] = useState([]);
const [hobbiesClicked, setHobbiesClicked] = useState(false);
const [subjects, setSubjects] = useState([]);
const [mySubjects, setMySubjects] = useState([]);
const [subjectsClicked, setSubjectsClicked] = useState(false);


//Fetch APIs

const fetchskills = async()=> {
    await fetch("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetProfessionalSkillsResponse.json")
    .then(response=> response.json())
    .then(data=>setSkills(data.result[0].skills))
}

const fetchhobbies = async()=> {
    await fetch("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetHobbiesResponse.json")
    .then(response=> response.json())
    .then(data=>setHobbies(data.result[0].hobbies))
}

const fetchsubjects = async()=> {
    await fetch("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetSubjectsResponse.json")
    .then(response=> response.json())
    .then(data=>setSubjects(data.result[0].subjects))
}

useEffect(()=>{
    fetchskills();
    fetchhobbies();
    fetchsubjects();
}, [])

console.log(subjects)

//Skills functions

const handleclick = (event)=>{
    setSkillsClicked(true);
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
}
const addGreat = (i, event)=>{
    event.stopPropagation();
    setGreat([...great, skills[i].value])
    setSkillsClicked(false);
   
}

const deletegreat = (i, event)=>{
    event.stopPropagation();
    setGreat(great.slice(0, i).concat(great.slice(i+1)))
    
}

//Hobbies functions

const handleclickHobbies = (event)=>{
    setHobbiesClicked(true);
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
}

const addHobbies = (i, event)=>{
    event.stopPropagation();
    setMyHobbies([...myHobbies, hobbies[i].value])
    setHobbiesClicked(false);
   
}

const deleteHobby = (i, event)=>{
    event.stopPropagation();
    setMyHobbies(myHobbies.slice(0, i).concat(myHobbies.slice(i+1)))
    
}

//subjects functions

const handleclickSubjects = (event)=>{
    setSubjectsClicked(true);
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
}

const addSubjects = (i, event)=>{
    event.stopPropagation();
    setMySubjects([...mySubjects, subjects[i].value])
    setSubjectsClicked(false);
   
}

const deleteSubject = (i, event)=>{
    event.stopPropagation();
    setMySubjects(mySubjects.slice(0, i).concat(mySubjects.slice(i+1)))
    
}

//Save
const saveskills =()=> {
    const skillsdata = {skills: great, hobbies: myHobbies, subjects: mySubjects};
    navigate("/", {state: skillsdata})
    }
    
    
    const back =()=>{
        navigate("/");
    }

    return(
        <div className="mybio">
               <h2><i class="fa-solid fa-angle-left" onClick={back}></i>Skills</h2>
            <h1>My skills are/I'm professionally good at</h1>
            <div className="skill-edit-box" onClick={handleclick}>
            {great ? great.map((item, index)=>
            <span className="great">{item} <i className="fa-solid fa-circle-xmark" onClick={(event)=>deletegreat(index, event)}></i></span>) : null}
            
           
            </div>   
            {skillsClicked && <div className="skills-list" style={{ position: "absolute", left: mousePosition.x, top: mousePosition.y }}
        >
            {skills.map((item, index)=>
            
                <p className="skill-name" onClick={(event)=>addGreat(index, event)} >{item.value}</p>
               
            )
            }
             </div>}        

           

             <h1>Hobbies I'm passionate about</h1>

            <div className="skill-edit-box" onClick={handleclickHobbies}>
            {myHobbies ? myHobbies.map((item, index)=>
            <span className="great">{item} <i className="fa-solid fa-circle-xmark" onClick={(event)=>deleteHobby(index, event)}></i></span>) : null}
            </div>   
            {hobbiesClicked && <div className="skills-list" style={{ position: "absolute", left: mousePosition.x, top: mousePosition.y }}
        >
           {hobbies && hobbies.map((item, index)=>
            
                <p className="skill-name" onClick={(event)=>addHobbies(index, event)} >{item.value}</p>
               
            )
            } 
             </div>}  


             <h1>My favourite subjects are</h1>

<div className="skill-edit-box" onClick={handleclickSubjects}>
{mySubjects ? mySubjects.map((item, index)=>
<span className="great">{item} <i className="fa-solid fa-circle-xmark" onClick={(event)=>deleteHobby(index, event)}></i></span>) : null}
</div>   
{subjectsClicked && <div className="skills-list" style={{ position: "absolute", left: mousePosition.x, top: mousePosition.y }}
>
{subjects && subjects.map((item, index)=>

    <p className="skill-name" onClick={(event)=>addSubjects(index, event)} >{item.value}</p>
   
)
} 
 </div>}  


            <button className="save" onClick={saveskills}>Save</button>
        </div>

       
    )
}

export default Skills;
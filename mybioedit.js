import { useNavigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Resume from "./images/resume.png"

function MybioEdit() {
const navigate= useNavigate();
const [newAbout, setNewAbout] = useState();
const [newResume, setNewResume] = useState(Resume);
const [newBloodGroup, setNewBloodGroup] = useState("");


const save =()=> {
const data = {about: newAbout, resume: newResume, blood: newBloodGroup};
navigate("/", {state: data})
}


const back =()=>{
    navigate("/");
}
return(
    <div className="mybio"> 
     <span><button onClick={back} className="edit"><i className="fa-solid fa-angle-left"></i></button></span> <span><h2>My bio</h2></span>
     <h1 className="about">Write something about yourself</h1>
     <input className="about-input" type="text" placeholder={newAbout ? newAbout : "Write something here..."} onChange={(event)=>setNewAbout(event.target.value)} />
    <div className="resume-upload">
        <img src={Resume} className="resume-img-upload"/>
        <input type="file" accept="pdf/jpg/jpeg/png" placeholder="Upload Resume" onChange={(event)=>setNewResume(event.target.value)}/>
        {newResume && <embed src={newResume} width="400px" height="200px" type="pdf/png/jpg/jpeg"></embed> }
    {newResume && <button onClick={()=>setNewResume(null)}> Delete Resume </button>}
    </div>

    <div className="edit-blood">
        <h1>Choose Blood Group</h1>
        <span>Select blood group</span><select className="blood-dropdown" onChange={(event)=>setNewBloodGroup(event.target.value)}>
            <option value="A+" className="blood-option">A+</option>
            <option value="A-" className="blood-option">A-</option>
            <option value="B+" className="blood-option">B+</option>
            <option value="B-" className="blood-option">B-</option>
            <option value="AB+" className="blood-option">AB+</option>
            <option value="AB-" className="blood-option">AB-</option>
            <option value="O+" className="blood-option">O+</option>
            <option value="O-" className="blood-option">O-</option>
        </select>
    </div>

    

    <button onClick={save} >Save</button>
    
    </div>
)
}

export default MybioEdit;
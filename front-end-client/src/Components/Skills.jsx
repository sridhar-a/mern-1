import axios from "axios";
import React from "react";
import "./Skills.css";

const BACK_END_URI = import.meta.env.VITE_BACK_END_URI; 

export default function Skills() {
  const [skills, setSkills] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${BACK_END_URI}/skills`).then((response) => {
      console.log(typeof response.data);
      console.log(response.data);
      setSkills(response.data);
    });
  }, []);

  return (
    <>
    <h2>Hello Skills</h2>   
      {Object.keys(skills).map((item, i) => (
        <div className="skills-wrapper" key={i}>
          <p>{skills[item].name}</p>
          <div className="skill-container">
            <div
              className="skill"
              style={{
                width: `${skills[item].percent}%`,
                backgroundColor: "#04AA6D",
              }}
            >
              {skills[item].percent}%
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
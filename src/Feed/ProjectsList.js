import React, { useEffect } from "react";
import ProjectItem from "./ProjectItem";
import "./projectsList.css";

const ProjectsList = ({ projects, handleProjectInfoClick }) => {

    useEffect(() => {
        console.log("projects", projects)
    }, []);

    return (
        <div className="projects-list">
            { projects && typeof projects === 'object' &&
              projects?.map(item => <ProjectItem project={ item } key={ item.id } handleClick={handleProjectInfoClick}></ProjectItem>)
            }

        </div>
    )
}

export default ProjectsList;
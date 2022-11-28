import React from "react";
import ProjectItem from "./ProjectItem";
import "./projectsList.css";

const ProjectsList = ({ projects }) => {

    return (
        <div className="projects-list">
            { projects && typeof projects === 'object' &&
              projects.map(item => <ProjectItem project={ item } key={ item.id }></ProjectItem>)
            }
        </div>
    )
}

export default ProjectsList;
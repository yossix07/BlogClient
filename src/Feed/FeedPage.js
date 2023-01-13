import React, { useEffect, useRef, useState } from "react";
import ProjectsList from "./ProjectsList";
import { Button } from "react-bootstrap";
import { getAllProjects, getProjectsUserDontLike, getProjectsWithHigherVersionAndMoreThanAvgForks } from "../DB";
import "./feedPage.css";
import { getProjectNum } from "../DB"
import { useNavigate } from "react-router-dom";

const FeedPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [projectIndex, setProjectsIndex] = useState(0);
    const [projectsQuery, setProjectsQuery] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const queryVersion = useRef("");

    const projectsBatch = 50;
    
    // fetch projects from server
    async function fetchData() {
        if (projectsQuery === 0) {
            setProjects(await getAllProjects(projectIndex));
        }
        if (projectsQuery === 1) {
            setProjects(await getProjectsUserDontLike(localStorage.getItem('username'), projectIndex));
        }
        if (projectsQuery === 2) {
            setProjects(await getProjectsWithHigherVersionAndMoreThanAvgForks(queryVersion.current.value, projectIndex));
        }
    }

    // get all projects from server when page mount
    useEffect(() => {
        setProjectsQuery(0);
        fetchData();
    }, []);

    // get relavent projects when diffrent query is set or next/previous projects are required
    useEffect(() => {
        fetchData();
    }, [projectsQuery, projectIndex, refresh]);

    // display project info
    async function handleMoreInfoClick(projectId) {
        localStorage.setItem("projectId", projectId);
        navigate('/projectInfo');
    }

    // go to add project page
    function handleAddProject() {
        navigate('/addProject');
    }

    // go to users page
    function handleUsers() {
        navigate('/users');
    }

    // get next projects
    async function loadNextProjects() {
        const numberOfProjects = await getProjectNum();
        if (projectIndex + projectsBatch > numberOfProjects - projectsBatch - 1) {
            setProjectsIndex(numberOfProjects - projectsBatch)
        } else {
            setProjectsIndex(projectIndex + projectsBatch);
        }
    }
    // get previous projects
    function loadPreviousProjects() {
        if (projectIndex - projectsBatch < 0) {
            setProjectsIndex(0);
        } else {
            setProjectsIndex(projectIndex - projectsBatch);
        }
    }

    // change qurey mode to 'versions' only when the button is clicked and input isn't empty
    const handleVersionQuery = (e) => {
        if (e.target.tagName === 'BUTTON') {
            if (queryVersion.current.value != "") {
                setRefresh(refresh + 1);
                setProjectsQuery(2);
            } else {
                alert("Fill num of version");
            }
        }
    }

    return (
        <div className="feed-page">
            <div className="main-feed">
                <div className="projects-buttons-wrraper">
                    <Button variant="danger" onClick={handleUsers}>Users</Button>
                    <Button variant="danger" onClick={handleAddProject}>Add Project</Button>
                    <Button onClick={() => { setProjectsQuery(0) }} variant="info">All Projects</Button>
                    <Button onClick={() => { setProjectsQuery(1) }} variant="info">Projects You Didn't Hit Like Yet</Button>
                    <Button onClick={handleVersionQuery} variant="info">
                        Projects With More Than AVG Forks And above Version
                        <input ref={queryVersion} placeholder="Enter Version"></input>
                    </Button>
                    <Button onClick={loadPreviousProjects}>Previous Projects</Button>
                    <Button variant="warning"> Current Projects: {projectIndex} - {projectIndex + projectsBatch}</Button>
                    <Button onClick={loadNextProjects}>Next Projects</Button>
                </div>
                <ProjectsList className="projects-list" projects={projects} handleProjectInfoClick={handleMoreInfoClick}></ProjectsList>
            </div>
        </div>
    )
}
export default FeedPage;
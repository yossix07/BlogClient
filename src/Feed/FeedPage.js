import React, { useEffect, useRef, useState } from "react";
import ProjectsList from "./ProjectsList";
import { Button } from "react-bootstrap";
import { getAllProjects, getProjectsUserDontLike, getProjectsWithHigherVersionAndMoreThanAvgForks, getProjectInfo } from "../DB";
import "./feedPage.css";
import ProjectInfoPage from "../ProjectInfoPage/ProjectInfoPage";
import { getProjectNum } from "../DB"
import { useNavigate } from "react-router-dom";

const FeedPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [projectIndex, setProjectsIndex] = useState(0);
    const [projectsQuery, setProjectsQuery] = useState(0);
    const [ refresh, setRefresh] = useState(0);
    const queryVersion = useRef("");
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModeList, setIsModeList] = useState(true);
    var username = localStorage.getItem('username');

    const projectsBatch = 50;

    useEffect(() => {
        console.log("empty useEffect")
        async function fetchData() {
            if(projectsQuery === 0) {
                setProjects(await getAllProjects(projectIndex));
            }
            if(projectsQuery === 1) {
                setProjects(await getProjectsUserDontLike(localStorage.getItem('username'), projectIndex));
            }
            if(projectsQuery === 2) {
                setProjects(await getProjectsWithHigherVersionAndMoreThanAvgForks(queryVersion.current.value, projectIndex));
            }
        }
        setProjectsQuery(0);
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            if(projectsQuery === 0) {
                setProjects(await getAllProjects(projectIndex));
            }
            if(projectsQuery === 1) {
                setProjects(await getProjectsUserDontLike(localStorage.getItem('username'), projectIndex));
            }
            if(projectsQuery === 2) {
                console.log("useEffct 2")
                setProjects(await getProjectsWithHigherVersionAndMoreThanAvgForks(queryVersion.current.value, projectIndex));
            }
        }
        fetchData();
    }, [projectsQuery, projectIndex, isModeList, refresh]);

    async function handleMoreInfoClick (projectId) {
        // const info = await getProjectInfo(projectId);

        // if(info !== -1) {
        //     setSelectedProject(info);
        //     setIsModeList(false);
        // }

        localStorage.setItem("projectId", projectId);
        navigate('/projectInfo');
    }

    // const handleExitMoreInfo = () => {
    //     setSelectedProject(null);
    //     setIsModeList(true);
    // }

    function handleAddProject() {
        // window.location.replace('http://localhost:3000/addProject');
        navigate('/addProject');
    }

    function handleUsers() {
        // window.location.replace('http://localhost:3000/users');
        navigate('/users');
    }

    async function loadNextProjects() {
        const numberOfProjects = await getProjectNum();
        if(projectIndex + projectsBatch > numberOfProjects - projectsBatch - 1) {
            setProjectsIndex(numberOfProjects - projectsBatch)
        } else {
            setProjectsIndex(projectIndex + projectsBatch);
        }
    }

    function loadPreviousProjects() {
        if (projectIndex - projectsBatch < 0) {
            setProjectsIndex(0);
        } else {
            setProjectsIndex(projectIndex - projectsBatch);
        }
    }

    const handleVersionQuery= (e) => {
        if(e.target.tagName === 'BUTTON') {
            setRefresh(refresh + 1);
            console.log("in")
            setProjectsQuery(2);
        }
    }

    return (
        <div className="feed-page">
                {isModeList &&
                    <div className="main-feed">
                        <div className="projects-buttons-wrraper">
                            <Button variant="danger" onClick={handleUsers}>Users</Button>
                            <Button variant="danger" onClick={handleAddProject}>Add Project</Button>
                            <Button onClick={() => { setProjectsQuery(0) }} variant="info">All Projects</Button>
                            <Button onClick={() => { setProjectsQuery(1) }} variant="info">Projects You Didn't Hit Like Yet</Button>
                            <Button onClick={ handleVersionQuery } variant="info">
                                Projects With More Than AVG Forks And above Version
                                <input ref={queryVersion} placeholder="Enter Version"></input>
                            </Button>
                            <Button onClick={loadPreviousProjects}>Previous Projects</Button>
                            <Button variant="warning"> Current Projects: {projectIndex} - {projectIndex + projectsBatch}</Button>
                            <Button onClick={loadNextProjects}>Next Projects</Button>
                        </div>
                        <ProjectsList className="projects-list" projects={projects} handleProjectInfoClick={handleMoreInfoClick}></ProjectsList>
                    </div>
                }
                

        </div>
    )
}
// {!isModeList && <ProjectInfoPage projectProp={selectedProject} username={username} handleExit={handleExitMoreInfo}></ProjectInfoPage>}
export default FeedPage;
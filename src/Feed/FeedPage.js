import React, { useEffect, useRef, useState } from "react";
import ProjectsList from "./ProjectsList";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { getAllProjects, getProjectInfo } from "../DB";
import "./feedPage.css";
import ProjectInfoPage from "../ProjectInfoPage/ProjectInfoPage";

const FeedPage = ({ username }) => {
    const [projects, setProjects] = useState([]);
    const [projectIndex, setProjectsIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);

    const searchInput = useRef("");
    const [searchCategory, setSearchCategory] = useState("Name");
    const [isForkable, setIsForkable] = useState(false);
    const [isOpenIssue, setIsOpenIssue] = useState(false);

    const [isModeList, setIsModeList] = useState(true);

    const projectsBatch = 50;

    useEffect(() => {
        async function fetchData() {
            console.log("current logged user:", username);
            const p = await getAllProjects(projectIndex);
            console.log("getAllProjects in useEffect:", p);
            setProjects(p);
        }

        fetchData();
    }, []);

    const handleDropdownSelect = (e) => {
        setSearchCategory(e);
    }

    const handleSearch = () => {
        // send DB query and set to projects list
        console.log("Sending query to DB", searchInput.current.value, searchCategory, isForkable, isOpenIssue);
    }

    const hangleCheckboxChange = (e) => {
        if (e.target.name === "Forkable") {
            setIsForkable(e.target.checked);
        } else if (e.target.name === "OpenIssues") {
            setIsOpenIssue(e.target.checked);
        }
    }

    async function handleMoreInfoClick (projectId) {
        // setSelectedProject(projects.find(item => item.id === projectId));
        const info = getProjectInfo(projectId);
        if(info) {
            setSelectedProject(info);
        }
        setIsModeList(false);
    }

    const handleExitMoreInfo = () => {
        setSelectedProject(null);
        setIsModeList(true);
    }

    async function handleAddProject() {
        window.location.replace('http://localhost:3000/addProject');
    }

    function loadNextProjects() {

        // get number of project from db
        const numberOfProjects = 500;

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

    return (
        <div className="feed-page">
            {isModeList && 
            <div className="queries-buttons-wrapper">
                <Button variant="warning">Query 1</Button>
                <Button variant="info">Query 2</Button>
                <Button variant="danger">Query 3</Button>
                <Button variant="dark">Query 4</Button>
                <Button variant="secondary">Query 5</Button>
            </div>
            }
            <div className="main-feed">
                {isModeList &&
                    <>
                        <div className="search-wrapper">
                            <input ref={searchInput} placeholder="Enter Keywords" />
                            <div className="checkboxes-wrapper">
                                <Form.Check className="text-white" name="Forkable" type={'checkbox'} label={`Forkable`} onChange={hangleCheckboxChange} />
                                <Form.Check className="text-white" name="OpenIssues" type={'checkbox'} label={`Open Issues`} onChange={hangleCheckboxChange} />
                            </div>
                            <Dropdown as={ButtonGroup} onSelect={handleDropdownSelect}>
                                <Button onClick={handleSearch}>Search</Button>
                                <Dropdown.Toggle split id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Name">Name</Dropdown.Item>
                                    <Dropdown.Item eventKey="Platform">Platform</Dropdown.Item>
                                    <Dropdown.Item eventKey="Langague">Langague</Dropdown.Item>
                                    <Dropdown.Item eventKey="Status">Status</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <ProjectsList className="projects-list" projects={projects} handleProjectInfoClick={handleMoreInfoClick}></ProjectsList>
                    </>
                }
                {!isModeList && <ProjectInfoPage project={selectedProject} username={username} handleExit={handleExitMoreInfo}></ProjectInfoPage>}
            </div>
            { isModeList &&
            <div className="projects-buttons-wrraper">
                <Button onClick={loadPreviousProjects}>Previous Projects</Button>
                <Button variant="info" onClick={handleAddProject}>+</Button>
                <Button onClick={loadNextProjects}>Next Projects</Button>
            </div>
            }
        </div>
    )
}

export default FeedPage;
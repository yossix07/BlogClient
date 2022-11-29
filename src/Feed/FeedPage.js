import React, { useEffect, useRef, useState } from "react";
import ProjectsList from "./ProjectsList";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { getAllProjects } from "../DB";
import "./feedPage.css";
import ProjectInfoPage from "../ProjectInfoPage/ProjectInfoPage";

const FeedPage = ({ username }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    const searchInput = useRef("");
    const [searchCategory, setSearchCategory] = useState("Name");
    const [isForkable, setIsForkable] = useState(false);
    const [isOpenIssue, setIsOpenIssue] = useState(false);

    const [isModeList, setIsModeList] = useState(true);

    useEffect(() => {
        setProjects(getAllProjects());
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

    const handleMoreInfoClick = (projectId) => {
        setSelectedProject(projects.find(item => item.id === projectId));
        setIsModeList(false);
    }

    const handleExitMoreInfo = () => {
        setSelectedProject(null);
        setIsModeList(true);
    }

    return (
        <div className="feed-page">
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
        </div>
    )
}

export default FeedPage;
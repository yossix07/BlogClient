import React, { useEffect, useRef, useState } from "react";
import ProjectsList from "./ProjectsList";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "./feedPage.css";

const FeedPage = () => {
    const [projects, setProjects] = useState([]);

    const searchInput = useRef("");
    const [searchCategory, setSearchCategory] = useState("Name");
    const [isForkable, setIsForkable] = useState(false);
    const [isOpenIssue, setIsOpenIssue] = useState(false);

    useEffect(() => {
        setProjects(getProjects());
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

    const getProjects = () => {
        // send query to DB to get all projects
        return [
            { "id": 1, "name": "project_1", "homepage_url": "project_1.co.il", "repository_url": "git/project_1.com", "langague": "English", "status": "progress" },
            { "id": 2, "name": "project_2", "homepage_url": "project_2.com", "repository_url": "bitbucket/project_2.com", "langague": "Hebrew", "status": "Done" },
            { "id": 3, "name": "project_3", "homepage_url": "project_3.org", "repository_url": "git/project_3.com", "langague": "English", "status": "In progress" },
            { "id": 4, "name": "project_4", "homepage_url": "project_4.com", "repository_url": "bitbucket/project_4.com", "langague": "English", "status": "progress" },
            { "id": 5, "name": "project_5", "homepage_url": "project_5.com", "repository_url": "bitbucket/project_5.com", "langague": "English", "status": "Done" },
            { "id": 6, "name": "project_6", "homepage_url": "project_6.org", "repository_url": "git/project_6.com", "langague": "English", "status": "Done" },
            { "id": 7, "name": "project_7", "homepage_url": "project_7.co.il", "repository_url": "bitbucket/project_7.com", "langague": "Hebrew", "status": "progress" },
            { "id": 8, "name": "project_8", "homepage_url": "project_8.com", "repository_url": "git/project_8.com", "langague": "English", "status": "Done" },
        ]
    }

    return (
        <div className="feed-page">
            <div className="main-feed">
                <div className="search-wrapper">
                    <input ref={searchInput} placeholder="Enter Keywords"/>
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
                <ProjectsList className="projects-list" projects={projects}></ProjectsList>
            </div>

        </div>
    )
}

export default FeedPage;
import React ,{ useRef } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./AddProjectPage.css";
import Form from 'react-bootstrap/Form';
import { addProject } from "../DB";

const AddProjectPage = ({ username }) => { 
    const name = useRef("");
    const description = useRef("");
    const homePageUrl = useRef("");
    const repositoryUrl = useRef("");
    const language = useRef("");
    const hostType = useRef("");
    const repoNameWithOwner = useRef("");
    const size = useRef("");
    const starsCount = useRef("");
    const forksCount = useRef("");
    const versions = useRef("");
    var issuesEnabled = false;

    const parseVersions = () => {
        var versionsArray = []
        const splitedString = (versions.current.value).split(/(\s+)/);
        splitedString.map(version => {
            if(version != " ") {
                versionsArray.push({ "project_Id": 0, "number": version });
            }
        })
        return versionsArray;
    }

    const handleSubmit = () => {

        const versionsList = parseVersions();
        const currentTimestamp = new Date().toISOString();
        console.log("repoNameWithOwner in handle submit ", repoNameWithOwner.current.value, typeof repoNameWithOwner.current.value)

        if(addProject(name.current.value, currentTimestamp, description.current.value, homePageUrl.current.value, repositoryUrl.current.value, language.current.value,
            hostType.current.value, repoNameWithOwner.current.value, parseInt(size.current.value),
            parseInt(starsCount.current.value), issuesEnabled, parseInt(forksCount.current.value), versionsList)) {
                window.location.replace('http://localhost:3000/blog');
        }
    }

    const hangleCheckboxChange = () => {
        issuesEnabled = !issuesEnabled;
    }
    
    return (
    <div className="add-project-page">
        <Card>
        <Card.Body>
            <div className="add-project-form">
            <h2 className="fw-bold mb-2 text-uppercase">Add A New Project</h2>
            <h6>Please Fill Your Info!</h6>
            <br></br>
            <form id="addProjectForm" onSubmit={handleSubmit} noValidate>
                <div className="form-floating form-white text-dark mb-4">
                    <input ref={name} id="ProjectName" type="text" placeholder="Enter Project Name" className="form-control" autoFocus />
                    <label htmlFor="ProjectName" className="form-label">Project Name</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={description} id="description" type="text" placeholder="Enter Description" className="form-control" />
                    <label htmlFor="description" className="form-label">Description</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={homePageUrl} id="homePageUrl" type="text" placeholder="Enter Home Page Url" className="form-control" />
                    <label htmlFor="homePageUrl" className="form-label">Home Page Url</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={repositoryUrl} id="repositoryUrl" type="text" placeholder="Enter Repository Url" className="form-control" />
                    <label htmlFor="repositoryUrl" className="form-label">Repository Url</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={language} id="language" type="text" placeholder="Enter Language" className="form-control" />
                    <label htmlFor="language" className="form-label">Language</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={hostType} id="hostType" type="text" placeholder="Enter Host Type" className="form-control" />
                    <label htmlFor="hostType" className="form-label">Name</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={repoNameWithOwner} id="repoNameWithOwner" type="text" placeholder="Enter Repository Name With Owner" className="form-control" />
                    <label htmlFor="repoNameWithOwner" className="form-label">Repository Name With Owner</label>
                </div>
                
                <div className="form-floating form-white text-dark mb-4">
                    <input ref={size} id="size" type="text" placeholder="Enter Repository Size" className="form-control" />
                    <label htmlFor="size" className="form-label">Repository Size</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={starsCount} id="starsCount" type="text" placeholder="Enter Repository Stars Count" className="form-control" />
                    <label htmlFor="starsCount" className="form-label">Repository Stars Count</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={versions} id="versions" type="text" placeholder="Enter Versions" className="form-control" />
                    <label htmlFor="versions" className="form-label">Versions</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={forksCount} id="forksCount" type="text" placeholder="Enter Number Of Forks" className="form-control" />
                    <label htmlFor="forksCount" className="form-label">Number Of Forks</label>
                </div>

                <Form.Check className="text-black" name="OpenIssues" type={'checkbox'} label={`Open Issues`} onChange={hangleCheckboxChange} />

                <div className="button-wrapper">
                <Button id="sumbitAddProjectForm" variant="primary" type="submit">Submit</Button>
                </div>
            </form>
            <br></br>
                <div className="login-wrapper">
                    <Link to="/blog" className="fw-bold">Back</Link>
                </div>
            </div>
        </Card.Body>
        </Card>
    </div>
    )
}

export default AddProjectPage;
import Reactת ,{ useRef } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./AddProjectPage.css";

const AddProjectPage = ({ username }) => { 
    const name = useRef("");
    const projectCreatedTimeStamp = useRef("");
    const homePageUrl = useRef("");
    const platform = useRef("");
    const language = useRef("");
    const projectStatus = useRef("");
    const licenses = useRef("");
    const repositoryUrl = useRef("");
    const repoNameWithOwner = useRef("");
    const forkable = useRef("");
    const forksCount = useRef("");
    const repoCreatedTimeStamp = useRef("");
    const issuesEnabled = useRef("");
    const openIssuesCount = useRef("");
    const repoStatus = useRef("");


    const handleSubmit = () => {
        // POST project to db
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
                    <input ref={projectCreatedTimeStamp} id="projectCreatedTimeStamp" type="text" placeholder="Enter Project Created Timestamp" className="form-control" />
                    <label htmlFor="projectCreatedTimeStamp" className="form-label">Project Created Timestamp</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={homePageUrl} id="homePageUrl" type="text" placeholder="Enter Home Page Url" className="form-control" />
                    <label htmlFor="homePageUrl" className="form-label">Home Page Url</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={platform} id="platform" type="text" placeholder="Enter Platform" className="form-control" />
                    <label htmlFor="platform" className="form-label">Name</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={language} id="language" type="text" placeholder="Enter Language" className="form-control" />
                    <label htmlFor="language" className="form-label">Language</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={projectStatus} id="platform" type="text" placeholder="Enter Project Status" className="form-control" />
                    <label htmlFor="projectStatus" className="form-label">Project Status</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={licenses} id="licenses" type="text" placeholder="Enter Licenses" className="form-control" />
                    <label htmlFor="licenses" className="form-label">Licenses</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={repositoryUrl} id="repositoryUrl" type="text" placeholder="Enter Repository Url" className="form-control" />
                    <label htmlFor="repositoryUrl" className="form-label">Repository Url</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={repoNameWithOwner} id="repoNameWithOwner" type="text" placeholder="Enter Repository Name With Owner" className="form-control" />
                    <label htmlFor="repoNameWithOwner" className="form-label">Repository Name With Owner</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={forksCount} id="forksCount" type="text" placeholder="Enter Number Of Forks" className="form-control" />
                    <label htmlFor="forksCount" className="form-label">Number Of Forks</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={repoCreatedTimeStamp} id="repoCreatedTimeStamp" type="text" placeholder="Enter Repository Created Time Stamp" className="form-control" />
                    <label htmlFor="repoCreatedTimeStamp" className="form-label">Repository Created Time Stamp</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={openIssuesCount} id="openIssuesCount" type="text" placeholder="Enter Number Of Open Issues" className="form-control" />
                    <label htmlFor="openIssuesCount" className="form-label">Number Of Open Issues</label>
                </div>

                <div className="form-floating form-white text-dark mb-4">
                    <input ref={repoStatus} id="repoStatus" type="text" placeholder="Enter Repository Status" className="form-control" />
                    <label htmlFor="repoStatus" className="form-label">Repository Status</label>
                </div>

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
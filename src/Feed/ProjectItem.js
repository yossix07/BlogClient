import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./projectItem.css";

const ProjectItem = ({ project, handleClick }) => {

    return (
        <Card className="text-center">
            <Card.Header className="fw-bold">{project.name}</Card.Header>
            <Card.Body>
                {project.description}
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item variant="primary"><span className="fw-bold">Home Page Url-</span> { project.homepage_url }</ListGroup.Item>
                <ListGroup.Item variant="warning"><span className="fw-bold">Home Repository Url-</span> { project.repository_url }</ListGroup.Item>
                <ListGroup.Item variant="info"><span className="fw-bold">Project Status-</span> { project.status }</ListGroup.Item>
            </ListGroup>
            <Card.Footer className="likes-comments-wrapper">
                <div className="likes">100 likes</div>
                <Button variant="primary" onClick={()=> {handleClick(project.id)}}>More Information</Button>
                <div className="comments">15 comments</div>
            </Card.Footer>
        </Card>
    )
}

export default ProjectItem;
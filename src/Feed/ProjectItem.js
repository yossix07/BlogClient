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
                <ListGroup.Item variant="primary"><span className="fw-bold">Home Page Url-</span> { project.homepage_Url }</ListGroup.Item>
                <ListGroup.Item variant="warning"><span className="fw-bold">Home Repository Url-</span> { project.repository_Url }</ListGroup.Item>
            </ListGroup>
            <Card.Footer className="likes-comments-wrapper">
                <div className="likes">{project.likes_Count} likes</div>
                <Button variant="primary" onClick={()=> {handleClick(project.id)}}>More Information</Button>
                <div className="comments">{ project.comments_Count } comments</div>
            </Card.Footer>
        </Card>
    )
}

export default ProjectItem;
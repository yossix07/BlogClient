import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./projectItem.css";

const ProjectItem = ({ project }) => {
    return (
        <Card className="text-center">
            <Card.Header className="fw-bold">{project.name}</Card.Header>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{ project.homepage_url }</ListGroup.Item>
                <ListGroup.Item>{ project.repository_url }</ListGroup.Item>
                <ListGroup.Item>{ project.status }</ListGroup.Item>
            </ListGroup>
            <Card.Footer className="likes-comments-wrapper">
                <div className="likes">100 likes</div>
                <Button variant="primary">More Information</Button>
                <div className="comments">15 comments</div>
            </Card.Footer>
        </Card>
    )
}

export default ProjectItem;
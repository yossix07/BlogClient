import React, { useEffect, useState,useRef } from "react";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./projectInfoPage.css";
import CommentItem from "./CommentItem";
import { toggleLike } from "../DB"

const ProjectInfoPage = ({ project, username, handleExit }) => {

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const comment = useRef("");
    

    useEffect(() => {
        // get comments from DB 
        setComments([
            {"username":"user_1", "timestamp":"01/01/2022", "text":"hello world"},
            {"username":"user_2", "timestamp":"11/03/2022", "text":"hello world"},
            {"username":"user_3", "timestamp":"01/01/2000", "text":"user_3 first comment"},
            {"username":"user_3", "timestamp":"01/01/2001", "text":"user_3 second comment"}
            ])
    },[]);

    const handleLikeClick = () => {
        const currentTimestamp = new Date().toISOString();
        toggleLike(username, project.id, currentTimestamp);
    }

    const constCommentsClick = () => {
        setShowComments(!showComments);
    }

    async function hangleAddComment() {
        console.log(comment.current.value);
        comment.current.value = ""
    }

    return (
        <div className="project-info-page">
            <Card className="text-center">
                <Card.Header className="card-header" as="h5">
                    <div className="project-name">{project.name}</div>
                    <Button className="exit-button" variant="danger" onClick={handleExit}>X</Button>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{project.description}</Card.Title>
                    <ListGroup>
                        <div>Project Info-</div>
                        <ListGroup.Item variant="success"><span className="fw-bold">Project Created Timestamp-</span> </ListGroup.Item>
                        <ListGroup.Item variant="success"><span className="fw-bold">Home Page Url-</span> {project.homepage_url}</ListGroup.Item>
                        <ListGroup.Item variant="success"><span className="fw-bold">Platform-</span> {project.platform}</ListGroup.Item>
                        <ListGroup.Item variant="success"><span className="fw-bold">Language-</span> {project.language}</ListGroup.Item>
                        <ListGroup.Item variant="success"><span className="fw-bold">Status-</span> {project.status}</ListGroup.Item>
                        <ListGroup.Item variant="success"><span className="fw-bold">Licenses-</span> </ListGroup.Item>
                        <div>Repository Info-</div>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Repository Url-</span> {project.repository_url}</ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Repository Name With Owner-</span> </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Forkable?-</span> </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Forks Count-</span> </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Created Timestamp-</span> </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Issues Enabled-</span> </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Open Issues Count-</span> </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Status-</span> </ListGroup.Item>
                        <div>Keywords-</div>
                        <div>Versions List-</div>
                    </ListGroup>
                </Card.Body>
                <div className="buttons-wrapper">
                    <Button variant="primary" onClick={handleLikeClick}>
                        Likes <Badge bg="secondary">9</Badge>
                    </Button>
                    <Button variant="primary" onClick={constCommentsClick}>Comments <Badge bg="secondary">3</Badge> </Button>
                </div>
            </Card>
            {showComments && 
                <Card className="comments-list">
                    <Card.Header>
                        <input ref={comment} placeholder="Enter Comment"></input>
                        <Button variant="primary" onClick={hangleAddComment}>Add Comment</Button>
                        </Card.Header>
                    <Card.Body>
                        {
                        comments?.map(comment =>
                        <CommentItem username={comment.username} timestamp={comment.timestamp} text={comment.text}></CommentItem>)
                        }
                    </Card.Body>
                </Card>
            }
        </div>
    )
}

export default ProjectInfoPage;
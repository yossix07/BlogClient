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
    const comment = useRef("");
    
    useEffect(() => {
            console.log("ProjectInfoPage", project?.comments)
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
                    <div className="project-name">{project.project.name}</div>
                    <Button className="exit-button" variant="danger" onClick={handleExit}>X</Button>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{project.project.description}</Card.Title>
                    <ListGroup>
                        <div>Project Info-</div>
                        <ListGroup.Item variant="success"><span className="fw-bold">Project Created Timestamp-</span> </ListGroup.Item>
                        <ListGroup.Item variant="success"><span className="fw-bold">Home Page Url-</span> {project.project.homepage_Url}</ListGroup.Item>
                        <ListGroup.Item variant="success"><span className="fw-bold">Platform-</span> {project.project.platform}</ListGroup.Item>
                        <ListGroup.Item variant="success"><span className="fw-bold">Language-</span> {project.project.language}</ListGroup.Item>
                        <ListGroup.Item variant="success"><span className="fw-bold">Status-</span> {project.project.status}</ListGroup.Item>
                        <ListGroup.Item variant="success"><span className="fw-bold">Licenses-</span> </ListGroup.Item>
                        <div>Repository Info-</div>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Repository Url-</span> {project.project.repository_Url}</ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Repository Name With Owner-</span>{project.repositories.name_With_Owner} </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Forks Count-</span>{project.repositories.forks_count} </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Created Timestamp-</span>{project.repositories.created_Timestamp} </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Issues Enabled-</span>{project.repositories.issues_Enabled} </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Open Issues Count-</span>{project.repositories.open_Issues_Count} </ListGroup.Item>
                        <div>Versions List-</div>
                    </ListGroup>
                </Card.Body>
                <div className="buttons-wrapper">
                    <Button variant="primary" onClick={handleLikeClick}>
                        Likes <Badge bg="secondary">{project.project.likes_Count}</Badge>
                    </Button>
                    <Button variant="primary" onClick={constCommentsClick}>Comments <Badge bg="secondary">{project.comments.length}</Badge> </Button>
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
                        project.comments?.map((comment, index) =>
                        <CommentItem key={index} username={comment.userName} timestamp={comment.time} text={comment.text}></CommentItem>)
                        }
                    </Card.Body>
                </Card>
            }
        </div>
    )
}

export default ProjectInfoPage;
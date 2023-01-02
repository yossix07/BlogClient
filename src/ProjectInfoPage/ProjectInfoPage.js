import React, { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./projectInfoPage.css";
import CommentItem from "./CommentItem";
import { toggleLike, addComment } from "../DB"

const ProjectInfoPage = ({ project, username, handleExit }) => {
    const [showComments, setShowComments] = useState(false);
    const comment = useRef("");
    useEffect(() => {
        console.log("ProjectInfoPage", project)
    }, []);

    async function handleLikeClick() {
        const currentTimestamp = new Date().toISOString();
        toggleLike(username, project?.project.id, currentTimestamp);
    }

    const constCommentsClick = () => {
        setShowComments(!showComments);
    }

    async function hangleAddComment() {
        const currentTimestamp = new Date().toISOString();
        addComment(username, project?.project.id, currentTimestamp, comment.current.value)
        comment.current.value = ""
    }

    return (
        <div className="project-info-page">
            <Card className="text-center">
                <Card.Header className="card-header" as="h5">
                    <div className="project-name">{project?.project.name}</div>
                    <Button className="exit-button" variant="danger" onClick={handleExit}>X</Button>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{project?.project.description}</Card.Title>
                    <ListGroup>
                        <div>Project Info-</div>
                        <ListGroup.Item variant="success"><span className="fw-bold">Project Created Timestamp-</span>{project?.project.created_Timestamp} </ListGroup.Item>
                        <ListGroup.Item variant="success"><span className="fw-bold">Home Page Url-</span> {project?.project.homepage_Url}</ListGroup.Item>
                        <ListGroup.Item variant="success"><span className="fw-bold">Language-</span> {project?.project.language}</ListGroup.Item>
                        <div>Repository Info-</div>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Repository Url-</span> {project?.project.repository_Url}</ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Repository Name With Owner-</span>{project?.repository.name_With_Owner} </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Forks Count-</span>{project?.repository.forks_count} </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Issues Enabled-</span>{(project?.repository.issues_Enabled).toString()} </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Open Issues Count-</span>{(project?.repository.issues_Enabled).toString()} </ListGroup.Item>
                        <ListGroup.Item variant="warning"><span className="fw-bold">Stars Count-</span>{parseInt(project?.repository.stars_count)} </ListGroup.Item>

                        <div>Versions List-</div>
                        {project && typeof project === 'object' && project?.versions &&
                            (project?.versions).map(version =>
                                <ListGroup.Item variant="info"><span className="fw-bold">Version-</span> {version.number}</ListGroup.Item>
                            )}
                    </ListGroup>
                </Card.Body>
                <div className="buttons-wrapper">
                    <Button variant="primary" onClick={handleLikeClick}>
                        Likes <Badge bg="secondary">{project?.project.likes_Count}</Badge>
                    </Button>
                    <Button variant="primary" onClick={constCommentsClick}>Comments <Badge bg="secondary">{project?.comments.length}</Badge> </Button>
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
                            project?.comments?.map((comment, index) =>
                                <CommentItem key={index} username={comment.userName} timestamp={comment.time} text={comment.text}></CommentItem>)
                        }
                    </Card.Body>
                </Card>
            }
        </div>
    )
}

export default ProjectInfoPage;
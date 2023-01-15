import React, { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./projectInfoPage.css";
import CommentItem from "./CommentItem";
import { toggleLike, addComment, getProjectInfo } from "../DB"
import { useNavigate } from "react-router-dom";

const ProjectInfoPage = () => {
    const navigate = useNavigate();
    const [project, setProject] = useState({});
    const [comments, setComments] = useState({});
    const [likesCount, setLikesCount] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const comment = useRef("");
    const [isValid, setIsValid] = useState(false);

    // fetch project info
    useEffect(() => {
        async function fetchData() {
            const p = await getProjectInfo(localStorage.getItem("projectId"));
            setProject(p);
            if (p && typeof p === 'object') {
                setComments(p.comments);
                setLikesCount(p.project.likes_Count)
            }
        }
        fetchData();
    }, []);

    // validate project info
    useEffect(() => {
        if (project && Object.keys(project).length > 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [project])

    // toggle project like
    function handleLikeClick() {
        const currentTimestamp = new Date().toISOString();
        toggleLike(localStorage.getItem("username"), project?.project.id, currentTimestamp).then(result => {
            if (result) {
                getProjectInfo(localStorage.getItem("projectId")).then(p => {
                    setLikesCount(p.project.likes_Count)
                })
            }
        })
    }

    // display project's comments 
    const constCommentsClick = () => {
        setShowComments(!showComments);
    }

    // add comment
    async function hangleAddComment() {
        const username = localStorage.getItem("username");
        const currentTimestamp = new Date().toISOString();
        if (await addComment(username, project?.project.id, currentTimestamp, comment.current.value) == 200) {
            getProjectInfo(project.project.id).then(p => {
                setComments([{ "userName": username, "project_Id": project?.project.id, "text": comment.current.value, "time": currentTimestamp }, ...comments])
                setProject(p);
                comment.current.value = ""
            });
        } else {
            alert("Invalid comment")
        }
    }

    // returns to the blog page
    const handleExit = () => {
        localStorage.setItem("projectId", -1);
        navigate('/blog');
    }

    return (
        <div className="project-info-page">
            {isValid &&
                <Card className="info text-center">
                    <Card.Header className="card-header" as="h5">
                        <div className="project-name">{project.project.name}</div>
                        <Button className="exit-button" variant="danger" onClick={handleExit}>X</Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{project.project.description}</Card.Title>
                        <ListGroup>
                            <div>Project Info-</div>
                            <ListGroup.Item variant="success"><span className="fw-bold">Project Created Timestamp-</span>{project.project.created_Timestamp} </ListGroup.Item>
                            <ListGroup.Item variant="success"><span className="fw-bold">Home Page Url-</span> {project.project.homepage_Url}</ListGroup.Item>
                            <ListGroup.Item variant="success"><span className="fw-bold">Language-</span> {project.project.language}</ListGroup.Item>
                            <div>Repository Info-</div>
                            <ListGroup.Item variant="warning"><span className="fw-bold">Repository Url-</span> {project.project.repository_Url}</ListGroup.Item>
                            <ListGroup.Item variant="warning"><span className="fw-bold">Repository Name With Owner-</span>{project.repository.name_With_Owner} </ListGroup.Item>
                            <ListGroup.Item variant="warning"><span className="fw-bold">Forks Count-</span>{project.repository.forks_count} </ListGroup.Item>
                            <ListGroup.Item variant="warning"><span className="fw-bold">Issues Enabled-</span>{(project.repository.issues_Enabled).toString()} </ListGroup.Item>
                            <ListGroup.Item variant="warning"><span className="fw-bold">Open Issues Count-</span>{(project.repository.issues_Enabled).toString()} </ListGroup.Item>
                            <ListGroup.Item variant="warning"><span className="fw-bold">Stars Count-</span>{parseInt(project.repository.stars_count)} </ListGroup.Item>

                            <div>Versions List-</div>
                            {project && typeof project === 'object' && project.versions &&
                                (project.versions).map((version, index) =>
                                    <ListGroup.Item key={index} variant="info"><span className="fw-bold">Version-</span> {version.number}</ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card.Body>
                    <div className="buttons-wrapper">
                        <Button variant="primary" onClick={handleLikeClick}>
                            Likes <Badge bg="secondary">{likesCount}</Badge>
                        </Button>
                        <Button variant="primary" onClick={constCommentsClick}>Comments <Badge bg="secondary">{project.comments.length}</Badge> </Button>
                    </div>
                </Card>}
            {isValid && showComments &&
                <Card className="comments-list">
                    <Card.Header>
                        <input ref={comment} placeholder="Enter Comment"></input>
                        <Button variant="primary" onClick={hangleAddComment}>Add Comment</Button>
                    </Card.Header>
                    <Card.Body>
                        {
                            comments.map((comment, index) =>
                                <CommentItem key={index} username={comment.userName} timestamp={comment.time} text={comment.text}></CommentItem>)
                        }
                    </Card.Body>
                </Card>
            }
        </div>
    )
}

export default ProjectInfoPage;
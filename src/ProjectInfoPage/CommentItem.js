import React from "react";
import { Card } from "react-bootstrap";

const CommentItem = ({username, timestamp, text}) => {
    return (
        <Card className="comment-item">
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
            <Card.Footer>{timestamp}</Card.Footer>
        </Card>
    ) 
}

export default CommentItem;
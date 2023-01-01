import React, { useState, useEffect } from "react";
import { getUsersWithMoreThanAvgCommentsNum } from "../DB"
import { Button, Card } from "react-bootstrap";
import "./UsersPage.css";

const UsersPage = () => {
    const [users, setUsers ] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setUsers(await getUsersWithMoreThanAvgCommentsNum());
        }
        fetchData();
    }, []);

    const handleExit = () => {
        window.location.replace('http://localhost:3000/blog');
    }

    return (
        <div className="users-page">
            <Card>
                <Card.Title className="bold">
                    Users With More Than Average Number Of Comments
                    <Button onClick={ handleExit } variant="danger">X</Button>
                </Card.Title>
                <Card.Body>
                {users && typeof users === 'object' &&
                    users.map(user => 
                    <Card className="user-item">
                        <Card.Body> {user.userName} </Card.Body>
                    </Card>
                )}
                </Card.Body>
                
            </Card>
        </div>
    )
}

export default UsersPage;
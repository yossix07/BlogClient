import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersWithMoreThanAvgCommentsNum } from "../DB"
import { Button, Card } from "react-bootstrap";
import "./UsersPage.css";

const UsersPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    // fetch users
    useEffect(() => {
        async function fetchData() {
            setUsers(await getUsersWithMoreThanAvgCommentsNum());
        }
        fetchData();
    }, []);

    // return to blog
    const handleExit = () => {
        navigate('/blog');
    }

    return (
        <div className="users-page">
            <Card>
                <Card.Title className="bold">
                    Users With More Than Average Number Of Comments
                    <Button onClick={handleExit} variant="danger">X</Button>
                </Card.Title>
                <Card.Body>
                    {users && typeof users === 'object' &&
                        users.map((user, index) =>
                            <Card key={index} className="user-item">
                                <Card.Body> {user.userName} </Card.Body>
                            </Card>
                        )}
                </Card.Body>

            </Card>
        </div>
    )
}

export default UsersPage;
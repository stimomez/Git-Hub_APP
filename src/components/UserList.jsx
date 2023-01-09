import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLoading } from "../store/slices/user";



const UserList = ({ users }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="p-5"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(255px, 450px))",
        gap: "30px",
        justifyContent: "center",
      }}
    >
      {users.map((user) => (
        <Card  key={user.id}>
          <Card.Img variant="top" src={user.avatar_url} />
          <Card.Body>
            <Card.Title className="text-uppercase">{user.login}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <Link to={`users/${user.id}`}>
              <Button
                variant="outline-info"
                className="px-5"
                onClick={() => {
                  dispatch(isLoading(true));
                  window.scrollTo(0, 0);
                }}
              >
                {" "}
                More Information
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export default UserList;

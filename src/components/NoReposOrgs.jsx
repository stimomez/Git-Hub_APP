import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const NoReposOrgs = ({ userr, noRepos }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (userr.user === "repo") {
      setUser(userr.user);
    } else if (userr.user === "org") {
      setUser(userr.user);
    } else {
      setUser(userr.user);
    }
  }, [userr]);
  console.log(user);

  return (
    <div>
      {user.login ? (
        <h3 className="text-uppercase fs-1 text-primary">
          {user && user.login}
        </h3>
      ) : (
        <p>
          <br />
        </p>
      )}

      <Card className="mx-auto" style={{ width: "24%", minWidth: "12rem" }}>
        <Card.Img
          variant="top"
          src="https://media3.giphy.com/media/3og0IvGtnDyPHCRaYU/giphy.gif"
        />
        <Card.Body>
          <Card.Title>
            <span>
              No <br />
            </span>
            {user === "repo"
              ? "Repository"
              : user === "org"
              ? "Organization"
              : "Information"}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoReposOrgs;

import React, { useEffect, useState } from "react";


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
    <>
      {user.login ? (
        <h2 className="sub-title">{user && user.login}</h2>
      ) : (
        <p>
          <br />
        </p>
      )}

      <div className="card">
        <img
          className="card__img"
          src="https://media3.giphy.com/media/3og0IvGtnDyPHCRaYU/giphy.gif"
          alt=""
        />

        <div>
          <span>
            No <br />
          </span>
          {user === "repo"
            ? "Repository"
            : user === "org"
            ? "Organization"
            : "Information"}
        </div>
      </div>
    </>
  );
};

export default NoReposOrgs;

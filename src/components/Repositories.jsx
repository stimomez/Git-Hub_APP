import Aos from "aos";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import "../styles/repositories.css";

const Repositories = ({ repositories, userr }) => {
  const [clipBoard, setClipBoard] = useState(0);
  const navigate = useNavigate();
  const { orgRepos } = useSelector((state) => state.users);
  const repos = repositories || orgRepos;
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useEffect(() => {
    if (!repos.length) {
      navigate("/");
    }
  }, [repos, navigate]);

  const user = userr || "ORGANIZATION";
  const gitClone = (id) => {
    setClipBoard(id);
    setTimeout(() => {
      setClipBoard(0);
    }, 1000);
  };
  const redirectHome = () => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <>
      <h2 className="title">{user}</h2>

      <h4 className="sub-title"> Repositories</h4>

      {repos.map((repo) => (
        <ul className="card" data-aos="zoom-in-up" key={repo.id}>
          <li className="card__title">{repo.name}</li>
          <li className="card__li">{repo.description}</li>
          <span className="card__li">Git Clone</span>
          <div className="card__url">
            <p className="card__p">{repo.clone_url}</p>
            <div className="copy-clip">
              <span
                className="copy-clip--copy"
                onClick={() => gitClone(repo.id)}
              >
                <CopyToClipboard text={repo.clone_url}>
                  <i
                    className={`${
                      repo.id === clipBoard
                        ? "fa-solid fa-check"
                        : " fa-regular fa-copy"
                    }`}
                  ></i>
                </CopyToClipboard>
              </span>
              {repo.id === clipBoard && (
                <span className="copy-clip--copied">Copied </span>
              )}
            </div>
          </div>
          <a className="card__links" href={repo.clone_url} target="blank">
            <span className="card__link--redirect" onClick={redirectHome}>
              go
            </span>
          </a>
        </ul>
      ))}
    </>
  );
};

export default Repositories;

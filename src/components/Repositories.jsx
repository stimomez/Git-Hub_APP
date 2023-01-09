import Aos from "aos";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
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
      <h3 className="text-uppercase fs-1 text-primary">{user}</h3>

      <div className="p-1 ">
        <h4 className="text-start px-5 text-info"> Repositories</h4>

        <div
          className=""
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 550px))",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {repos.map((repo) => (
            <Card
              data-aos="zoom-in-up"
              style={{ background: "#e2e2e2", color: "#120907" }}
              key={repo.id}
            >
              <Card.Body className="d-flex flex-column align-items-center justify-content-around rounded shadow-lg">
                <Card.Title className="text-uppercase fw-bold fs-4  container">
                  {repo.name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted container">
                  {repo.description}
                </Card.Subtitle>
                <span>Git Clone</span>
                <div className="d-flex justify-content-around shadow  px-2 rounded container ">
                  <Card.Text
                    style={{ width: "80%", fontSize: "12px" }}
                    className="my-auto align-items-center  "
                  >
                    {repo.clone_url}
                  </Card.Text>
                  <div className="row px-2 align-items-center position-relative">
                    <span
                      style={{ cursor: "pointer" }}
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
                      <span className="row mt-4 p-1 position-absolute">
                        Copied{" "}
                      </span>
                    )}
                  </div>
                </div>

                <Card.Link
                  className="text-decoration-none text-uppercase mt-3 border px-4 py-1 button-link"
                  href={repo.clone_url}
                  target="_blank"
                >
                  <span onClick={redirectHome}>go</span>
                </Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Repositories;

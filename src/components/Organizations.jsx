import Aos from "aos";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoading, setOrganizationRepos } from "../store/slices/user";
import NoReposOrgs from "./NoReposOrgs";
import "aos/dist/aos.css";


const Organizations = ({ orgs }) => {
  const [isOrgRepos, setIsOrgRepos] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    useEffect(() => {
      Aos.init({ duration: 2000 });
    }, []);

  const requestRepos = async (org) => {
    dispatch(isLoading(true));

    try {
      const res = await axios.get(org);
      
      if (res.data.length) {
        dispatch(setOrganizationRepos(res.data));
        window.scrollTo(0, 0);

        navigate("/users/org-repos");
        setTimeout(() => {
          dispatch(isLoading(false));
        }, 2000);
      } else {
        console.log("entre");
        setIsOrgRepos(true);
        setTimeout(() => {
          dispatch(isLoading(false));
        }, 2000);
      }

      if (res) {
        //  dispatch(isLoading(false));
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isOrgRepos) {
    return (
      <>
 
        <NoReposOrgs userr={{ user: "repo" }} />
      </>
    );
  } else {
    return (
      <div>
        <h4 className="text-start px-5 text-info mt-4"> Organizations</h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 400px))",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {orgs.map((org) => (
            <Card
              data-aos="zoom-out"
              style={{ background: "#f3eae8" }}
              key={org.id}
            >
              <Card.Img
                className="p-5 rounded py-1"
                variant="top"
                src={org.avatar_url}
              />
              <Card.Body className="d-flex flex-column align-items-center justify-content-around rounded shadow-lg">
                <Card.Title className="text-uppercase container">
                  {org.login}
                </Card.Title>
                <Card.Text className="container">{org.description}</Card.Text>
                <Button
                  className="container"
                  style={{ padding: "0 9px ", border: "0" }}
                  variant="outline-info"
                  onClick={() => {
                    requestRepos(org.repos_url);
                  }}
                >
                  View Repositories
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
};

export default Organizations;

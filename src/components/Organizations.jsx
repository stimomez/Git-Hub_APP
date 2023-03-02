import Aos from "aos";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoading, setOrganizationRepos } from "../store/slices/user";
import NoReposOrgs from "./NoReposOrgs";
import "aos/dist/aos.css";
import "../styles/organization.css";
import "../styles/repositories.css";

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
      <>
        <h4 className="sub-title"> Organizations</h4>

        <ul className="ul-organization">
          {orgs.map((org) => (
            <ul
              className="ul__container container"
              data-aos="zoom-out"
              style={{ background: "#f3eae8" }}
              key={org.id}
            >
              <img className="container__img" src={org.avatar_url} alt="" />
              <h3 className="container__h3">{org.login}</h3>
              <p className="container__p">{org.description}</p>
              <button
                className="container__button--view"
                onClick={() => {
                  requestRepos(org.repos_url);
                }}
              >
                View Repositories
              </button>
            </ul>
          ))}
        </ul>
      </>
    );
  }
};

export default Organizations;

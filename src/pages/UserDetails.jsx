import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Repositories from "../components/Repositories";
import "../styles/user-details.css";
import { isLoading } from "../store/slices/user";
import Organizations from "../components/Organizations";
import NoReposOrgs from "../components/NoReposOrgs";
const UserDetails = () => {
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [isRepos, setIsRepos] = useState(false);
  useEffect(() => {
    setIsRepos(false);
  }, []);

  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  if (user === undefined) {
    dispatch(isLoading(true));
    navigate("/");
  }
  useEffect(() => {
    const filteredUser = users.find((user) => user.id === Number(id));
    setUser(filteredUser);
  }, [id, users]);
  useEffect(() => {
    const requestUser = async () => {
      try {
        const res = await axios.get(user.repos_url);
        setRepos(res.data);
        setIsRepos(true);
        if (res) {
          dispatch(isLoading(false));
        }
      } catch (error) {
        console.log(error);
      }
    };
    const requestOrg = async () => {
      try {
        const res = await axios.get(user.organizations_url);
        setOrgs(res.data);
      } catch (error) {}
    };
    requestUser();
    requestOrg();
  }, [user, dispatch]);
  if ((repos.length || orgs.length) && isRepos) {
    return (
      <>
        {repos.length ? (
          <Repositories repositories={repos} userr={user.login} />
        ) : (
          <NoReposOrgs userr={{ user: "repo" }} />
        )}
        {orgs.length && isRepos ? (
          <Organizations orgs={orgs} />
        ) : (
          <NoReposOrgs userr={{ user: "org" }} />
        )}
      </>
    );
  } else if (isRepos && !repos.length && !orgs.length) {
    return (
      <>
        <NoReposOrgs userr={{ user }} />
      </>
    );
  }
};

export default UserDetails;

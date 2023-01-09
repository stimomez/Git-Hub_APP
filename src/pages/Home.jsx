import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../components/UserList";
import { getAllUsers, isLoading } from "../store/slices/user";


const Home = () => {
  const [search, setSearch] = useState("");
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();


  useEffect(() => {
    setTimeout(() => {
      dispatch(isLoading(false));
    }, 1000);
  }, [dispatch]);

  const request = (user) => {
    dispatch(getAllUsers(user));
  };

  const reset = () => {
    setSearch("");
  };

  return (
    <div className=" text-center ">
      <h3 className=" text-uppercase fs-1 mt-4 fw-bold text-primary">
        git hub
      </h3>
      <form className="container">
        <h6 htmlFor="user" className=" text-start text-light">
          User
        </h6>
        <Form.Control
          type="text"
          id="user"
          onChange={({ target }) => {
            setSearch(target.value);
          }}
          value={search}
        />
        <Button
          style={{ width: "25%", minWidth: "150px" }}
          className="mt-1 fs-3 text-uppercase rounded bottom mx-auto"
          type="submit"
          variant="outline-success"
          disabled={!search}
          onClick={() => {
            request(search);
            reset();
          }}
        >
          search
        </Button>
      </form>

      <UserList users={users} />
    </div>
  );
};

export default Home;

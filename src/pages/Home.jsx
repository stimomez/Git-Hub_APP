import { useEffect, useState } from "react";
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
      dispatch(getAllUsers('stimomez'));
    }, 1000);
  }, [dispatch]);

  const request = (user) => {
    dispatch(getAllUsers(user));
  };

  const reset = () => {
    setSearch("");
  };

  return (
    <>
      <h3 className="title">git hub</h3>
      <form className="form">
        <label htmlFor="user" className="form__label">
          User
        </label>
        <input
          className="form__input"
          type="text"
          id="user"
          onChange={({ target }) => {
            setSearch(target.value);
          }}
          value={search}
          placeholder={'Stimomez'}
        />
        <button
          className="form__button--submit"
          type="submit"
          variant="outline-success"
          disabled={!search}
          onClick={() => {
            request(search);
            reset();
          }}
        >
          search
        </button>
      </form>
      <div className="user-list">
        <UserList users={users} />
      </div>
    </>
  );
};

export default Home;

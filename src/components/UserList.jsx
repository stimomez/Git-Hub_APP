import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLoading } from "../store/slices/user";
import "../styles/user-list.css";

const UserList = ({ users }) => {
  const dispatch = useDispatch();

  return (
    <>
      {users.map((user) => (
          <ul className="ul" key={user.id}>
            <img className="ul__img" src={user.avatar_url} alt="" />

            <h1 className="ul__title">{user.login}</h1>

            <Link to={`users/${user.id}`}>
              <button
                className="form__button--submit ul__button--submit"
                onClick={() => {
                  dispatch(isLoading(true));
                  window.scrollTo(0, 0);
                }}
              >
                {" "}
                More Information
              </button>
            </Link>
          </ul>
      ))}
    </>
  );
};

export default UserList;

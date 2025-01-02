import { useSelector, useDispatch } from "react-redux";
import User from "./User";
import { deleteUser } from "../app/features/users/usersSlice";

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.list);

  return (
    <div className="w-11/12 mx-auto mt-5">
      {users.map((user) => (
        <User
          key={user.id}
          {...user}
          deleteUser={() => dispatch(deleteUser({ id: user.id }))}
        />
      ))}
    </div>
  );
};
export default Users;

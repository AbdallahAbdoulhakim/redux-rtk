const User = ({ name, phone, email, deleteUser }) => {
  return (
    <div className="bg-green-300 text-slate-600 rounded-md p-5 mt-2 flex justify-between items-center">
      <div>
        <h1>Name: {name}</h1>
        <p>Phone :{phone}</p>
        <p>Email : {email}</p>
      </div>
      <div>
        <button
          onClick={deleteUser}
          className="bg-green-200 p-2 rounded-md hover:bg-green-100 active:scale-95"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default User;

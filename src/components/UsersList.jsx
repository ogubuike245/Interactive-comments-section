const UsersList = ({ userData, currentUser, handleUserSelection }) => {
  return (
    <>
      <h2>SELECT A USER</h2>
      <ul className="users-list">
        {userData.map((user) => (
          <li
            className={currentUser.username === user.username ? "active" : ""}
            key={user.username}
            onClick={() => handleUserSelection(user)}
          >
            <div className="image">
              <img src={user.image.png} alt="" />
            </div>
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersList;

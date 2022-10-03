import React from "react";

function ListUser({ id, username, user_role, user_balance, user_savings, handlerButtonEdit }) {
  function handlerClickEdit(e) {
    e.preventDefault();
    handlerButtonEdit({ id, username, user_role, user_balance, user_savings });
  }

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{username}</td>
        <td>{user_role}</td>
        <td>{user_balance}</td>
        <td>{user_savings}</td>
        <td>
          <button className="editButton" onClick={handlerClickEdit}>
            Edit
          </button>
        </td>
      </tr>
    </>
  );
}
export default ListUser;

import styled from "styled-components";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import ListUser from "./ListUser";
import { Error, Input, FormField, Label } from "../styles";
function ManageUser() {
  const [userData, setUserData] = useState([]);
  const [userID, setUserID] = useState();
  const [username, setUsername] = useState();
  const [userMoney, setUserMoney] = useState();
  const [userRole, setUserRole] = useState();
  const [userBalance, setUserBalance] = useState();
  const [userSavings, setUserSavings] = useState();

  const [showEdit, setShowEdit] = useState(false);
  const handleAddMoney = (e) => {
    userData.map((dat) => {
      if (dat.id == userID) {
        const totalBalance = dat.user_balance + parseInt(userMoney, 10);
        const totalSavings = dat.user_savings + parseInt(userMoney, 10);
        return fetch(`/users/${userID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_balance: totalBalance,
            user_savings: totalSavings,
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then();
            Swal.fire({
              title: "User Add Money",
              text: "Successfully Add Money!",
              icon: "success",
            });
            e.target.reset();
          }
        });
      }
    });
  };

  useEffect(() => {
    fetch("/users_data").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUserData(data);
          console.log(data);
        });
      }
    });
  }, [showEdit]);
  function handlerButtonEdit(val) {
    // console.log(val);
    setShowEdit(true);
    setUserID(val.id);
    setUsername(val.username);
    setUserBalance(val.user_balance);
    setUserSavings(val.user_savings);
    setUserRole(val.user_role);
  }

  const displayAllUsers = userData.map((data) => {
    return <ListUser key={data.id} id={data.id} username={data.username} user_role={data.user_role} user_balance={data.user_balance} user_savings={data.user_savings} handlerButtonEdit={handlerButtonEdit} />;
  });

  function handleUpdateUser(e) {
    e.preventDefault();
    fetch(`/users/${userID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_role: userRole,
        user_balance: userBalance,
        user_savings: userSavings,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(
          Swal.fire({
            title: "Item Edit",
            text: "Successfully Edit!",
            icon: "success",
          })
        );
        setShowEdit(false);
      }
    });
  }
  function handleDeleteUser() {
    fetch(`/users/${userID}`, {
      method: "DELETE",
    }).then(() => {
      Swal.fire({
        title: "User Delete",
        text: "Successfully Delete!",
        icon: "success",
      });
      setShowEdit(false);
    });
  }
  return (
    <>
      <Wrapper>
        <div>
          <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-8 align-self-end">
              <h1 className="font-weight-bold">Manage User</h1>
            </div>
          </div>
        </div>
        {showEdit ? (
          <>
            <form>
              <FormField>
                <Label htmlFor="name">Username</Label>
                <Input disabled type="text" value={username} />
              </FormField>
              <FormField>
                <Label htmlFor="type">User Role</Label>
                <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </FormField>
              <FormField>
                <Label htmlFor="balance">User Balance</Label>
                <Input
                  required
                  type="number"
                  value={userBalance}
                  onChange={(e) => {
                    setUserBalance(e.target.value);
                  }}
                />
              </FormField>
              <FormField>
                <Label htmlFor="balance">User Savings</Label>
                <Input
                  required
                  type="number"
                  value={userSavings}
                  onChange={(e) => {
                    setUserSavings(e.target.value);
                  }}
                />
              </FormField>

              <FormField>
                <Button type="submit" variant="primary" onClick={handleUpdateUser}>
                  Edit item
                </Button>
                <Button variant="outline-danger" onClick={handleDeleteUser}>
                  Delete User
                </Button>
                <Button
                  variant="outline-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowEdit(false);
                  }}
                >
                  Cancel
                </Button>
              </FormField>
            </form>
          </>
        ) : (
          <>
            <Table striped bordered hover variant="dark" style={{}}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>User Role</th>
                  <th>User Balance</th>
                  <th>User Savings</th>
                  <th>Button</th>
                </tr>
              </thead>
              <tbody>{displayAllUsers}</tbody>
            </Table>
            <form onSubmit={handleAddMoney}>
              <FormField>
                <Label htmlFor="type">User Name</Label>
                <select
                  required
                  onChange={(e) => {
                    setUserID(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  {userData.map((data) => {
                    return <option value={data.id}>{data.username}</option>;
                  })}
                </select>
              </FormField>
              <FormField>
                <Label htmlFor="price">Add Money</Label>
                <Input
                  required
                  type="number"
                  placeholder="$"
                  onChange={(e) => {
                    setUserMoney(e.target.value);
                  }}
                />
              </FormField>
              <FormField>
                <Button type="submit">Add Money</Button>
              </FormField>
            </form>
          </>
        )}
      </Wrapper>
    </>
  );
}
const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default ManageUser;

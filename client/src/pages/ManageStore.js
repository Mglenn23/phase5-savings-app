import styled from "styled-components";
import { Error, Input, FormField, Label } from "../styles";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ListItem from "./ListItem";
import Swal from "sweetalert2";
import Axios from "axios";

function ManageStore({ user }) {
  const [dataItem, setDataItem] = useState([]);

  // const [value, setValue] = useState("");
  const [itemID, setItemID] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(1);
  const [itemType, setItemType] = useState("Toy");
  const [itemImg, setItemImg] = useState("");
  const [errors, setErrors] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showButton, setShowButton] = useState(true);

  // const [imageSelected, setImageSelected] = useState("");

  function handlerButtonEdit(val) {
    console.log(val);
    setShowEdit(true);
    setErrors([]);
    setShowButton(false);
    setItemID(val.id);
    setItemName(val.item_name);
    setItemPrice(val.item_price);
    setItemType(val.item_type);
    setItemImg(val.item_url);
  }

  useEffect(() => {
    fetch("/item_data").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setDataItem(data);
          console.log(data);
        });
      }
    });
  }, [showCreate, showEdit]);

  const displayAllItem = dataItem.map((data) => {
    return <ListItem key={data.id} id={data.id} item_name={data.item_name} item_price={data.item_price} item_type={data.item_type} item_url={data.item_url} handlerButtonEdit={handlerButtonEdit} />;
  });

  const handleChange = (event) => {
    setItemPrice(event.target.value);
  };
  function handleDeleteItem() {
    fetch(`/items/${itemID}`, {
      method: "DELETE",
    }).then((r) => {
      Swal.fire({
        title: "Item Delete",
        text: "Successfully Delete!",
        icon: "success",
      });
      setShowEdit(false);
      setShowButton(true);
    });
  }
  function handleUpdateItem(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", itemImg);
    formData.append("upload_preset", "zeyjrzcj");

    Axios.post("https://api.cloudinary.com/v1_1/dgncyyv7n/image/upload", formData).then((res) => {
      // setImageSelected(res.data.secure_url);
      console.log(res.data.secure_url);

      fetch(`/items/${itemID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: itemName,
          item_price: itemPrice,
          item_type: itemType,
          item_url: res.data.secure_url,
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
          setShowButton(true);
          e.target.reset();
          setItemPrice();
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", itemImg);
    formData.append("upload_preset", "zeyjrzcj");

    Axios.post("https://api.cloudinary.com/v1_1/dgncyyv7n/image/upload", formData).then((res) => {
      // setImageSelected(res.data.secure_url);
      console.log(res.data.secure_url);

      fetch("/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: itemName,
          item_price: itemPrice,
          item_type: itemType,
          item_url: res.data.secure_url,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then(
            Swal.fire({
              title: "Item Created",
              text: "Successfully added!",
              icon: "success",
            })
          );
          e.target.reset();
          setItemPrice();
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    });
  };

  return (
    <Wrapper>
      <div>
        <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-8 align-self-end">
            <h1 className="font-weight-bold">Manage Store</h1>
          </div>
        </div>
      </div>
      {user.user_role == "admin" ? (
        <>
          <div className="d-flex justify-content-between">
            {showButton ? (
              <>
                <Button
                  variant="secondary"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowCreate(true);
                  }}
                >
                  Create Item
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowCreate(false);
                  }}
                >
                  Item List
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
          {showCreate ? (
            <>
              <form onSubmit={handleSubmit}>
                <FormField>
                  <Label htmlFor="name">Item Name</Label>
                  <Input required type="text" onChange={(e) => setItemName(e.target.value)} />
                </FormField>
                <FormField>
                  <Label htmlFor="price">Item Price</Label>
                  <Input required type="number" placeholder="Price $" onChange={handleChange} />
                </FormField>
                <FormField>
                  <Label htmlFor="type">Item Type</Label>
                  <select onChange={(e) => setItemType(e.target.value)}>
                    <option value="Toy">Toy</option>
                    <option value="Food">Food</option>
                    <option value="School">School</option>
                    <option value="Etc">Etc</option>
                  </select>
                </FormField>
                <FormField>
                  <Label htmlFor="image">Item Image URL</Label>
                  <Input required type="file" onChange={(e) => setItemImg(e.target.files[0])} />
                </FormField>
                <FormField>
                  {errors.map((err) => (
                    <Error key={err}>{err}</Error>
                  ))}
                </FormField>
                <FormField>
                  <Button type="submit">Add item</Button>
                </FormField>
              </form>
            </>
          ) : (
            <>
              {showEdit ? (
                <>
                  <form onSubmit={handleUpdateItem}>
                    <FormField>
                      <Label htmlFor="name">Item Name</Label>
                      <Input required type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    </FormField>
                    <FormField>
                      <Label htmlFor="price">Item Price</Label>
                      <Input required type="number" value={itemPrice} placeholder="Price $" onChange={handleChange} />
                    </FormField>
                    <FormField>
                      <Label htmlFor="type">Item Type</Label>
                      <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                        <option value="Toy">Toy</option>
                        <option value="Food">Food</option>
                        <option value="School">School</option>
                        <option value="Etc">Etc</option>
                      </select>
                    </FormField>
                    <FormField>
                      <Label htmlFor="image">Item Image URL</Label>
                      <Input type="file" onChange={(e) => setItemImg(e.target.files[0])} />
                    </FormField>
                    <FormField>
                      {errors.map((err) => (
                        <Error key={err}>{err}</Error>
                      ))}
                    </FormField>
                    <FormField>
                      <Button type="submit" variant="primary">
                        Edit item
                      </Button>
                      <Button variant="outline-danger" onClick={handleDeleteItem}>
                        Delete Item
                      </Button>
                      <Button
                        variant="outline-warning"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowEdit(false);
                          setShowButton(true);
                        }}
                      >
                        Cancel
                      </Button>
                    </FormField>
                  </form>
                </>
              ) : (
                <>
                  <Table striped bordered hover variant="dark" style={{ textAlign: "center" }}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Item Type</th>
                        <th>Item Url</th>
                        <th>Button</th>
                      </tr>
                    </thead>
                    <tbody>{displayAllItem}</tbody>
                  </Table>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>Not Authorized</>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin: 10px auto;
`;

export default ManageStore;

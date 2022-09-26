import styled from "styled-components";
import { Error, Input, FormField, Label } from "../styles";
import { useState } from "react";

import Button from "react-bootstrap/Button";
function ManageStore({ user }) {
  const [value, setValue] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(1);
  const [itemType, setItemType] = useState("Toy");
  const [itemImg, setItemImg] = useState("");
  const [errors, setErrors] = useState([]);

  const [showCreate, setShowCreate] = useState(false);

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");
    setValue(result);
    setItemPrice(result);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const addItem = {
      item_name: itemName,
      item_price: itemPrice,
      item_type: itemType,
      item_url: itemImg,
    };
    console.log(addItem);
    fetch("/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_name: itemName,
        item_price: itemPrice,
        item_type: itemType,
        item_url: itemImg,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then();
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };
  return (
    <Wrapper>
      {user.user_role == "admin" ? (
        <>
          <div className="d-flex justify-content-between">
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
                  <Input required type="text" placeholder="Price $" value={value} onChange={handleChange} />
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
                  <Input type="text" onChange={(e) => setItemImg(e.target.value)} />
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
            <>false</>
          )}
        </>
      ) : (
        <>Not Authorized</>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default ManageStore;

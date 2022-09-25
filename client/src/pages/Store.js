import styled from "styled-components";
import { Button, Error, Input, FormField, Label } from "../styles";
import { useState } from "react";
function Store({ user }) {
  const [value, setValue] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(1);
  const [itemType, setItemType] = useState("Toy");
  const [itemImg, setItemImg] = useState("");

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
      item_img: itemImg,
    };
    console.log(addItem);
  };
  return (
    <Wrapper>
      {user.user_role == "admin" ? (
        <>
          <form onSubmit={handleSubmit}>
            <FormField>
              <Label htmlFor="name">Item Name</Label>
              <Input type="text" onChange={(e) => setItemName(e.target.value)} />
            </FormField>
            <FormField>
              <Label htmlFor="price">Item Price</Label>
              <Input type="text" placeholder="Price $" value={value} onChange={handleChange} />
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
              <Button type="submit">Add item</Button>
            </FormField>
            <FormField>
              {/* {errors.map((err) => (
                <Error key={err}>{err}</Error>
              ))} */}
            </FormField>
          </form>
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

export default Store;

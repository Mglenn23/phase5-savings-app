import styled from "styled-components";

function HomePage({ user }) {
  console.log(user);
  return <Wrapper>{user.user_role == "admin" ? <>Admin</> : <>User</>}</Wrapper>;
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default HomePage;

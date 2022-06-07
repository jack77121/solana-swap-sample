import styled from 'styled-components';

const Header = () => {
  return (
    <Layout>
      <Title>Solana sample swap</Title>
    </Layout>
  );
};

export default Header;

const Layout = styled.div`
  width: 100%;
  height: 64px;
  background-color: #141041;
  box-sizing: border-box;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 32px;
  color: #fff;
  font-family: Montserrat;
  font-weight: bold;
`;

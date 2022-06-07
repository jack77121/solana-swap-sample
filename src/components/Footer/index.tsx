import styled from 'styled-components';

const Footer = () => {
  return (
    <Layout>
      @2022. Made by&nbsp;
      <a href="mailto:jack77121@gmail.com" style={{ textDecoration: 'none', color: '#b9caf3' }}>
        Jack
      </a>
    </Layout>
  );
};

export default Footer;

const Layout = styled.div`
  width: 100%;
  height: 32px;
  background-color: #141041;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b9caf3;
`;

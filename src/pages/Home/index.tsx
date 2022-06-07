import styled from 'styled-components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Home = () => {
  return (
    <Layout>
      <Header />
      <BodyLayout>body</BodyLayout>
      <Footer />
    </Layout>
  );
};

export default Home;

const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BodyLayout = styled.div`
  width: 100%;
  flex-grow:1;
  background-color: yellow;
  display: flex;
  box-sizing: border: box;
  padding: 16px;
`;

import styled from 'styled-components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Swap from '../../components/Swap';

const Home = () => {
  return (
    <Layout>
      <Header />
      <BodyLayout>
        <Swap />
      </BodyLayout>
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
  flex-grow: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
`;

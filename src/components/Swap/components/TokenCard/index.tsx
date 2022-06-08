import styled from 'styled-components';
import { list, IList } from '../../list';
import InputNumber from '../../../../components/Input/number';

interface ITokenCard {
  title?: string;
  balance?: string;
  disabledInput?: boolean;
  onChange?: Function;
  token?: IList;
}

const TokenCard: React.FC<ITokenCard> = ({ title, balance, disabledInput = false, onChange, token }) => {
  return (
    <Layout>
      <Head>
        <div>{title ? title : ''}</div>
        <div>Balance: {balance ? balance : '--'}</div>
      </Head>
      <Body>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <img style={{ width: 30, height: 30 }} src={token!.logo} alt="token-logo" />
          <TokenName>{token?.name}</TokenName>
        </div>
        <InputNumber disabled={disabledInput} />
      </Body>
    </Layout>
  );
};

export default TokenCard;

const Layout = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #606aa0;
  font-size: 12px;
  margin: 8px 0px;
`;

const Body = styled.div`
  width: 100%;
  margin: 4px 0px 8px 0px;
`;

const TokenName = styled.div`
  color: #606aa0;
  font-size: 20;
  font-weight: bold;
  margin-left: 8px;
`;

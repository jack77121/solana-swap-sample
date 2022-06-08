import Card from '../Card';
import TokenCard from './components/TokenCard';
import { list } from './list';
import ReverseIcon from '../../assets/images/msic-swap.svg';
import Button from '../../components/Button';
import styled from 'styled-components';

const Swap = () => {
  return (
    <Card>
      <TokenCard title="From" token={list[0]} />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          style={{
            width: 30,
            height: 30,
            borderRadius: 25,
            border: '2px solid #308df2',
            padding: 4,
            margin: '4px 0px',
            cursor: 'pointer',
          }}
          src={ReverseIcon}
          alt="reverse-icon"
        />
      </div>

      <TokenCard title="To" token={list[1]} disabledInput={true} />
      <ErrorMsg style={{ height: 32 }}>test error msg</ErrorMsg>
      <Button title="Swap" />
    </Card>
  );
};

export default Swap;

const ErrorMsg = styled.div`
  width: 100%;
  min-height: 32px;
  color: red;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0px;
`;

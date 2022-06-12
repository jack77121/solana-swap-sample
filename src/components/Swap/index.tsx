import Card from '../Card';
import TokenCard from './components/TokenCard';
import { list } from './list';
import ReverseIcon from '../../assets/images/msic-swap.svg';
import Button from '../../components/Button';
import styled from 'styled-components';
import txSwap from '../../application/swap/txSwap';
import { useErrorMsg } from '../../application/err/useErrorMsg';
import { useCallback, useEffect } from 'react';
import { useSwap } from '../../application/swap/useSwap';
import useToken from '../../application/token/useToken';
import { QuantumSOLVersionSOL } from '../../application/token/utils/quantumSOL';
import { RAYMint } from '../../application/token/utils/wellknownToken.config';

const Swap = () => {
  const errorMsg = useErrorMsg((s) => s.msg);
  const getToken = useToken((s) => s.getToken);
  const coin1 = useSwap((s) => s.coin1);
  const coin2 = useSwap((s) => s.coin2);
  const coin1Amount = useSwap((s) => s.coin1Amount);
  const coin2Amount = useSwap((s) => s.coin2Amount);

  useEffect(() => {
    const { coin1, coin2 } = useSwap.getState();
    if (!coin1) {
      useSwap.setState({ coin1: QuantumSOLVersionSOL });
    }
    if (!coin2) {
      useSwap.setState({ coin2: getToken(RAYMint) });
    }
  });

  useEffect(() => {
    console.log('coin 1 amount: ', coin1Amount);
    console.log('coin 2 amount: ', coin2Amount);
    console.log('coin1: ', coin1);
    console.log('coin2: ', coin2);
  }, [coin1Amount, coin2Amount, coin2, coin1]);

  const onChangeCoin1 = useCallback((e: any) => {
    console.log('coin1 input trigger');
    useSwap.setState({ coin1Amount: e.target.value });
  }, []);

  const onChangeCoin2 = useCallback((e: any) => {
    console.log('coin2 input trigger');
    useSwap.setState({ coin2Amount: e.target.value });
  }, []);

  return (
    <Card>
      <TokenCard title="From" token={list[0]} onChange={onChangeCoin1} />
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

      <TokenCard
        title="To"
        token={list[1]}
        disabledInput={true}
        onChange={onChangeCoin2}
        value={coin2Amount}
      />
      <ErrorMsg style={{ height: 32 }}>{errorMsg}</ErrorMsg>
      <Button title="Swap" onClick={txSwap} />
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

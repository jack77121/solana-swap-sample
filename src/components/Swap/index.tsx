import { useState } from 'react';
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
import useWallet from '../../application/wallet/useWallet';

const Swap = () => {
  const errorMsg = useErrorMsg((s) => s.msg);
  const getToken = useToken((s) => s.getToken);
  const coin1 = useSwap((s) => s.coin1);
  const coin2 = useSwap((s) => s.coin2);
  const coin1Amount = useSwap((s) => s.coin1Amount);
  const coin2Amount = useSwap((s) => s.coin2Amount);
  const reverse = useSwap((s) => s.directionReversed);
  const { getBalance, pureBalances, balances } = useWallet();

  const [myBalance, setMyBalance] = useState({
    sol: '',
    ray: '',
  });

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
    setMyBalance({
      sol: getBalance(coin1?.mint)?.toExact() || '',
      ray: getBalance(coin2?.mint)?.toExact() || '',
    });
  }, [coin2, coin1, getBalance, pureBalances, balances]);

  const onChangeCoin1 = useCallback((e: any) => {
    console.log('coin1 input trigger');
    useSwap.setState({ coin1Amount: e.target.value });
  }, []);

  const onChangeCoin2 = useCallback((e: any) => {
    console.log('coin2 input trigger');
    useSwap.setState({ coin2Amount: e.target.value });
  }, []);

  const reverseSwap = useCallback(() => {
    useSwap.setState((p) => ({
      directionReversed: !p.directionReversed,
    }));
  }, []);

  return (
    <Card>
      <TokenCard
        title="From"
        token={reverse ? list[1] : list[0]}
        onChange={reverse ? onChangeCoin2 : onChangeCoin1}
        balance={reverse ? myBalance.ray : myBalance.sol}
      />
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
          onClick={reverseSwap}
        />
      </div>

      <TokenCard
        title="To"
        token={reverse ? list[0] : list[1]}
        disabledInput={true}
        onChange={reverse ? onChangeCoin1 : onChangeCoin2}
        value={reverse ? coin1Amount : coin2Amount}
        balance={reverse ? myBalance.sol : myBalance.ray}
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

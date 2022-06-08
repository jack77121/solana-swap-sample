import styled from 'styled-components';

interface IInputNumber {
  disabled?: boolean;
}

const InputNumber: React.FC<IInputNumber> = ({ disabled = false }) => {
  return <Input type="number" disabled={disabled} />;
};

export default InputNumber;

const Input = styled.input`
  width: 100%;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  outline: none;
  border-bottom: 2px solid #606aa0;
  background-color: transparent;
  text-align: right;
  font-size: 24px;
  font-family: Montserrat;
  font-weight: bold;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

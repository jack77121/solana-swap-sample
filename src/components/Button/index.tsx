import styled from 'styled-components';

interface IButton {
  disabled?: boolean;
  title: string;
}

const Button: React.FC<IButton> = ({ title, disabled = false }) => {
  return <Layout disabled={disabled}>{title}</Layout>;
};

export default Button;

const Layout = styled.button`
  width: 100%;
  font-size: 20px;
  color: white;
  background-color: #512da8;
  border-radius: 25px;
  border: 1px solid #606aa0;
  cursor: pointer;
  padding: 6px;
`;

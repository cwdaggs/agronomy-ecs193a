import styled from 'styled-components';

const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 15px;
  padding: 8px 30px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;

  &:hover {
    background-color: #f1f1f1;
  }
  
  &:disabled{
    color: white;
    opacity: 0.7;
  }
  @media (max-width: 1350px) {
    padding: 6px 25px;
    font-size: 13px;
  }

  @media (max-width: 1000px) {
    padding: 5px 20px;
    font-size: 11px;
  }

  @media (max-width: 730px) {
    padding: 4px 15px;
    font-size: 10px;
  }

  @media (max-width: 350px){
    padding: 3px 10px;
    font-size: 9px;
  }
`;

const Tab = styled.button`
  padding: 15px 60px;
  cursor: pointer;
  font: 20px Public Sans, sans-serif;
  font-weight: 400;
  opacity: 0.7;
  background: white;
  border: 0;
  outline: 0;
  ${({active}) => 
  active && `
  // border-bottom: 2px solid black;
  opacity: 1;
  `}
  @media (max-width: 1350px) {
    padding: 15px 40px;
    font: 17px Public Sans, sans-serif;
  }
  @media (max-width: 1000px) {
    padding: 15px 30px;
    font: 12px Public Sans, sans-serif;
  }

  @media (max-width: 730px) {
    padding: 10px 20px;
    font: 10px Public Sans, sans-serif;
  }

  @media (max-width: 545px) {
    padding: 10px 10px;
  }

  @media (max-width: 400px) {
    padding: 8px;
  }

  @media (max-width: 350px) {
    font-size: 8px;
  }

  @media (max-width: 300px) {
    padding: 7px;
    font-size: 7px;
  }
`;

export {Tab, Button}
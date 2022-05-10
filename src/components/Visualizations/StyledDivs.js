import styled from "styled-components";
import { Visualizations } from "../Pages/Visualization";


const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  // background-color: #333;
`;

const StyledLi = styled.li`
  float: left;
`;

const Dropbtn = styled.div`
  background-color: white;
  display: inline-block;
  color: #00263A;
  text-align: center;
  padding: 10px 16px;
  text-decoration: none;
  border-top: 1px solid white;
  border-bottom: 1px solid gray;
  border-left: 3px solid #f1f1f1;
  border-right: 5px solid white;
  border-radius: 0px;
  &:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 1200px) {
    padding: 5px 10px;
    font-size: 8px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-left: 5px solid white;
    border-right: 5px solid white;
    border-radius: 25px;
  }

  @media (max-width: 375px) {
    padding: 3px 5px;
    font-size: 6px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-left: 5px solid white;
    border-right: 5px solid white;
    border-radius: 25px;  
  }
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropDownLi = styled(StyledLi)`
  display: inline-block;
  // &:hover {
  //   background-color: red;
  // }
  &:hover ${DropDownContent} {
    display: block;
  }
  &:active ${DropDownContent} {
    display: block;
  }
`;

const SubA = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: #f1f1f1;
  }
  @media (max-width: 950px) {
    padding: 15px 40px;
    font: 15px Metropolis, sans-serif;
    font-weight: 800;
  }

  @media (max-width: 675px) {
    padding: 10px 20px;
    font: 10px Metropolis, sans-serif;
    font-weight: 800;
  }

  @media (max-width: 380px) {
    padding: 10px 10px;
  }
`;

const Tab = styled.button`
  padding: 35px 60px;
  cursor: pointer;
  font-size: 25px;
  font-family: Metropolis,sans-serif; 
  opacity: 0.7;
  background: white;
  border: 0;
  outline: 0;
  &:hover {
    background-color: #f1f1f1;
  }
  ${({active}) => 
  active && `
  border-bottom: 2px solid black;
  opacity: 1;
  `}
`;

const TabHome = styled.button`
  cursor: pointer;
  font-size: 25px;
  font-family: ABeeZee, serif; 
  opacity: 0.7;
  background: white;
  border: 0;
  outline: 0;
  &:hover {
    background-color: #f1f1f1;
  }
  ${({active}) => 
  active && `
  border-bottom: 2px solid black;
  opacity: 1;
  `}
`;

const TabVisualizations = styled.button`
  padding: 5% ;
  cursor: pointer;
  font-family: Metropolis,sans-serif; 
  font-weight: bold;
  font-size: 16px;
  text-align: center; 
  opacity: 0.7;
  background: white;
  border: 2%;
  outline: 1%;
  width:100%;
  height:100%;
  padding:10px;
  &:hover {
    background-color: #f1f1f1;
  }
  ${({active}) => 
  active && `
  border-bottom: 2px solid black;
  opacity: 1;
  `}
  @media (max-width: 1350px) {
    padding: 8px;
    font-size: 14px;
  }
  @media (max-width: 1000px) {
    padding: 6px;
    font-size: 12px;
  }

  @media (max-width: 800px) {
    padding: 4px;
    font-size: 10px;
  }

  @media (max-width: 650px) {
    padding: 2px;
    font-size: 6px;
  }

  @media (max-width: 400px){
    padding: 5px 1px;
    font-size: 4px;
  }
`;

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  &:disabled{
    color: grey;
    opacity: 0.7;
  }
`;

const ButtonSwitch = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
`;


export {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA, Tab, Button, ButtonGroup, ButtonSwitch, TabVisualizations, TabHome};
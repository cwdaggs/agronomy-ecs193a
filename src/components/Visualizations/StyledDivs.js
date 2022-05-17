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

  @media (max-width: 420px) {
    padding: 5px 8px;
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
padding: 16px 42px;
box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
line-height: 1.25;
cursor: pointer;
font-family: Public Sans, sans-serif;
background: #A6B78C;
text-decoration: none;
color: white;
font-size: 16px;
letter-spacing: .08em;
text-transform: uppercase;
position: relative;
transition: background-color .6s ease;
overflow: hidden;
&:after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  top: 50%;
  left: 50%;
  top: var(--mouse-y);
  left: var(--mouse-x);
  transform-style: flat;
  transform: translate3d(-50%,-50%,0);
  background: rgba(white,.1);
  border-radius: 100%;
  transition: width .3s ease, height .3s ease;
}

&:focus,
&:hover {
    background: #FC6E51;
}

${({active}) => 
  active && `
  &:after {
    width: 300px;
    height: 300px;
  }
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
    font-size: 5px;
  }

  @media (max-width: 350px) {
    padding: 1px;
  }

  @media (max-width: 300px) {
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
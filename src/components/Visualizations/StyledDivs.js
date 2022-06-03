import styled from "styled-components";

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
  border-left: 1px solid white;
  border-right: 1px solid white;
  margin-left: 10px;
  margin-right: 10px;
  &:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 1200px) {
    padding: 5px 10px;
    font-size: 8px;
    margin-left: 6px;
    margin-right: 6px;
  }

  @media (max-width: 420px) {
    padding: 5px 8px;
    margin-left: 3px;
    margin-right: 3px;
    font-size: 6px;
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

const TabHome = styled.button`
padding: 16px 42px;
box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
line-height: 1.25;
cursor: pointer;
font-family: Public Sans, sans-serif;
background: #A6B78C;
text-decoration: none;
color: white;
font-size: 20px;
position: relative;
transition: background-color .6s ease;
overflow: hidden;
border-radius: 10px;
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
    background: #3399FF;
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
  font-family: Public Sans,sans-serif; 
  font-weight: bold;
  font-size: 15px;
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
    font-size: 11.5px;
  }
  @media (max-width: 1000px) {
    padding: 6px;
    font-size: 10px;
  }

  @media (max-width: 800px) {
    padding: 4px;
    font-size: 9px;
  }

  @media (max-width: 650px) {
    padding: 2px;
    font-size: 5.5px;
  }

  @media (max-width: 400px){
    font-size: 4.5px;
  }

  @media (max-width: 350px) {
    padding: 1px;
  }

  @media (max-width: 300px) {
    font-size: 4px;
  }
`;

export {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA, TabVisualizations, TabHome};
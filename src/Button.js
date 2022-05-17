import React, { useState } from 'react'
import styled from 'styled-components';
import "typeface-abeezee";
import "@fontsource/metropolis";

const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 15px;
  padding: 8px 30px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  
  &:disabled{
    color: white;
    opacity: 0.7;
  }
    @media (max-width: 1350px) {
    padding: 6px 25px;
    font-size: 15px;
    font-weight: 800;
  }
  @media (max-width: 1000px) {
    padding: 15px 30px;
    font: 12px Metropolis, sans-serif;
    font-weight: 800;
  }

  @media (max-width: 730px) {
    padding: 10px 20px;
    font: 10px Metropolis, sans-serif;
    font-weight: 800;
  }

  @media (max-width: 545px) {
    padding: 10px 10px;
  }

  @media (max-width: 400px){
    padding: 7px;
    font-size: 8px;
  }
`;

const Tab = styled.button`
  padding: 15px 60px;
  cursor: pointer;
  font: 20px Metropolis, sans-serif;
  font-weight: 800;
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
    font: 17px Metropolis, sans-serif;
    font-weight: 800;
  }
  @media (max-width: 1000px) {
    padding: 15px 30px;
    font: 12px Metropolis, sans-serif;
    font-weight: 800;
  }

  @media (max-width: 730px) {
    padding: 10px 20px;
    font: 10px Metropolis, sans-serif;
    font-weight: 800;
  }

  @media (max-width: 545px) {
    padding: 10px 10px;
  }

  @media (max-width: 400px){
    padding: 7px;
    font-size: 8px;
  }
`;

const CropTab = styled.button`
  padding: 15px 30px;
  cursor: pointer;
  font-size: 20px;
  font-family: ABeeZee, serif; 
  opacity: 0.7;
  background: white;
  border: 0;
  outline: 0;
  ${({active}) => 
  active && `
  // border-bottom: 2px solid black;
  opacity: 1;
  `}
`;

const types = ['Home', 'Explore Results', 'Info', 'About'];

function ToggleGroup() {
    const [active, setActive] = useState(types[0]);
    return (
      <ButtonGroup>
        {types.map(type => (
          <ButtonSwitch
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </ButtonSwitch>
        ))}
      </ButtonGroup>
    );
  }

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

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange}/>
      {label}
    </label>
  );
};

function TabGroup(props){
    const [active, setActive] = useState(types[0]);

    function changeTab(type) {
      setActive(type)
      props.changeFunc(type);
    }

    return(
      
            <div>
                {types.map(type => (
                    <Tab
                        key={type}
                        active={active === type}
                        onClick={() => changeTab(type)}
                        >{type}
                    </Tab>
                ))}
            </div>
      
    );
}

export {TabGroup, ToggleGroup, Checkbox, Tab, Button}
import React, { useState } from 'react'
import styled from 'styled-components';
import "typeface-abeezee";
import "@fontsource/metropolis";

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

const Tab = styled.button`
  padding: 35px 60px;
  cursor: pointer;
  font: 30px Metropolis, sans-serif;
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

export {TabGroup, ToggleGroup, Checkbox}
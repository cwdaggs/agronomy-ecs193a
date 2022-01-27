import React, { useState } from 'react'
import { GrowerConcern } from './GrowerConcern';
import styled from 'styled-components';

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
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.7;
  background: white;
  border: 0;
  outline: 0;
  ${({active}) => 
  active && `
  border-bottom: 2px solid black;
  opacity: 1;
  `}
`;

const types = ["Rice", "Wheat", "Corn"]


function ToggleGroup() {
    const [active, setActive] = useState(types[0]);
    return (
      <ButtonGroup>
        {types.map(type => (
          <ButtonSwitch
            key={type}
            active={active === type}
            onClick={() => {  
              setActive(type);
              }
            }
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


function TabGroup(){
    const [active, setActive] = useState(types[0]);
    return(
        <>
            <div>
                {types.map(type => (
                    <Tab
                        key={type}
                        active={active === type}
                        onClick={() => { 
                          setActive(type);

                          }
                        }
                        >{type}
                    </Tab>
                ))}
            </div>
                <p><b>{active}</b> Data: </p>

                <GrowerConcern filter={active}/>
                
        </>
        
    );
}

export {TabGroup, ToggleGroup}
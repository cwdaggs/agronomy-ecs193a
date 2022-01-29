import React, { useState } from 'react'
//import { GrowerConcern } from './GrowerConcerns';
//import { ConsultantConcern } from './ConsultantConcerns';
import styled from 'styled-components';
//import { useDataGrowers, getFarmersCrops } from '../UseDataGrowers';
//import { useDataConsultant } from '../UseDataConsultant';
import { useData, getFarmersCrops } from '../UseData';
import {Concerns} from './Concerns_vis'

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

function GetTypes(dataset){
  return getFarmersCrops(dataset, "Crops")
  
}

function ToggleGroup() {
    const types = GetTypes()
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
    const dataset_Growers = useData('./Grower_Crop_Data.csv');
    const dataset_Consultant = useData('./Consultant_Crop_Data.csv');
    const types = GetTypes(dataset_Growers);
    const [active, setActive] = useState("Barley");
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
                <div className='rowC'>
                  <Concerns 
                    filter={active} 
                    dataset_full={dataset_Growers}
                    population={"Growers"}
                  />
                  <Concerns 
                    filter={active} 
                    dataset_full={dataset_Consultant}
                    population={"Consultants"}
                  />
                </div>        
                
        </>

        
        
    );
}

export {TabGroup, ToggleGroup}
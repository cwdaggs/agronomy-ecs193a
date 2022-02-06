import React, { useState } from "react";
import styled from "styled-components";
import { useData, getFarmersCrops } from '../UseData';
//import {Concerns} from './Concerns_vis'
import {ConcernsVictory} from './Concerns_victory'

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
`;

const StyledLi = styled.li`
  float: left;
`;

const Dropbtn = styled.div`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
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
  &:hover {
    background-color: red;
  }
  &:hover ${DropDownContent} {
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
`;

const Tab = styled.button`
  padding: 35px 60px;
  cursor: pointer;
  font-size: 30px;
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

function GetTypes(dataset){
    return getFarmersCrops(dataset, "Crops") 
}

function ConcernsMenu() {

  const dataset_Growers = useData('./data/Grower_Crop_Data.csv');
  const dataset_Consultant = useData('./data/Consultant_Crop_Data.csv');
  const dataset_Other = useData('././data/Other_Crop_Data.csv');

  const types = GetTypes(dataset_Growers);
  const [active, setActive] = useState("Barley");
  
    return (
        
        <>
            <div>
                <StyledUl>
                    <DropDownLi>
                    <Dropbtn onClick={() => this.handleClick("DropDown")}>
                        Filter Crops
                    </Dropbtn>
                    <DropDownContent>
                        {" "}
                        {types.map(type => (
    
                            <SubA 
                                key={type}
                                active={active === type}
                                onClick={() => { 
                                    setActive(type);
                                    }
                                }
                                >{type}
                            </SubA>

                            ))}
                    </DropDownContent>
                    </DropDownLi>
                </StyledUl>
            </div> 
            <p><b>{active}</b> Data: </p>
            <div className='row' align-items='center'>
            
            </div>
            
            <div align-items='center'>
            <ConcernsVictory 
                filter={active} 
                myDataset={dataset_Growers}
                population={"Growers"}
            />
            </div>
        </>     
      
    )
}
export {ConcernsMenu};
import React, { useState } from "react";
import styled from "styled-components";
import { useData, getFarmersCrops } from '../UseData';
import {Concerns} from './Concerns_vis'

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

const StyledA = styled.a`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  &:hover {
    background-color: red;
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

function GetTypes(dataset){
    return getFarmersCrops(dataset, "Crops") 
}

function Menu() {

  const dataset_Growers = useData('./Grower_Crop_Data.csv');
  const dataset_Consultant = useData('./Consultant_Crop_Data.csv');
  const types = GetTypes(dataset_Growers);
  const [active, setActive] = useState("Barley");
  
    return (
        
        <>
            <div>
                <StyledUl>
                    <DropDownLi>
                    <Dropbtn onClick={() => this.handleClick("DropDown")}>
                        DropDown
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
      
    )
}

export {Menu};
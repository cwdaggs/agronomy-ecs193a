import React, { useState } from "react";
import {getFarmersCrops } from './UseData.js';
import { PrimaryGrowingReasons } from "./PrimaryGrowingReasons.js";
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from './StyledDivs.js';

function GetTypes(dataset){
    return getFarmersCrops(dataset, "Crops") 
}

function PrimaryGrowingReasonsMenu(props) {

  const dataset = props.dataset
  const types = GetTypes(dataset);
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
                  onClick={() => {setActive(type);}}
                  >{type}
              </SubA>
              ))}
            </DropDownContent>
        </DropDownLi>
      </StyledUl>
    </div> 
    <p><b >{active}</b> Data: </p>
    <div className='row' align-items='center'> </div>
    <div align-items='center'>
    <PrimaryGrowingReasons filter={active} myDataset={dataset} population={"Growers"}/>
    </div>
    </>     
  )
}
export {PrimaryGrowingReasonsMenu};
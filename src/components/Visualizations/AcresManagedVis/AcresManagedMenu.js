import React, { useState } from "react";
import {getFarmersCrops } from '../UseData';
import {AcresManagedBarChart} from './AcresManaged.js';
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from '../StyledDivs';

function GetTypes(dataset){
    return getFarmersCrops(dataset, "Crops") 
}

function AcresManagedMenu(props) {

  const dataset = props.dataset
  const types = GetTypes(dataset);
  const [active, setActive] = useState("Barley");
  
  return (
    <>
    <div>
      <StyledUl>
        <DropDownLi>
          <Dropbtn onClick={() => this.handleClick("DropDown")}>
            Filter by Crop
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
    <AcresManagedBarChart filter={active} dataset={dataset}/>
    </div>
    </>     
  )
}
export {AcresManagedMenu};
import React, { useState } from "react";
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from '../StyledDivs';



export function OnlyCrops(props) {
    const [activeName, setActiveName] = useState("Select Crop");

    const types = [
      "All", 
      "Alfalfa", 
      "Barley", 
      "Corn", 
      "Corn Silage", 
      "Cotton", 
      "Dry Beans", 
      "Rice", 
      "Small Grain Silage", 
      "Sunflower", 
      "Wheat"
    ];
    return (
        <>
          
            <StyledUl>
              <DropDownLi>
                <Dropbtn>
                  {activeName}
                </Dropbtn>
                <DropDownContent>
                  {" "}
                  {types.map(type => (
                      <SubA 
                        key={type}
                        active={props.active === type}
                        onClick={() => {props.changeFunc(type); setActiveName(type.replace(/([A-Z])/g, ' $1').trim())}}
                        >{type}
                    </SubA>
                    ))}
                  </DropDownContent>
              </DropDownLi>
            </StyledUl>
          
        </>     
      )
  }

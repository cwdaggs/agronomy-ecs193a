import React, { useState } from "react";
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from '../StyledDivs';
import { useSearchParams } from "react-router-dom";
import {GiWheat, GiBowlOfRice, GiGrainBundle, GiCottonFlower, GiCorn, GiSunflower, GiJellyBeans, GiVineFlower, GiBerriesBowl, GiCoolSpices} from "react-icons/gi";
import {IoMdArrowDropdown} from "react-icons/io";


function DetermineIcon(type) {
  if (type === "Wheat") {
    return (<><GiWheat/></>)
  } else if (type === "Rice") {
    return (<><GiBowlOfRice/></>)
  } else if (type === "Small Grain Silage") {
    return (<><GiGrainBundle/></>)
  } else if (type === "Cotton") {
    return (<><GiCottonFlower/></>)
  } else if (type === "Corn") {
    return (<><GiCorn/></>)
  } else if (type === "Sunflower") {
    return (<><GiSunflower/></>)
  } else if (type === "Dry Beans") {
    return (<><GiJellyBeans/></>)
  } else if (type === "Alfalfa") {
    return (<><GiVineFlower/></>)
  } else if (type === "Barley") {
    return (<><GiBerriesBowl/></>)
  } else if (type === "Corn Silage") {
    return (<><GiCoolSpices/></>)
  }
}

export function OnlyCrops(props) {
    const [activeName, setActiveName] = useState("Select Crop");
    const [searchParams, setSearchParams] = useSearchParams(window.location.search);
    console.log(window.location.href);

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
                    {activeName + " "}
                    {<IoMdArrowDropdown/>}
                </Dropbtn>
                <DropDownContent>
                  {" "}
                  {types.map(type => (
                      <SubA 
                        key={type}
                        active={props.active === type}
                        onClick={() => {props.changeFunc(type); setActiveName(type.replace(/([A-Z])/g, ' $1').trim()); setSearchParams({crop: `${type}`})}}
                        >
                        {DetermineIcon(type)}
                        {" " + type}
                        
                    </SubA>
                    ))}
                  </DropDownContent>
              </DropDownLi>
            </StyledUl>
          
        </>     
      )
  }

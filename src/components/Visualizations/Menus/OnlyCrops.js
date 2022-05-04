import React, { useState } from "react";
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from '../StyledDivs';
import {GiWheat, GiBowlOfRice, GiGrainBundle, GiCottonFlower, GiCorn, GiSunflower, GiJellyBeans, GiVineFlower, GiBerriesBowl, GiCoolSpices} from "react-icons/gi";
import {IoMdArrowDropdown} from "react-icons/io";
import { useLocation, Link } from "react-router-dom";


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
  var stateString = "";
  if (props.baseAll) {
    stateString = "Select Crop";
  } else {
    stateString = props.active;
  }
  const [activeName, setActiveName] = useState(stateString);
  const preLocation = useLocation().pathname.split("/");
  var location = "/" + preLocation[1] + "/" + preLocation[2];
  // console.log(location);

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
              <Link style={{ textDecoration: 'none' }} 
                    to={location + "/" + type}
                    onClick={() => {props.changeFunc(type); setActiveName(type.replace(/([A-Z])/g, ' $1').trim())}}
              >
                <SubA 
                  key={type}
                  active={props.active === type}
                >
                  {DetermineIcon(type)}
                  {" " + type}
                </SubA>
              </Link>
            ))}
          </DropDownContent>
          </DropDownLi>
        </StyledUl>
      </>     
    )
  }

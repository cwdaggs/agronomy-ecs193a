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
    <div className="inline-child">
      <div className="flex-parent">
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
      </div>
      </div>     
    )
  }

  export function OnlyCropsCompare(props) {
    var stateString = "";
    var stateString2 = "";
    if (props.baseAll) {
      stateString = "Select Crop";
      stateString2 = "Compare Crop";
    } else {
      stateString = props.active;
      stateString2 = props.active2;
    }
    const [activeName, setActiveName] = useState(stateString);
    const [activeName2, setActiveName2] = useState(stateString2);
    const preLocation = useLocation().pathname.split("/");
    var location = "/" + preLocation[1] + "/" + preLocation[2] + "/" + preLocation[3];
    console.log(location);
  
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
      <div className="inline-child">
        
          <StyledUl>
          <div className="flex-parent">
            <div className="flex-child">
            <DropDownLi>
            <Dropbtn>
              {activeName + " "}
              {<IoMdArrowDropdown/>}
            </Dropbtn>
            <DropDownContent>
              {" "}
              {types.map(type => (
                <Link style={{ textDecoration: 'none' }} 
                      to={location + "/" + type + "/" + activeName2}
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
            </div>
            <div className="flex-child">
            <DropDownLi>
            <Dropbtn>
              {activeName2 + " "}
              {<IoMdArrowDropdown/>}
            </Dropbtn>
            <DropDownContent>
              {" "}
              {types.map(type => (
                <Link style={{ textDecoration: 'none' }} 
                      to={location + "/" + activeName + "/" + type}
                      onClick={() => {props.changeFunc2(type); setActiveName2(type.replace(/([A-Z])/g, ' $1').trim())}}
                >
                  <SubA 
                    key={type}
                    active={props.active2 === type}
                  >
                    {DetermineIcon(type)}
                    {" " + type}
                  </SubA>
                </Link>
              ))}
            </DropDownContent>
            </DropDownLi>
            </div>
          </div>
          </StyledUl>
        </div>  
      )
    }
  
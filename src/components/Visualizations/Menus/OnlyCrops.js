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
  var stateRegion = "";

  if (props.baseAll) {
    stateString = "Select Crop";
    stateRegion = "Select Region";
  } else {
    stateString = props.active;
    stateRegion = props.activeRegion;
  }

  const [activeName, setActiveName] = useState(stateString);
  const [activeRegionName, setActiveRegionName] = useState(stateRegion);
  const preLocation = useLocation().pathname.split("/");
  var location = "/" + preLocation[1] + "/" + preLocation[2];

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

  const regionTypes = ["All", "Intermountain", "Sac Valley", "NSJV", "SSJV", "Desert", "Coastal", "Sierra Nevada"];

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
                    to={location + "/" + type + "/" + activeRegionName}
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

          <DropDownLi>
                    <Dropbtn>
                        {activeRegionName + " "}
                        {<IoMdArrowDropdown/>}
                    </Dropbtn>
                    <DropDownContent>
                    {" "}
                    {regionTypes.map(type => (
                        <Link style={{ textDecoration: 'none' }} 
                                to={location + "/" + activeName + "/" + type}
                                onClick={() =>  {props.changeRegionFunc(type);
                                    setActiveRegionName(type); 
                                    }}
                        >
                            <SubA 
                                key={type}
                                active={props.activeRegionOrCrop === type}
                            >
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
    var stateRegion = "";
    var stateRegion2 = "";

    if (props.baseAll) {
      stateString = "Select Crop";
      stateString2 = "Compare Crop";
      stateRegion = "Select Region";
      stateRegion2 = "Compare Region";
    } else {
      stateString = props.active;
      stateString2 = props.active2;
      stateRegion = props.activeRegion1;
      stateRegion2 = props.activeRegion2;
    }
    const [activeName, setActiveName] = useState(stateString);
    const [activeName2, setActiveName2] = useState(stateString2);
    const [activeRegionName, setActiveRegionName] = useState(stateRegion);
    const [activeRegionName2, setActiveRegionName2] = useState(stateRegion2);
    const preLocation = useLocation().pathname.split("/");
    var location = "/" + preLocation[1] + "/" + preLocation[2] + "/" + preLocation[3];
  
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

    const regionTypes = ["All", "Intermountain", "Sac Valley", "NSJV", "SSJV", "Desert", "Coastal", "Sierra Nevada"];

    return (
      <>
        
        <div className="flex-child-1" id="button-a">
            <DropDownLi>
            <Dropbtn>
              {activeName + " "}
              {<IoMdArrowDropdown/>}
            </Dropbtn>
            <DropDownContent>
              {" "}
              {types.map(type => (
                <Link style={{ textDecoration: 'none' }} 
                      to={location + "/" + type + "/" + activeName2 + "/" + activeRegionName + "/" + activeRegionName2}
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
            <DropDownLi>
                    <Dropbtn>
                        {activeRegionName + " "}
                        {<IoMdArrowDropdown/>}
                    </Dropbtn>
                    <DropDownContent>
                    {" "}
                    {regionTypes.map(type => (
                        <Link style={{ textDecoration: 'none' }} 
                                to={location + "/" + activeName + "/" + activeName2 + "/" + type + "/" + activeRegionName2}
                                onClick={() =>  {props.changeRegion1Func(type);
                                    setActiveRegionName(type); 
                                    }}
                        >
                            <SubA 
                                key={type}
                                active={props.activeRegionOrCrop === type}
                            >
                                {" " + type}  
                            </SubA>
                        </Link>
                        ))}
                    </DropDownContent>
                </DropDownLi>
            </div>
            <div className="flex-child-2" id="button-b"> 
            <DropDownLi>
            <Dropbtn>
              {activeName2 + " "}
              {<IoMdArrowDropdown/>}
            </Dropbtn>
            <DropDownContent>
              {" "}
              {types.map(type => (
                <Link style={{ textDecoration: 'none' }} 
                      to={location + "/" + activeName + "/" + type + "/" + activeRegionName + "/" + activeRegionName2}
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
            <DropDownLi>
                    <Dropbtn>
                        {activeRegionName2 + " "}
                        {<IoMdArrowDropdown/>}
                    </Dropbtn>
                    <DropDownContent>
                    {" "}
                    {regionTypes.map(type => (
                        <Link style={{ textDecoration: 'none' }} 
                                to={location + "/" + activeName + "/" + activeName2 + "/" + activeRegionName + "/" + type}
                                onClick={() =>  {props.changeRegion2Func(type);
                                    setActiveRegionName2(type); 
                                    }}
                        >
                            <SubA 
                                key={type}
                                active={props.activeRegionOrCrop === type}
                            >
                                {" " + type}  
                            </SubA>
                        </Link>
                        ))}
                    </DropDownContent>
                </DropDownLi>
            </div>
        </>  
      )
    }
  
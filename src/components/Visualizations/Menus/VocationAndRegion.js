import React, { useState } from "react";
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from '../StyledDivs';
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

export function VocationAndRegion(props) {

    // These go in visualizations
    const [activeCropName, setActiveCropName] = useState("Select Crop");
    const [activeRegionName, setActiveRegionName] = useState("Select Region");
    const [activeName, setActiveName] = useState("Select Vocation");

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
        <div className="inline-child">
            <StyledUl>

                <DropDownLi>
                    <Dropbtn>
                        {activeName + " "}
                        {<IoMdArrowDropdown/>}
                    </Dropbtn>
                    <DropDownContent>
                        {" "}
                        {props.vocationArray.map(type => (
                            <SubA 
                                key={type}
                                active={props.activeVocation === type}
                                onClick={() => {props.vocationFunction(type); setActiveName(type.replace(/([A-Z])/g, ' $1').trim())}}
                                >{type}
                                
                            </SubA>
                        ))}
                    </DropDownContent>
                </DropDownLi>

                <DropDownLi>
                    <Dropbtn>
                        {activeCropName + " "}
                        {<IoMdArrowDropdown/>}
                    </Dropbtn>
                    <DropDownContent>
                        {" "}
                        {types.map(type => (
                            <SubA 
                                key={type}
                                active={props.activeRegionOrCrop === type}
                                onClick={() => {props.regionOrCropFunction(type);setActiveRegionName("Select Region");setActiveCropName(type.replace(/([A-Z])/g, ' $1').trim());}}
                                >
                                {DetermineIcon(type)}
                                {" " + type}
                            </SubA>
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
                        <SubA 
                            key={type}
                            active={props.activeRegionOrCrop === type}
                            onClick={() =>  {props.regionOrCropFunction(type);setActiveCropName("Select Crop");setActiveRegionName(type)}}
                            >{type}
                        </SubA>
                        ))}
                    </DropDownContent>
                </DropDownLi>
                
            </StyledUl>
        </div> 
      </>  
    )
  }
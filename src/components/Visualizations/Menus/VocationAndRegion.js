import React, { useState } from "react";
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from '../StyledDivs';
import { useLocation, Link, NavLink } from "react-router-dom";
import {GiWheat, GiBowlOfRice, GiGrainBundle, GiCottonFlower, GiCorn, GiSunflower, GiJellyBeans, GiVineFlower, GiBerriesBowl, GiCoolSpices} from "react-icons/gi";
import {IoMdArrowDropdown} from "react-icons/io";

function DetermineCropIcon(type) {
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
    const [activeCropName, setActiveCropName] = useState("Select Crop");
    const [activeRegionName, setActiveRegionName] = useState("Select Region");
    const [activeName, setActiveName] = useState(props.activeVocation);
    const preLocation = useLocation().pathname.split("/");
    var location = "/" + preLocation[1] + "/" + preLocation[2];
    // const location = "/results/Acres%20Managed";
    // console.log("location:" + location);

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
                                onClick={() => {props.vocationFunction(type); 
                                                setActiveName(type.replace(/([A-Z])/g, ' $1').trim());
                                                }}
                            >
                            <Link style={{ textDecoration: 'none' }} to={location + "/" + type + "/" + activeCropName + "/" + activeRegionName}>
                                {DetermineCropIcon(type)}
                                {" " + type}
                                </Link>
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
                                onClick={() => {props.regionOrCropFunction(type);
                                                setActiveRegionName("Select Region");
                                                setActiveCropName(type.replace(/([A-Z])/g, ' $1').trim()); 
                                                }}
                            >
                                <Link style={{ textDecoration: 'none' }} to={location + "/" + activeName + "/" + type + "/Select Region"}>
                                {DetermineCropIcon(type)}
                                {" " + type}
                                </Link>
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
                            onClick={() =>  {props.regionOrCropFunction(type);
                                            setActiveCropName("Select Crop"); 
                                            setActiveRegionName(type); 
                                            }}
                            >
                                <Link style={{ textDecoration: 'none' }} to={location + "/" + activeName + "/Select Crop/" + type}>
                                {DetermineCropIcon(type)}
                                {" " + type}
                                </Link>
                        </SubA>
                        ))}
                    </DropDownContent>
                </DropDownLi>
                
            </StyledUl>
        </div> 
      </>  
    )
  }
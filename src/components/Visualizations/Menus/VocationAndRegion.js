import React, { useState } from "react";
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from '../StyledDivs';
import { useLocation, Link } from "react-router-dom";
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

    var stateVocation= "";
    var stateCrop = "";
    var stateRegion = "";
    if (props.baseAll) {
        stateVocation = "Select Vocation";
        stateCrop = "Select Crop";
        stateRegion = "Select Region";
    } else {
        stateVocation = props.activeVocation.replace("%20", " ");
        if (types.includes(props.activeRegionOrCrop)) {
            stateCrop = props.activeRegionOrCrop;
            stateRegion = "Select Region";
        } else {
            stateCrop = "Select Crop";
            stateRegion = props.activeRegionOrCrop;
        }
    }
    const [activeCropName, setActiveCropName] = useState(stateCrop);
    const [activeRegionName, setActiveRegionName] = useState(stateRegion);
    const [activeName, setActiveName] = useState(stateVocation);
    const preLocation = useLocation().pathname.split("/");
    var location = "/" + preLocation[1] + "/" + preLocation[2];

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
                            <Link style={{ textDecoration: 'none', textAlign: "center"}} 
                                    to={location + "/" + type + "/" + activeCropName + "/" + activeRegionName} 
                                    onClick={() => {props.vocationFunction(type); 
                                                setActiveName(type.replace("%20", " "));
                                                // console.log(type.replace(/([A-Z])/g, ' $1').trim());
                                            }} 
                            >
                                <SubA 
                                    key={type}
                                    active={props.activeVocation === type}
                                >
                                    {" " + type}
                                </SubA>
                            </Link>
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
                                <Link style={{ textDecoration: 'none' }} 
                                        to={location + "/" + activeName + "/" + type + "/Select Region"}
                                        onClick={() => {props.regionOrCropFunction(type);
                                            setActiveRegionName("Select Region");
                                            setActiveCropName(type.replace(/([A-Z])/g, ' $1').trim()); 
                                            }}
                                >
                                    <SubA 
                                        key={type}
                                        active={props.activeRegionOrCrop === type}
                                    >
                                        {DetermineCropIcon(type)}
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
                                to={location + "/" + activeName + "/Select Crop/" + type}
                                onClick={() =>  {props.regionOrCropFunction(type);
                                    setActiveCropName("Select Crop"); 
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
      </>  
    )
  }
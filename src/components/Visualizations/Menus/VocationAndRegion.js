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
            <div className="flex-parent">
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
        </div> 
      </>  
    )
  }

  export function VocationAndRegionCompare(props) {
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
    var stateVocation2= "";
    var stateCrop2 = "";
    var stateRegion2 = "";
    if (props.baseAll) {
        stateVocation = "Select Vocation";
        stateCrop = "Select Crop";
        stateRegion = "Select Region";
        stateVocation2 = "Compare Vocation";
        stateCrop2 = "Compare Crop";
        stateRegion2 = "Compare Region";
    } else {
        stateVocation = props.activeVocation.replace("%20", " ");
        stateVocation2 = props.activeVocation2.replace("%20", " ");

        if (types.includes(props.activeRegionOrCrop)) {
            stateCrop = props.activeRegionOrCrop;
            stateRegion = "Select Region";
        } else {
            stateCrop = "Select Crop";
            stateRegion = props.activeRegionOrCrop;
        }

        if (types.includes(props.activeRegionOrCrop2)) {
            stateCrop2 = props.activeRegionOrCrop2;
            stateRegion2 = "Compare Region";
        } else {
            stateCrop2 = "Compare Crop";
            stateRegion2 = props.activeRegionOrCrop2;
        }
    }
    const [activeCropName, setActiveCropName] = useState(stateCrop);
    const [activeRegionName, setActiveRegionName] = useState(stateRegion);
    const [activeName, setActiveName] = useState(stateVocation);
    const [activeCropName2, setActiveCropName2] = useState(stateCrop2);
    const [activeRegionName2, setActiveRegionName2] = useState(stateRegion2);
    const [activeName2, setActiveName2] = useState(stateVocation2);
    const preLocation = useLocation().pathname.split("/");
    var location = "/" + preLocation[1] + "/" + preLocation[2] + "/" + preLocation[3];

    return (
      <>
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
                        {props.vocationArray.map(type => (
                            <Link style={{ textDecoration: 'none', textAlign: "center"}} 
                                    to={location + "/" + type + "/" + activeCropName + "/" + activeRegionName + "/" + activeName2 + "/" + activeCropName2 + "/" + activeRegionName2} 
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
                                        to={location + "/" + activeName + "/" + type + "/Select Region" + "/" + activeName2 + "/" + activeCropName2 + "/" + activeRegionName2}
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
                                to={location + "/" + activeName + "/Select Crop/" + type + "/" + activeName2 + "/" + activeCropName2 + "/" + activeRegionName2}
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
                </div>
                <div className="flex-child">                        
                <DropDownLi>
                    <Dropbtn>
                        {activeName2 + " "}
                        {<IoMdArrowDropdown/>}
                    </Dropbtn>
                    <DropDownContent>
                        {" "}
                        {props.vocationArray.map(type => (
                            <Link style={{ textDecoration: 'none', textAlign: "center"}} 
                                    to={location + "/" + activeName + "/" + activeCropName + "/" + activeRegionName + "/" + type + "/" + activeCropName2 + "/" + activeRegionName2} 
                                    onClick={() => {props.vocationFunction2(type); 
                                                setActiveName2(type.replace("%20", " "));
                                                // console.log(type.replace(/([A-Z])/g, ' $1').trim());
                                            }} 
                            >
                                <SubA 
                                    key={type}
                                    active={props.activeVocation2 === type}
                                >
                                    {" " + type}
                                </SubA>
                            </Link>
                        ))}
                    </DropDownContent>
                </DropDownLi>

                <DropDownLi>
                    <Dropbtn>
                        {activeCropName2 + " "}
                        {<IoMdArrowDropdown/>}
                    </Dropbtn>
                    <DropDownContent>
                        {" "}
                        {types.map(type => (
                                <Link style={{ textDecoration: 'none' }} 
                                        to={location + "/" + activeName + "/" + activeCropName + "/" + activeRegionName + "/" + activeName2 + "/" + type + "/Compare Region"}
                                        onClick={() => {props.regionOrCropFunction2(type);
                                            setActiveRegionName2("Compare Region");
                                            setActiveCropName2(type.replace(/([A-Z])/g, ' $1').trim()); 
                                            }}
                                >
                                    <SubA 
                                        key={type}
                                        active={props.activeRegionOrCrop2 === type}
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
                        {activeRegionName2 + " "}
                        {<IoMdArrowDropdown/>}
                    </Dropbtn>
                    <DropDownContent>
                    {" "}
                    {regionTypes.map(type => (
                        <Link style={{ textDecoration: 'none' }} 
                                to={location + "/" + activeName + "/Select Crop/" + activeRegionName + "/" + activeName2 + "/Compare Crop/" + type}
                                onClick={() =>  {props.regionOrCropFunction2(type);
                                    setActiveCropName2("Compare Crop"); 
                                    setActiveRegionName2(type); 
                                    }}
                        >
                            <SubA 
                                key={type}
                                active={props.activeRegionOrCrop2 === type}
                            >
                                {" " + type}  
                            </SubA>
                        </Link>
                        ))}
                    </DropDownContent>
                </DropDownLi>
                </div>
            </div>
            </StyledUl>
         
      </>  
    )
  }
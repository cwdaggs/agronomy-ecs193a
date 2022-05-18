import React, { useState } from "react";
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from '../StyledDivs';
import { useLocation, Link } from "react-router-dom";
import {GiWheat, GiBowlOfRice, GiGrainBundle, GiCottonFlower, GiCorn, GiSunflower, GiJellyBeans, GiVineFlower, GiBerriesBowl, GiCoolSpices} from "react-icons/gi";
import {IoMdArrowDropdown} from "react-icons/io";
import { active } from "d3";

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
        stateCrop = "Select Crop";
        stateRegion = "Select Region";
        if (types.includes(props.activeCrop)) {
            stateCrop = props.activeCrop;
        }
        if(regionTypes.includes(props.activeRegion)){
            stateRegion = props.activeRegion;
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
                                        to={location + "/" + activeName + "/" + type + "/" + activeRegionName}
                                        onClick={() => {props.cropFunction(type);
                                            setActiveCropName(type.replace(/([A-Z])/g, ' $1').trim()); 
                                            }}
                                >
                                    <SubA 
                                        key={type}
                                        active={props.activeCrop === type}
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
                                to={location + "/" + activeName + "/" + activeCropName + "/" + type}
                                onClick={() =>  {props.regionFunction(type);   
                                    setActiveRegionName(type); 
                                    }}
                        >
                            <SubA 
                                key={type}
                                active={props.activeRegion === type}
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

        stateRegion = "Select Region";
        stateRegion2 = "Compare Region";

        stateCrop = "SelectCrop";
        stateCrop2 = "Compare Crop";

        if (types.includes(props.activeCrop)) {
            stateCrop = props.activeCrop;
        }
        if(regionTypes.includes(props.activeRegion)){
            stateRegion = props.activeRegion;
        }

        if (types.includes(props.activeCrop2)) {
            stateCrop2 = props.activeCrop2;
        }
        if(regionTypes.includes(props.activeRegion2)){
            stateRegion2 = props.activeRegion2;
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
                <div className="flex-child-1">
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
                                        to={location + "/" + activeName + "/" + type + "/" + activeRegionName + "/" + activeName2 + "/" + activeCropName2 + "/" + activeRegionName2}
                                        onClick={() => {props.cropFunction(type);
                                            setActiveCropName(type.replace(/([A-Z])/g, '$1').trim()); 
                                            }}
                                >
                                    <SubA 
                                        key={type}
                                        active={props.activeCrop === type}
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
                                to={location + "/" + activeName + "/" + activeCropName + "/" + type + "/" + activeName2 + "/" + activeCropName2 + "/" + activeRegionName2}
                                onClick={() =>  {props.regionFunction(type);
                                    setActiveRegionName(type); 
                                    }}
                        >
                            <SubA 
                                key={type}
                                active={props.activeRegion === type}
                            >
                                {" " + type}  
                            </SubA>
                        </Link>
                        ))}
                    </DropDownContent>
                </DropDownLi>
                </div>
                <div className="flex-child-2">                        
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
                                        to={location + "/" + activeName + "/" + activeCropName + "/" + activeRegionName + "/" + activeName2 + "/" + type + "/" + activeRegionName2}
                                        onClick={() => {props.cropFunction2(type);
                                            setActiveCropName2(type.replace(/([A-Z])/g, '$1').trim()); 
                                            }}
                                >
                                    <SubA 
                                        key={type}
                                        active={props.activeCrop2 === type}
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
                                to={location + "/" + activeName + "/" + activeCropName + "/" + activeRegionName + "/" + activeName2 + "/" + activeCropName2 + "/" + type}
                                onClick={() =>  {props.regionFunction2(type);
                                    setActiveRegionName2(type); 
                                    }}
                        >
                            <SubA 
                                key={type}
                                active={props.activeRegion2 === type}
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
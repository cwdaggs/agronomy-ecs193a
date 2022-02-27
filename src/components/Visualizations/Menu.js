import React, { useState } from "react";
import {getFarmersCrops } from './UseData';
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from './StyledDivs';
import {PrioritySatisfaction} from './Questions/PrioritySatisfaction.js'
import {AffectVictory} from './Questions/Affect_victory';
import {ConcernsVictory} from './Questions/Concerns_victory';
import {AcresManagedBarChart} from './Questions/AcresManaged.js';
import { CropPercentages } from "./Questions/CropPercentages";
import {InfoSourcesBarChart} from "./Questions/InfoSources";
import {InternetSourcesBarChart} from "./Questions/InternetSources";
import { PriorityConcerns } from "./Questions/PriorityConcerns";
import { AmountVictory } from "./Questions/AmountValued";
import { EngageVictory } from "./Questions/Engage_victory";
import { PrimaryGrowingReasons } from "./Questions/PrimaryGrowingReasons";
import {MapChart} from "./CaliforniaCounties"

function GetTypes(dataset){
    return getFarmersCrops(dataset) 
}

function getVis(vis_name, active, activeVocation, dataset){

  var vis_key = { 
              "PrioritySatisfaction" :  (<PrioritySatisfaction filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "CropPercentages":        (<CropPercentages filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Affect":                 (<AffectVictory filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Concerns":               (<ConcernsVictory filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "AcresManaged":           (<AcresManagedBarChart filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "InfoSources":            (<InfoSourcesBarChart filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "InternetSources":        (<InternetSourcesBarChart filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "PriorityConcerns":       (<PriorityConcerns filter={active} vocationFilter={activeVocation} myDataset={dataset}/>),
              "AmountValued":           (<AmountVictory filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Engage":                 (<EngageVictory filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "PrimaryGrowingReasons":  (<PrimaryGrowingReasons filter={active} vocationFilter={activeVocation} myDataset={dataset}/>),
              "Map":                    (<MapChart filter={active} vocationFilter={activeVocation} data={dataset}/>)
            }
  return vis_key[vis_name]
}

function VisMenu(props) {

  const dataset = props.dataset
  const types = GetTypes(dataset);
  const [active, setActive] = useState("All");

  const vocationTypes = ["All", "Growers", "Consultants", "Allied Industry", "Other"]
  const limitedVocationTypes = ["All", "Growers", "Consultants"]
  const evenMoreLimitedVocationTypes = ["Growers", "Consultants"]
  const [activeVocation, setActiveVocation] = useState("Growers");

  const vis = getVis(props.vis, active, activeVocation, dataset);

  switch(vis.type.name){
    // Visualizations with no filters
    case "CropPercentages": {
        return (
          <>
          {vis}
          </>
        )
      }
    // Visualizations that can only be filtered by crop
    case "MapChart":
    case "PrimaryGrowingReasons":
    case "AcresManagedBarChart": {
      return (
        <>
        <div>
          <StyledUl>
            <DropDownLi>
              <Dropbtn onClick={() => this.handleClick("DropDown")}>
                Filter Crops
              </Dropbtn>
              <DropDownContent>
                {" "}
                {types.map(type => (
                    <SubA 
                      key={type}
                      active={active === type}
                      onClick={() => {setActive(type);}}
                      >{type}
                  </SubA>
                  ))}
                </DropDownContent>
            </DropDownLi>
          </StyledUl>
        </div> 
        <p><b >&ensp;Crop: </b>{active}</p>
        <div className='row' align-items='center'> </div>
        <div align-items='center'>
        {vis}
        </div>
        </>     
      )
    }
    // Visualizations that can strictly only be filtered by grower or consultant
    case "PriorityConcerns":
    case "AffectVictory": {
      return (
        <>
        <div>
          <StyledUl>
          <DropDownLi>
            <Dropbtn onClick={() => this.handleClick("DropDown")}>
                Filter Vocation
              </Dropbtn>
              <DropDownContent>
                {" "}
                {evenMoreLimitedVocationTypes.map(type => (
                    <SubA 
                      key={type}
                      active={activeVocation === type}
                      onClick={() => {setActiveVocation(type);}}
                      >{type}
                  </SubA>
                  ))}
                </DropDownContent>
            </DropDownLi>
            <DropDownLi>
              <Dropbtn onClick={() => this.handleClick("DropDown")}>
                Filter Crops
              </Dropbtn>
              <DropDownContent>
                {" "}
                {types.map(type => (
                    <SubA 
                      key={type}
                      active={active === type}
                      onClick={() => {setActive(type);}}
                      >{type}
                  </SubA>
                  ))}
                </DropDownContent>
            </DropDownLi>
          </StyledUl>
        </div> 
        <p><b >Vocation: </b>{activeVocation} &ensp; <b >Crop: </b>{active}</p>
        <div className='row' align-items='center'> </div>
        <div align-items='center'>
        {vis}
        </div>
        </>     
      )
    }
    // Visualizations that can be filtered by all, growers, or consultants
    case "AmountVictory":
    case "PrioritySatisfaction":
    case "ConcernsVictory": {
      return (
        <>
        <div>
          <StyledUl>
          <DropDownLi>
            <Dropbtn onClick={() => this.handleClick("DropDown")}>
                Filter Vocation
              </Dropbtn>
              <DropDownContent>
                {" "}
                {limitedVocationTypes.map(type => (
                    <SubA 
                      key={type}
                      active={activeVocation === type}
                      onClick={() => {setActiveVocation(type);}}
                      >{type}
                  </SubA>
                  ))}
                </DropDownContent>
            </DropDownLi>
            <DropDownLi>
              <Dropbtn onClick={() => this.handleClick("DropDown")}>
                Filter Crops
              </Dropbtn>
              <DropDownContent>
                {" "}
                {types.map(type => (
                    <SubA 
                      key={type}
                      active={active === type}
                      onClick={() => {setActive(type);}}
                      >{type}
                  </SubA>
                  ))}
                </DropDownContent>
            </DropDownLi>
          </StyledUl>
        </div> 
        <p><b >Vocation: </b>{activeVocation} &ensp; <b >Crop: </b>{active}</p>
        <div className='row' align-items='center'> </div>
        <div align-items='center'>
        {vis}
        </div>
        </>     
      )
    }
    // Visualizations that can be filtered by all vocations and crops
    default: {
      return (
        <>
        <div>
          <StyledUl>
          <DropDownLi>
            <Dropbtn onClick={() => this.handleClick("DropDown")}>
                Filter Vocation
              </Dropbtn>
              <DropDownContent>
                {" "}
                {vocationTypes.map(type => (
                    <SubA 
                      key={type}
                      active={activeVocation === type}
                      onClick={() => {setActiveVocation(type);}}
                      >{type}
                  </SubA>
                  ))}
                </DropDownContent>
            </DropDownLi>
            <DropDownLi>
              <Dropbtn onClick={() => this.handleClick("DropDown")}>
                Filter Crops
              </Dropbtn>
              <DropDownContent>
                {" "}
                {types.map(type => (
                    <SubA 
                      key={type}
                      active={active === type}
                      onClick={() => {setActive(type);}}
                      >{type}
                  </SubA>
                  ))}
                </DropDownContent>
            </DropDownLi>
          </StyledUl>
        </div> 
        <p><b >Vocation: </b>{activeVocation} &ensp; <b >Crop: </b>{active}</p>
        <div className='row' align-items='center'> </div>
        <div align-items='center'>
        {vis}
        </div>
        </>     
      )
    }
  } 
}
export {VisMenu};
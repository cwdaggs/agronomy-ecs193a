import {useData} from '../Visualizations/UseData';
import {VisMenu} from '../Visualizations/Menu';
import React, { useState } from "react";
import {Tab} from '../Visualizations/StyledDivs'
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from '../Visualizations/StyledDivs';

export const Visualizations = () => {
    
    const types = [
        "AcresManaged", //Q2
        "CropPercentages", //Q3
        "Concerns", //Q6
        "PriorityConcerns", //Q7
        "PrimaryGrowingReasons", //Q8
        "Affect", //Q9
        "InfoSources", //Q10
        "Engage", //Q11
        "AmountValued", //Q12
        "PrioritySatisfaction", //Q13
        "InternetSources", //Q16
    ]
    const [active, setActive] = useState("AcresManaged");
    const [key, setKey] = useState(0);
    return(
        <div id="outer-container">
                <StyledUl>
                  <DropDownLi>
                    <Dropbtn onClick={() => this.handleClick("DropDown")}>
                      Select Topic
                    </Dropbtn>
                    <DropDownContent>
                      {" "}
                      {types.map(type => (
                          <SubA 
                          key={type} 
                          onClick={() => {setKey(key+1); setActive(type)}} 
                          active={active === type}
                          >{type.replace(/([A-Z])/g, ' $1').trim()}
                        </SubA>
                        ))}
                      </DropDownContent>
                  </DropDownLi>
                </StyledUl>
        
            {<VisMenu dataset={useData('./data/Filtered_Crop_Data.csv')} vis={active} key={key}/>}
        
        </div>
        
    );
}
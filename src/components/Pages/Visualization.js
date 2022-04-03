import {useData} from '../Visualizations/UseData';
import {VisMenu} from '../Visualizations/Menu';
import React, { useState } from "react";
import {Tab} from '../Visualizations/StyledDivs'
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from '../Visualizations/StyledDivs';

export const Visualizations = () => {
    
    const types = [
        "Acres Managed", //Q2
        "Crop Percentages", //Q3
        "Production Concerns", //Q6
        "Priority Concerns", //Q7
        "Primary Growing Reasons", //Q8
        "Priority Effect", //Q9
        "Information Sources", //Q10
        "UCCE Engagement", //Q11
        "Values", //Q12
        "Priorities vs Satisfaction", //Q13
        "Internet Sources", //Q16
    ]
    const [active, setActive] = useState("Select Topic");
    const [activeName, setActiveName] = useState("Select Topic");
    const [key, setKey] = useState(0);
    
    return(
        <div id="outer-container">
                <StyledUl>
                  <DropDownLi>
                    <Dropbtn>
                      {activeName}
                    </Dropbtn>
                    <DropDownContent>
                      {" "}
                      {types.map(type => (
                          <SubA 
                          key={type} 
                          onClick={() => {setKey(key+1); setActiveName(type); setActive(type)}} 
                          active={active === type}
                          >{type}
                        </SubA>
                        ))}
                      </DropDownContent>
                  </DropDownLi>
                </StyledUl>
        
            {<VisMenu dataset={useData('./data/Filtered_Crop_Data.csv')} vis={active} key={key}/>}
        
        </div>
        
    );
}
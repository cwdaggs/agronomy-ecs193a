import {useData} from '../Visualizations/UseData';
import {VisMenu} from '../Visualizations/Menu';
import React, { useState } from "react";
import {Tab} from '../Visualizations/StyledDivs'

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
        "Map"
    ]
    const [active, setActive] = useState("Concerns");
    return(
        <div id="outer-container">
            
            {types.map(type => (
                <Tab 
                    key={type} 
                    onClick={() => {setActive(type)}} 
                    active={active === type}
                    >{type}
                </Tab>
            ))}
        
            {<VisMenu dataset={useData('./data/Filtered_Crop_Data.csv')} vis={active}/>}
        
        </div>
        
    );
}
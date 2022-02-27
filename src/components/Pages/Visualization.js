import {useData} from '../Visualizations/UseData';
import {VisMenu} from '../Visualizations/Menu';
import React, { useState } from "react";
import {Tab} from '../Visualizations/StyledDivs'

export const Visualizations = () => {
    
    const types = [
        "Concerns", 
        "CropPercentages", 
        "AcresManaged", 
        "PrioritySatisfaction", 
        "Affect", 
        "InfoSources", 
        "InternetSources", 
        "PriorityConcerns",
        "PrimaryGrowingReasons", 
        "AmountValued",
        "Engage",
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
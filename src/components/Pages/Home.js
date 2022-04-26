import {TabHome} from '../Visualizations/StyledDivs'
import {NavLink} from "react-router-dom";
import React, {useState} from 'react';

export const Home = () => {

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vh*0.9;
    const width = vw;


    return(
        <div id="bg">
            
            <div id="home-container">
                {/*<div id="main-title">
                    <h2>Welcome!</h2>
                </div>*/}
                <div id="home-sub-title">
                    <h2>Critical Needs for UCCE Research and Extension</h2>
                </div>   
                <div id="home-info">
                    <h2>
                        Agronomic crop production in California faces many challenges. This website displays the results of a 
                        survey involving hundreds of growers, consultants, and allied industry members across the state to 
                        identify needs and set priorities.
                    </h2>
                </div>   
                <div id="home-button">
                    <NavLink to ="/results">
                        <TabHome>Learn More!</TabHome>
                    </NavLink>   
                </div>
            </div>    

        </div>
    );
}
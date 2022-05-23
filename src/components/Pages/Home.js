import {TabHome} from '../Visualizations/StyledDivs'
import {NavLink} from "react-router-dom";
import React, {useState} from 'react';
import './Home.css';

export const Home = () => {

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    return(
        <div id="bg">
            <div id="home-container">
                <div id="home-sub-title">
                    <h2>Critical Needs for Agronomic Crop Production in California</h2>
                </div>   
                <div id="home-info">
                    
                    Agronomic crop production in California faces many challenges. This interactive website showcases the results 
                    of a 2020 survey involving hundreds of growers, consultants, and other allied agricultural industry members across the 
                    state to identify needs and set priorities for UC research and extension activities.
                    
                </div>   
                <div id="home-button">
                    <NavLink to ="/results">
                        <TabHome >Learn More!</TabHome>
                    </NavLink>   
                </div>
            </div>    
        </div>
    );
}
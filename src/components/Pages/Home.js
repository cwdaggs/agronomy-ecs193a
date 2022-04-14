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
                <div id="main-title">
                    <h2>Welcome!</h2>
                </div>
                <div id="home-sub-title">
                    <h2>UCCE 2019 Needs Assessment Survey Analysis</h2>
                </div>   
                <div id="home-info">
                    <h2>In 2019, a survey was given to hundreds of California farmers to assess their needs. This web application has been developed to extend those results to the public.</h2>
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
import * as C from './App.styles';
import {MapChart, CropBar} from '../Visualizations/CaliforniaCounties'
import {RegionMapChart} from '../Visualizations/RegionMap'
import { useData } from '../Visualizations/UseData';
import "@fontsource/newsreader";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import singleWheat from '../../images/one_wheat.jpg'
import sky from '../../images/sky.jpg'


export const InfoSummary = () => {

  return (
    <div>
      <Parallax pages={4}>
        <C.Container>
          <C.Area>          
            <C.Body>
              <ParallaxLayer factor={1} style={{
                backgroundImage: `url(${sky})`,
                backgroundSize: 'cover'
              }}>
              </ParallaxLayer>
              <ParallaxLayer speed = {0.8}> 
                <div id = "infoSection1">
                  <C.SubTitle>Survey Objectives</C.SubTitle>
                  <C.Desc className='font-newsreader'>
                    Cooperative Extension (CE) is a nationwide network of land-grant university researchers and educators who 
                    solve problems in agriculture, the environment, and human and community well-being. They work to foster a 
                    connection between the university and the public by delivering science-based information. In 
                    California, <a href='https://ucanr.edu/' target="_blank">UC Cooperative Extension</a> is facing reductions 
                    in personnel, meaning current advisors are stretched thin and need to prioritize their efforts. At the same 
                    time, the landscape of California agriculture is rapidly changing and farmers are encountering new challenges 
                    such as regulations on labor and inputs.
                  </C.Desc>
                  <C.Desc className='font-newsreader'>
                    We recently conducted a statewide collaborative needs assessment to give a voice to farmers and others working 
                    in agronomic crop production. The goal was to understand their priorities, concerns, and top management 
                    challenges, helping identify critical needs for research and extension. Our online survey questions were 
                    designed to shed light on the most important issues and preferences for extension information and approaches 
                    based on input from growers, consultants, and allied industry for agronomic crops across the state.
                  </C.Desc>
                  <C.Desc className='font-newsreader'>
                    Through this interactive website, our goal is to share the findings with survey participants, collaborating
                    organizations, and the general public. We want your feedback and ideas, so that your needs and interests can 
                    better guide UCCE research and extension efforts and inform future programs, increasing engagement and impact. 
                    This resource will also be critical for state regulatory agencies and policy-makers to help set priorities and 
                    identify new opportunities for research, extension, and collaboration.
                  </C.Desc>
                
                  <C.SubTitle>Survey Scope</C.SubTitle>
                  <C.Desc className='font-newsreader'>
                    A total of 483 growers, consultants, and members of allied industries responded to the survey. All seven
                    regions of California were represented. As depicted in the figures below, there was a large diversity of
                    primary occupation, geographic distribution, crops grown or managed, and respondent demographics
                    (farm size, age, years of experience). The Central Valley had the most respondents and is where the
                    majority of agronomic crop production is located.
                  </C.Desc>
                  <C.Desc className='font-newsreader'>
                    The five agronomic crops most frequently grown by respondents whose primary vocation was “grower” included 
                    rice, alfalfa, wheat (grain), corn (grain), and corn (silage), representing 48% of total responses. The next 
                    five crops most frequently grown were dry bean, cotton, sunflower, barley, and small grain silage, 
                    representing 25% of total responses.
                  </C.Desc>
                  <C.Desc className='font-newsreader'>
                    A peer-reviewed research paper summarizing the survey results has been published. See the 
                    open-access <a href='https://acsess.onlinelibrary.wiley.com/doi/full/10.1002/agj2.20897' target="_blank">full 
                    article</a> in Agronomy Journal for further details on the 
                    methodology, interpretation of results, and conclusions for California agriculture.
                  </C.Desc>
                </div>
              </ParallaxLayer>
              <ParallaxLayer factor={3} offset={1} style={{
                backgroundImage: `url(${singleWheat})`,
                backgroundSize: 'cover'
              }}> 
              </ParallaxLayer>
              <ParallaxLayer offset={2} speed = {0.4}> 
                <div id = "infoSection2">
                  <div>
                    <C.SubTitle>Responses by Region, County, Occupation, and Crop</C.SubTitle>
                      <C.Desc className='font-newsreader'>
                        The visualizations below reflect the amount of respondents given a specific county, region, occupation, or crop. 
                      </C.Desc>
                  </div>
                    <MapChart data={useData('./data/Filtered_Crop_Data.csv')} filter={"All"} />
                    <RegionMapChart data={useData('./data/Filtered_Crop_Data.csv')} filter={"All"} />
                </div>
              </ParallaxLayer>
              <ParallaxLayer offset={3} speed = {0.2}>  
                <div id = "infoSection3">
                  <C.Desc className='font-newsreader' style={{textAlign: 'center'}}>
                    <br></br><br></br>Additionally, survey participants could list their top grown or consulted crops. Below is a bar chart depicting the number of
                    responses for each crop:
                  </C.Desc> 
                  <CropBar data={useData('./data/Filtered_Crop_Data.csv')}/>
                </div>
              </ParallaxLayer>
            </C.Body>
          </C.Area>
        </C.Container>
      </Parallax>
    </div>
  );
}
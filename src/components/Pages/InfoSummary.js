import * as C from './App.styles';
import {MapChart, CropBar} from '../Visualizations/CaliforniaCounties'
import {RegionMapChart} from '../Visualizations/RegionMap'
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import singleWheat from '../../images/one_wheat.jpg'
import sky from '../../images/sky.jpg'
import './InfoSummary.css';

export const InfoSummary = (props) => {

  return (
    <div>
      <Parallax pages={3.5}>
        <C.Container>
          <C.Area>          
            <C.Body>
              <ParallaxLayer factor={1.5} style={{
                backgroundImage: `url(${sky})`,
                backgroundSize: 'cover'
              }}>
              </ParallaxLayer>
              <ParallaxLayer speed = {0.8}> 
                <div id = "infoSection1">
                  <C.SubTitle>Survey Objectives</C.SubTitle>
                  <C.Desc className='font-roboto'>
                    Cooperative Extension (CE) is a nationwide network of land-grant university researchers and educators who 
                    solve problems in agriculture, the environment, and human and community well-being. They work to foster a 
                    connection between the university and the public by delivering science-based information. In 
                    California, <a href='https://ucanr.edu/' className="hover-link" target="_blank">UC Cooperative Extension</a>, 
                    which is administered by the UC Agriculture and Natural Resources Division (UC ANR), is currently undertaking 
                    an historic increase in personnel. In July of 2022, the Governor signed a budget which increased the UC ANR 
                    budget to the pre-COVID levels of FY 2019-20 in addition to a 5% increase as well as an additional ongoing 
                    $32 million. This resuscitation of UC Cooperative Extension will bring about meaningful collaborative 
                    opportunities for current advisors and specialists who are stretched thin and need to prioritize their 
                    efforts. The landscape of California agriculture is rapidly changing. Farmers are encountering new challenges 
                    such as regulations on labor and inputs, and UC Cooperative Extension is preparing to respond by hiring 48 
                    new extension advisors and 16 extension specialists by the end of 2023.
                  </C.Desc>
                  <C.Desc className='font-roboto'>
                    We recently conducted a statewide collaborative needs assessment to give a voice to farmers and others working 
                    in agronomic crop production. The goal was to understand their priorities, concerns, and top management 
                    challenges, helping identify critical needs for research and extension. Our online survey questions were 
                    designed to shed light on the most important issues and preferences for extension information and approaches 
                    based on input from growers, consultants, and allied industry for agronomic crops across the state. Incoming 
                    extension advisors and specialists with responsibilities for research and education about agronomic crops can 
                    utilize the information in this survey to best serve their new clientele.
                  </C.Desc>
                  <C.Desc className='font-roboto'>
                    Through this interactive website, our goal is to share the findings with survey participants, collaborating
                    organizations, and the general public. We want your feedback and ideas, so that your needs and interests can 
                    better guide UCCE research and extension efforts and inform future programs, increasing engagement and impact. 
                    This resource will also be critical for state regulatory agencies and policy-makers to help set priorities and 
                    identify new opportunities for research, extension, and collaboration.
                  </C.Desc>
                
                  <C.SubTitle>Survey Scope</C.SubTitle>
                  <C.Desc className='font-roboto'>
                    A total of 483 growers, consultants, and members of allied industries responded to the survey. All seven
                    regions of California were represented. As depicted in the figures below, there was a large diversity of
                    primary occupation, geographic distribution, crops grown or managed, and respondent demographics
                    (farm size, age, years of experience). The Central Valley had the most respondents and is where the
                    majority of agronomic crop production is located.
                  </C.Desc>
                  <C.Desc className='font-roboto'>
                    The five agronomic crops most frequently grown by respondents whose primary vocation was “grower” included 
                    rice, alfalfa, wheat (grain), corn (grain), and corn (silage), representing 48% of total responses. The next 
                    five crops most frequently grown were dry bean, cotton, sunflower, barley, and small grain silage, 
                    representing 25% of total responses.
                  </C.Desc>
                  <C.Desc className='font-roboto'>
                    A peer-reviewed research paper summarizing the survey results has been published. See the 
                    open-access <a href='https://acsess.onlinelibrary.wiley.com/doi/full/10.1002/agj2.20897' className="hover-link" target="_blank">full 
                    article</a> in Agronomy Journal for further details on the 
                    methodology, interpretation of results, and conclusions for California agriculture.
                  </C.Desc>
                </div>
              </ParallaxLayer>
              <ParallaxLayer factor={2} offset={1.5} style={{
                backgroundImage: `url(${singleWheat})`,
                backgroundSize: 'cover'
              }}> 
              </ParallaxLayer>
              <ParallaxLayer offset={1.95} speed = {0.8}> 
                <div id = "infoSection2">
                  <div id="info-vis-title">
                    <C.SubTitle>Responses by Vocation, County, Region, and Crop</C.SubTitle>
                      <C.Desc className='font-roboto'>
                        The visualizations below reflect the amount of respondents given a specific vocation, county, region, or crop. 
                      </C.Desc>
                  </div>
                    <MapChart data={props.dataset} filter={"All"}/>
                    <RegionMapChart data={props.dataset} filter={"All"}/>
                </div>
              </ParallaxLayer>
              <ParallaxLayer offset={2.95} speed = {0.8}>  
                <div id = "infoSection3">
                  <CropBar data={props.dataset}/>
                </div>
              </ParallaxLayer>
            </C.Body>
          </C.Area>
        </C.Container>
      </Parallax>
    </div>
  );
}
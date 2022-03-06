import * as C from './App.styles';
import {MapChart, CropBar} from '../Visualizations/CaliforniaCounties'
import { useData } from '../Visualizations/UseData';
import "@fontsource/newsreader";
import file from './downloads/ResearchPaper.pdf'
export const InfoSummary = () => {

  return (
    <C.Container>
      <C.Area>
        <C.Menu>
          <div >
            <img
              src="./assets/icons/UCCE.png"
              alt="logo"
            />
          </div>
          <div className="menuItem">
            <ul>
              <li><a href={file} download>Survey Research Paper</a></li>
              <li><a href='https://caes.ucdavis.edu/outreach/ce'>About UCCE</a> </li>
              <li><a href='https://caes.ucdavis.edu/outreach/geo/projects'>Get Involved</a></li>
            </ul>
          </div>
        </C.Menu>

        <C.Body>
          <C.Title>UCCE Information</C.Title>
          <C.Desc className='font-newsreader'>
                Cooperative Extension (CE) is a nationwide network of land-grant university researchers and educators who solve problems 
                in agriculture, the environment, and human and community well-being. They work to foster a connection between the university 
                and the public by delivering science-based information. However, UC Cooperative Extension is facing reductions in personnel, 
                meaning current advisors are stretched thin and need to prioritize their efforts. At the same time, the landscape of 
                California agriculture is rapidly changing and farmers are encountering new challenges such as regulations on labor and 
                inputs. We recently conducted a statewide collaborative needs assessment to give a voice to farmers and others in agriculture
                to understand their priorities and inform future UCCE programs, increasing engagement and impact. Specifically, we
                administered an online survey to shed light on common challenges and top concerns of growers, consultants, and allied
                industry for agronomic crops across the state. Now, our team hopes to disseminate the findings to the general public
                through an interactive website. This resource will also be critical for state regulatory agencies and policy-makers
                to identify new opportunities for research, extension, and collaboration.
            </C.Desc>
            
            <C.SubTitle>Survey Scope</C.SubTitle>
            <C.Desc className='font-newsreader'>
                    The survey had hundreds of respondants from all over California. There was a large diversity of ages, crop specializations,
                    and occupations. Vocations interviewed for the survey included growers, consultants, members of allied industries, and others who did not fall into the aforementioned categories.
                    Below is a map representing the density of responses in respect to county, as well as the distribution of responses per occupation:
            </C.Desc> 
            <MapChart data={useData('./data/Filtered_Crop_Data.csv')} filter={"All"} />
            <C.Desc className='font-newsreader'>
                    Additionally, survey participants could list their top grown or consulted crops. Below is a bar chart depicting the number of
                    responses for each crop:
            </C.Desc> 
            <CropBar data={useData('./data/Filtered_Crop_Data.csv')}/>
          {/* <C.Button>
            <button>
              See Full Survey results
              <img 
                src="/assets/icons/arrow.png"
                alt="arrow"
              />
            </button>
          </C.Button> */}
        </C.Body>
      </C.Area>
    </C.Container>
  );
}
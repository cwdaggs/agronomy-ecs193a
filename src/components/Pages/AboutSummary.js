import * as C from './App.styles';
import './AboutSummary.css';
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const height = vh*0.99;
const width = vw;
export const AboutSummary = () => {
    return(
    <div className="about-page">
    <C.Container>
      <C.Area>
        <C.Body>
          <C.ProfileTitle>Project Team</C.ProfileTitle>
          <br></br>
          <div className='team-profiles'>
            <div className='profile'>
              <img src="./assets/1-Jessie-Kanter-UCCE.jpg" alt="Jessie Kanter" className="profile-img"/>
              <div className='profile-name'>
                <span>Jessie Kanter </span>
                {/* <ul>
                  <li>Assistant Specialist</li>
                  <li><a href='https://ucanr.edu/About/DirectorySearch/?facultyid=45966' className="hover-link" target="_blank">UCCE</a></li>
                </ul>
                <p>Jessie Kanter - </p> */}
                <p>Assistant Specialist</p>
                <a href='https://ucanr.edu/About/DirectorySearch/?facultyid=45966' className="hover-link" target="_blank">UCCE</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/2-Nick-Clark-UCCE.jpg" alt="Nick Clark" className="profile-img"/>
              <div className='profile-name'>
                <span>Nick Clark </span>
                <p>Assistant CE Advisor</p>
                <a href='https://ucanr.edu/sites/Bees_and_Pollination/Contact_Us/?facultyid=26947' className="hover-link" target="_blank">UCCE</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/3-Mark-Lundy-Davis.jpg" alt="Mark Lundy" className="profile-img"/>
              <div className='profile-name'>
                <span>Mark Lundy </span>
                <p>Assistant Professor of Extension</p>
                <a href='https://www.plantsciences.ucdavis.edu/people/mark-lundy' className="hover-link" target="_blank">UC Davis</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/4-Vikram-Koundinya-Davis.jpg" alt="Vikram Koundinya" className="profile-img"/>
              <div className='profile-name'>
                <span>Vikram Koundinya </span>
                <p>Associate Professor of CE</p>
                <a href='https://humanecology.ucdavis.edu/people/vikram-koundinya' className="hover-link" target="_blank">UC Davis</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/5-Michelle-Leinfelder-Miles-UCCE.jpg" alt="Michelle Leinfelder-Miles" className="profile-img"/>
              <div className='profile-name'>
                <span>Michelle Leinfelder-Miles </span>
                <p>Farm Advisor</p>
                <a href='https://ucanr.edu/?facultyid=20507' className="hover-link" target="_blank">UCCE</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/6-Rachael-Long-UCCE.jpg" alt="Rachael Long" className="profile-img"/>
              <div className='profile-name'>
                <span>Rachael Long </span>
                <p>Farm Advisor for Field Crops</p>
                <a href='https://ucanr.edu/?facultyid=1355' className="hover-link" target="_blank">UCCE</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/7-Sarah-Light-UCCE.jpg" alt="Sarah Light" className="profile-img"/>
              <div className='profile-name'>
                <span>Sarah Light </span>
                <p>Agronomy Farm Advisor</p>
                <a href='https://cesutter.ucanr.edu/http___cesutterucanredu/?facultyid=36230' className="hover-link" target="_blank">UCCE</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/8-Whitney-Brim-DeForest-UCCE.jpg" alt="Whitney Brim-DeForest" className="profile-img"/>
              <div className='profile-name'>
                <span>Whitney Brim-DeForest </span>
                <p>County Director, CE Advisor</p>
                <a href='https://ucanr.edu/?facultyid=33566' className="hover-link" target="_blank">UCCE</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/9-Bruce-Linquist-Davis.jpg" alt="Bruce Linquist" className="profile-img"/>
              <div className='profile-name'>
                <span>Bruce Linquist </span>
                <p>Professor of Extension</p>
                <a href='https://www.plantsciences.ucdavis.edu/people/bruce-linquist' className="hover-link" target="_blank">UC Davis</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/10-Dan-Putnam-Davis.jpg" alt="Dan Putnam" className="profile-img"/>
              <div className='profile-name'>
                <span>Dan Putnam </span>
                <p>Professor of Extension</p>
                <a href='https://www.plantsciences.ucdavis.edu/people/daniel-putnam' className="hover-link" target="_blank">UC Davis</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/11-Robert-B.-Hutmacher-Davis.jpg" alt="Robert B. Hutmacher" className="profile-img"/>
              <div className='profile-name'>
                <span>Robert B. Hutmacher </span>
                <p>Professor of Extension and Director</p>
                <a href='https://www.plantsciences.ucdavis.edu/people/robert-hutmacher' className="hover-link" target="_blank">UC Davis</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/12-Cameron-Pittelkow-Davis.jpg" alt="Cameron Pittelkow" className="profile-img"/>
              <div className='profile-name'>
                <span>Cameron Pittelkow </span>
                <p>Associate Professor</p>
                <a href='https://www.plantsciences.ucdavis.edu/people/cameron-pittelkow' className="hover-link" target="_blank">UC Davis</a>
              </div>
            </div>
          </div>
        </C.Body>

        <C.Body>
          <C.ProfileTitle>Application Team</C.ProfileTitle>
          <br></br>
          <div className='dev-profiles'>
            <div className='profile'>
              <img src="./assets/Austin-Kosnikowski.jpg" alt="Austin Kosnikowski" className="profile-img"/>
              <div className='profile-name'>
                <span>Austin Kosnikowski - </span>
                <a href='https://www.linkedin.com/in/austin-kosnikowski-769206236/' className="hover-link" target="_blank">LinkedIn</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/Cameron-Daggs.jpg" alt="Cameron Daggs" className="profile-img"/>
              <div className='profile-name'>
                <span>Cameron Daggs - </span>
                <a href='https://www.linkedin.com/in/cameron-daggs-45a2a6163/' className="hover-link" target="_blank">LinkedIn</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/Christopher-Pires.jpg" alt="Christopher Pires" className="profile-img"/>
              <div className='profile-name'>
                <span>Christopher Pires - </span>
                <a href='https://www.linkedin.com/in/christopher-pires-0280ba20b/' className="hover-link" target="_blank">LinkedIn</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/Darin-Lee.jpg" alt="Darin Lee" className="profile-img"/>
              <div className='profile-name'>
                <span>Darin Lee - </span>
                <a href='https://www.linkedin.com/in/darin-lee-3486031b1/' className="hover-link" target="_blank">LinkedIn</a>
              </div>
            </div>
          </div>
        </C.Body>
      </C.Area>
    </C.Container>
    </div>
    );
}
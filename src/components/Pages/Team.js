import * as C from './App.styles';
import './Team.css';
import {BsLinkedin, BsGithub} from "react-icons/bs";

export const Team = () => {
    return(
    <div className="team-page">
    <C.Container>
      <C.Area>
        <C.Body>
          <C.ProfileTitle>Project Team</C.ProfileTitle>
          <br></br>
          <div className='team-profiles'>
            <div className='profile'>
              <img src="./assets/1-Jessie-Kanter-UCCE.jpg" alt="Jessie Kanter" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Jessie Kanter </p>
                <p>Assistant Specialist</p>
                <p>UCCE</p>
                <p><a rel="noreferrer" href='https://ucanr.edu/About/DirectorySearch/?facultyid=45966' className="hover-link" target="_blank">Learn more about Jessie!</a></p>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/2-Nick-Clark-UCCE.jpg" alt="Nick Clark" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Nick Clark </p>
                <p className='profile-description'>Assistant CE Advisor</p>
                <p>UCCE</p>
                <p><a rel="noreferrer" href='https://cekings.ucanr.edu/Agriculture/Agronomic_Cropping_Systems_Nutrient_Management/' className="hover-link" target="_blank">Learn more about Nick!</a></p>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/3-Mark-Lundy-Davis.jpg" alt="Mark Lundy" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Mark Lundy </p>
                <p className='profile-description'>Assistant Professor of Extension</p>
                <p>UC Davis</p>
                <p><a rel="noreferrer" href='https://www.plantsciences.ucdavis.edu/people/mark-lundy' className="hover-link" target="_blank">Learn more about Mark!</a></p>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/4-Vikram-Koundinya-Davis.jpg" alt="Vikram Koundinya" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Vikram Koundinya </p>
                <p className='profile-description'>Associate Professor of CE</p>
                <p>UC Davis</p>
                <p><a rel="noreferrer" href='https://humanecology.ucdavis.edu/people/vikram-koundinya' className="hover-link" target="_blank">Learn more about Vikram!</a></p>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/5-Michelle-Leinfelder-Miles-UCCE.jpg" alt="Michelle Leinfelder-Miles" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Michelle Leinfelder-Miles </p>
                <p className='profile-description'>Farm Advisor</p>
                <p>UCCE</p>
                <p><a rel="noreferrer" href='https://ucanr.edu/?facultyid=20507' className="hover-link" target="_blank">Learn more about Michelle!</a></p>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/6-Rachael-Long-UCCE.jpg" alt="Rachael Long" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Rachael Long </p>
                <p className='profile-description'>Farm Advisor for Field Crops</p>
                <p>UCCE</p>
                <p><a rel="noreferrer" href='https://ucanr.edu/?facultyid=1355' className="hover-link" target="_blank">Learn more about Rachael!</a></p>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/7-Sarah-Light-UCCE.png" alt="Sarah Light" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Sarah Light </p>
                <p className='profile-description'>Agronomy Farm Advisor</p>
                <p>UCCE</p>
                <p><a rel="noreferrer" href='https://cesutter.ucanr.edu/http___cesutterucanredu/?facultyid=36230' className="hover-link" target="_blank">Learn more about Sarah!</a></p>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/8-Whitney-Brim-DeForest-UCCE.jpg" alt="Whitney Brim-DeForest" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Whitney Brim-DeForest </p>
                <p className='profile-description'>County Director and CE Advisor</p>
                <p>UCCE</p>
                <p><a rel="noreferrer" href='https://ucanr.edu/?facultyid=33566' className="hover-link" target="_blank">Learn more about Whitney!</a></p>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/9-Bruce-Linquist-Davis.jpg" alt="Bruce Linquist" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Bruce Linquist </p>
                <p className='profile-description'>Professor of Extension</p>
                <p>UC Davis</p>
                <p><a rel="noreferrer" href='https://www.plantsciences.ucdavis.edu/people/bruce-linquist' className="hover-link" target="_blank">Learn more about Bruce!</a></p>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/10-Dan-Putnam-Davis.jpg" alt="Dan Putnam" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Dan Putnam </p>
                <p className='profile-description'>Professor of Extension</p>
                <p>UC Davis</p>
                <p><a rel="noreferrer" href='https://www.plantsciences.ucdavis.edu/people/daniel-putnam' className="hover-link" target="_blank">Learn more about Dan!</a></p>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/11-Robert-B.-Hutmacher-Davis.jpg" alt="Robert B. Hutmacher" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Robert B. Hutmacher </p>
                <p className='profile-description'>Professor of Extension and Director</p>
                <p>UC Davis</p>
                <p><a rel="noreferrer" href='https://www.plantsciences.ucdavis.edu/people/robert-hutmacher' className="hover-link" target="_blank">Learn more about Robert!</a></p>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/12-Cameron-Pittelkow-Davis.jpg" alt="Cameron Pittelkow" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Cameron Pittelkow </p>
                <p className='profile-description'>Associate Professor</p>
                <p>UC Davis</p>
                <p><a rel="noreferrer" href='https://www.plantsciences.ucdavis.edu/people/cameron-pittelkow' className="hover-link" target="_blank">Learn more about Cameron!</a></p>
              </div>
            </div>
          </div>
        </C.Body>

        <C.Body>
          <C.ProfileTitle>Application Team</C.ProfileTitle>
          <br></br>
          <div className='team-profiles'>
            <div className='profile'>
              <img src="./assets/Austin-Kosnikowski.jpg" alt="Austin Kosnikowski" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Austin Kosnikowski</p>
                <p className='profile-description'>Computer Science Student</p>
                <a rel="noreferrer" href='https://www.linkedin.com/in/austin-kosnikowski-769206236/' className="hover-link" target="_blank"><BsLinkedin></BsLinkedin></a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/Cameron-Daggs.jpg" alt="Cameron Daggs" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Cameron Daggs</p>
                <p className='profile-description'>Computer Science and Engineering Student</p>
                <a rel="noreferrer" href='https://www.linkedin.com/in/cameron-daggs-45a2a6163/' className="hover-link" target="_blank"><BsLinkedin></BsLinkedin></a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/Christopher-Pires.jpg" alt="Christopher Pires" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Christopher Pires</p>
                <p className='profile-description'>Computer Science and Engineering Student</p>
                <a rel="noreferrer" href='https://www.linkedin.com/in/christopher-pires-0280ba20b/' className="hover-link" target="_blank"><BsLinkedin></BsLinkedin></a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/Darin-Lee.jpg" alt="Darin Lee" className="profile-img"/>
              <div className='profile-name profile-description'>
                <p style={{fontWeight:"800"}}>Darin Lee</p>
                <p className='profile-description'>Computer Science and Engineering Student</p>
                <a rel="noreferrer" href='https://www.linkedin.com/in/darin-lee-3486031b1/' className="hover-link" target="_blank"><BsLinkedin></BsLinkedin></a>
              </div>
            </div>
          </div>
        </C.Body>
      </C.Area>
    </C.Container>
    <div id="git_link">
      <a rel="noreferrer" href='https://github.com/cwdaggs/agronomy-ecs193a' className="hover-link" target="_blank"><BsGithub/> Project GitHub</a>
    </div>
    </div>
    );
}
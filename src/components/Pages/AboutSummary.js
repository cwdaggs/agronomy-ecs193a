import * as C from './App.styles';
import "@fontsource/newsreader";
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const height = vh*0.99;
const width = vw;
export const AboutSummary = () => {
    return(
    <div id="aboutpage">
    <C.Container>
      <C.Area>
        <C.Body>
          <C.Title>Project Team</C.Title>
          <br></br>
          <div id='team-profiles'>
            <div className='profile'>
              <img src="./assets/1-Jessie-Kanter-UCCE.jpg" alt="Jessie Kanter" height={height/3} width={height/3}/>
              <div className='profile-name'>
                <span>Jessie Kanter - </span>
                <a href='https://smallfarmsfresno.ucanr.edu/Staff/' target="_blank">UCCE</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/2-Nick-Clark-UCCE.jpg" alt="Nick Clark" height={height/3} width={height/3}/>
              <div className='profile-name'>
                <span>Nick Clark - </span>
                <a href='https://ucanr.edu/sites/Bees_and_Pollination/Contact_Us/?facultyid=26947' target="_blank">UCCE</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/3-Mark-Lundy-Davis.jpg" alt="Mark Lundy" height={height/3} width={height/3}/>
              <div className='profile-name'>
                <span>Mark Lundy - </span>
                <a href='https://www.plantsciences.ucdavis.edu/people/mark-lundy' target="_blank">UC Davis</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/4-Vikram-Koundinya-Davis.jpg" alt="Vikram Koundinya" height={height/3} width={height/3}/>
              <div className='profile-name'>
                <span>Vikram Koundinya - </span>
                <a href='https://humanecology.ucdavis.edu/people/vikram-koundinya' target="_blank">UC Davis</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/5-Michelle-Leinfelder-Miles-UCCE.jpg" alt="Michelle Leinfelder-Miles" height={height/3} width={height/3}/>
              <div className='profile-name'>
                <span>Michelle Leinfelder-Miles - </span>
                <a href='https://ucanr.edu/?facultyid=20507' target="_blank">UCCE</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/6-Rachael-Long-UCCE.jpg" alt="Rachael Long" height={height/3} width={height/3}/>
              <div className='profile-name'>
                <span>Rachael Long - </span>
                <a href='https://ucanr.edu/?facultyid=1355' target="_blank">UCCE</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/7-Sarah-Light-UCCE.jpg" alt="Sarah Light" height={height/3} width={height/3}/>
              <div className='profile-name'>
                <span>Sarah Light - </span>
                <a href='https://cesutter.ucanr.edu/http___cesutterucanredu/?facultyid=36230' target="_blank">UCCE</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/8-Whitney-Brim-DeForest-UCCE.jpg" alt="Whitney Brim-DeForest" height={height/3} width={height/3}/>
              <div className='profile-name'>
                <span>Whitney Brim-DeForest - </span>
                <a href='https://ucanr.edu/?facultyid=33566' target="_blank">UCCE</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/9-Bruce-Linquist-Davis.jpg" alt="Bruce Linquist" height={height/3} width={height/3}/>
              <div className='profile-name'>
                <span>Bruce Linquist - </span>
                <a href='https://www.plantsciences.ucdavis.edu/people/bruce-linquist' target="_blank">UC Davis</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/10-Dan-Putnam-Davis.jpg" alt="Dan Putnam" height={height/3} width={height/3}/>
              <div className='profile-name'>
                <span>Dan Putnam - </span>
                <a href='https://www.plantsciences.ucdavis.edu/people/daniel-putnam' target="_blank">UC Davis</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/11-Robert-B.-Hutmacher-Davis.jpg" alt="Robert B. Hutmacher" height={height/3} width={height/3}/>
              <div className='profile-name'>
                <span>Robert B. Hutmacher - </span>
                <a href='https://www.plantsciences.ucdavis.edu/people/robert-hutmacher' target="_blank">UC Davis</a>
              </div>
            </div>
            <div className='profile'>
              <img src="./assets/12-Cameron-Pittelkow-Davis.jpg" alt="Cameron Pittelkow" height={height/3} width={height/3}/>
              <div className='profile-name'>
                <span>Cameron Pittelkow - </span>
                <a href='https://www.plantsciences.ucdavis.edu/people/cameron-pittelkow' target="_blank">UC Davis</a>
              </div>
            </div>
          </div>
        </C.Body>
      </C.Area>
    </C.Container>
    </div>
    );
}
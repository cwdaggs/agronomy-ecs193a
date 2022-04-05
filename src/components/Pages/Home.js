

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
                    <button>Learn More!</button>
                </div>
            </div>    

                {/* <rect width="400" height="400" x="200" y="400" class="rect-home" />
                <text class="vis-title" x="330" y="500">Place Holder</text>

                <rect width="400" height="400" x="700" y="400" class="rect-home" />
                <text class="vis-title" x="850" y="500">Place Holder</text>

                <rect width="400" height="400" x="1200" y="400" class="rect-home" />
                <text class="vis-title" x="1320" y="500">Place Holder</text> */}
        </div>
    );
}
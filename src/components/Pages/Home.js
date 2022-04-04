

export const Home = () => {

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vh*0.9;
    const width = vw;
    return(
        <div id="bg">
            <div className="gfg">
                <img align="middle"
                    src="./assets/Welcome.png"
                    alt="logo"
                    width={width/2}
                    height={height}  
                />
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
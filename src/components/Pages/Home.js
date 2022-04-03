export const Home = () => {

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vh*0.99;
    const width = vw;
    return(
        <div id="bg">
            <svg height={height} width={width}>
                <rect width="800" height="200" x="500" y="100" class="rect-home" />
                <text class="vis-title" x="850" y="200">Welcome!</text>

                {/* <rect width="400" height="400" x="200" y="400" class="rect-home" />
                <text class="vis-title" x="330" y="500">Place Holder</text>

                <rect width="400" height="400" x="700" y="400" class="rect-home" />
                <text class="vis-title" x="850" y="500">Place Holder</text>

                <rect width="400" height="400" x="1200" y="400" class="rect-home" />
                <text class="vis-title" x="1320" y="500">Place Holder</text> */}
            </svg>
        </div>
    );
}
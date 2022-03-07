export const Home = () => {

    
    return(
        <div id="bg">
            <svg height="1200" width="1600">
                <rect width="800" height="200" x="500" y="100" class="rect-home" />
                <text class="vis-title" x="850" y="200">Welcome!</text>

                <rect width="400" height="400" x="200" y="400" class="rect-home" />
                <text class="vis-title" x="330" y="500">Visualizations</text>

                <rect width="400" height="400" x="700" y="400" class="rect-home" />
                <text class="vis-title" x="850" y="500">Information</text>

                <rect width="400" height="400" x="1200" y="400" class="rect-home" />
                <text class="vis-title" x="1320" y="500">About the Team</text>
            </svg>
        </div>
    );
}
import Link from '../componet/atoms/Link'
import Navbar from '../componet/molecules/Navbar';
import Video, {VideoGrid} from '../componet/molecules/Video';

import data from '../data.json'

const HomePage = () =>{
    return (
        <>
            <Navbar/>
            <VideoGrid>
                {data.videos.map(video => (
                    <Video key={video.id} {...video}/>
                ))}
            </VideoGrid>

            
        </>
    )
}

export default HomePage;
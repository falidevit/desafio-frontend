import React, {useState, useEffect } from "react";
import styled from "styled-components";
import {useParams } from "react-router-dom";
import Skeleton from "../skeletons/HomeSkeleton";
import VideoGrid from "../styles/VideoGrid";
import youtube from '../apis/youtube';
import VideoCard from '../components/VideoCard';
import Navbar from "../components/Navbar";
import VideoDetail from "../components/VideoDetail";
import { Link } from "react-router-dom";

export const StyledHome = styled.div`
  padding: 1.3rem;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 7rem;

  h2 {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 1093px) {
    width: 95%;
  }

  @media screen and (max-width: 1090px) {
    width: 99%;
  }

  @media screen and (max-width: 870px) {
    width: 90%;
  }

  @media screen and (max-width: 670px) {
    width: 99%;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
  }

  @media screen and (max-width: 530px) {
    width: 100%;
  }
`;

const Home = () => {

  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([])
  const [video, selectedVideo] = useState([])
  const [recents, setRecents] = useState([]);

  const { searchterm } = useParams();
  
  const fetchData = async () =>{
    setLoading(true);
    try {
      const response  = await youtube.get('/search',{
          params: {
              q: searchterm,
              // source: 'en',
              // target: 'de',
          }
      })
      
    setVideos(response.data.items);
    selectedVideo(response.data.items[0])

    } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
  }

  const recentsearch =  () =>{
    if (searchterm !== undefined){
        setRecents([...recents, searchterm]);
        let recent = JSON.stringify(recents);
            window.localStorage.setItem('recents', recent)
    }
  }
  
  useEffect(() => {
    recentsearch()
    fetchData()
  }, [searchterm]);

  useEffect(() => {
    let  history = window.localStorage.getItem('recents')
    let  recent = history === null ? [] : JSON.parse(history)
    setRecents(recent);
    fetchData();
  }, []);


  const handleVideoSelect = (video) => {
    selectedVideo(video)
  }

  if (loading) {
    return <Skeleton title={true} />;
  }

  return (
    <StyledHome>
        <div className='ui container' style={{marginTop: '1em'}}>
            <Navbar  handleFormSubmit={fetchData} />
            <div className='ui grid'>
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={video} videos={videos}  handleVideoSelect={handleVideoSelect}/>
                    </div>
                    <VideoGrid>
                        {!loading &&
                        videos.map((video) => (
                          <Link key={video.id} onClick={ () => handleVideoSelect(video)}>
                            <VideoCard video={video} />
                          </Link>
                        ))}
                     </VideoGrid>
                </div>
            </div>
        </div>
    </StyledHome>
    
  );
};

export default Home;

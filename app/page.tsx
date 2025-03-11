import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";



export default function Home() {
  cosnt [videos, setVideos] = useState<IVideo[]>([])
  
  useEffect(()=>{
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos()
        setVideos(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchVideos()
  }, [])

  return (
    <div>
      <h1>Punnu Badmaash</h1>
    </div>
  );
}

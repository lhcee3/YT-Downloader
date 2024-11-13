"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Progress } from "@/app/components/ui/progress";
import { Download, Music } from 'lucide-react';

export default function Component() {
  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [videoProgress, setVideoProgress] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [videoComplete, setVideoComplete] = useState(false);
  const [audioComplete, setAudioComplete] = useState(false);

  const simulateProcess = (
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    setComplete: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setComplete(true);
      }
    }, 500);
  };

  const handleVideoDownload = () => {
    if (videoUrl) {
      setVideoComplete(false);
      simulateProcess(setVideoProgress, setVideoComplete);

      
      setTimeout(() => {
        const videoData = new Blob([/* your video data here */], { type: 'video/mp4' });
        const url = URL.createObjectURL(videoData);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded_video.mp4'; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); 
      }, 5000); 
    }
  };

  const handleAudioConvert = () => {
    if (audioUrl) {
      setAudioComplete(false);
      simulateProcess(setAudioProgress, setAudioComplete);

      
      setTimeout(() => {
        const audioData = new Blob([/* your audio data here */], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(audioData);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted_audio.mp3'; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); 
      }, 5000); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-900 via-black to-red-950 text-white">
      <div className="flex-grow p-8">
        <div className="max-w-lg mx-auto space-y-8 bg-black bg-opacity-50 p-10 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-red-500">⚡⚡⚡</h1>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-red-400">Download YouTube Video</h2>
            <Input
              type="text"
              placeholder="Enter YouTube URL for video download"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="bg-gray-800 border-red-500 text-white"
            />
            <Button onClick={handleVideoDownload} className="w-full bg-red-500 hover:bg-red-600 text-white">
              <Download className="mr-2 h-4 w-4" /> Download Video
            </Button>
            {videoProgress > 0 && !videoComplete && (
              <Progress value={videoProgress} className="w-full bg-gray-700" indicatorClassName="bg-red-500" />
            )}
            {videoComplete && <p className="text-green-500">Video download complete!</p>}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-red-400">Convert YouTube to MP3</h2>
            <Input
              type="text"
              placeholder="Enter YouTube URL for MP3 conversion"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              className="bg-gray-800 border-red-500 text-white"
            />
            <Button onClick={handleAudioConvert} className="w-full bg-red-500 hover:bg-red-600 text-white">
              <Music className="mr-2 h-4 w-4" /> Convert to MP3
            </Button>
            {audioProgress > 0 && !audioComplete && (
              <Progress value={audioProgress} className="w-full bg-gray-700" indicatorClassName="bg-red-500" />
            )}
            {audioComplete && <p className="text-green-500">MP3 conversion complete!</p>}
          </div>
        </div>
      </div>
      <footer className="py-4 text-center bg-black bg-opacity-50">
        <p className="text-red-500 text-sm font-semibold animate-pulse">
          developed by 
          <a href="https://github.com/lhcee3" target="_blank" rel="noopener noreferrer">
  <span className="ml-1 text-red-400 animate-glow">Aneesh</span>
</a>
        </p>
      </footer>
      <style jsx>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px #ff6b6b, 0 0 10px #ff6b6b, 0 0 15px #ff6b6b; }
          50% { text-shadow: 0 0 10px #ff6b6b, 0 0 20px #ff6b6b, 0 0 30px #ff6b6b; }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
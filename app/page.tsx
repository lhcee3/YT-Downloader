"use client";
import { useState } from 'react'
import { Download, Music, AlertCircle } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"

export default function Component() {
  const [url, setUrl] = useState('')
  const [format, setFormat] = useState('video')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) {
      setError('Please enter a valid YouTube URL')
      return
    }
    setIsLoading(true)
    setError('')
    // Simulating download process
    setTimeout(() => {
      setIsLoading(false)
      // Create a blob and download it
      const fileName = format === 'video' ? 'video.mp4' : 'audio.mp3';
      const blob = new Blob([`Downloading ${format} from: ${url}`], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col p-4">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-teal-400">YT Downloader</h1>
            <p className="mt-2 text-gray-400">Download YouTube videos or convert them to MP3</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="url" className="sr-only">YouTube URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="Paste YouTube URL here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-gray-800 border-gray-700 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <RadioGroup value={format} onValueChange={setFormat} className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" className="text-teal-400" />
                <Label htmlFor="video">Video</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="audio" id="audio" className="text-teal-400" />
                <Label htmlFor="audio">MP3</Label>
              </div>
            </RadioGroup>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white transition-colors duration-300"
            >
              {isLoading ? (
                'Processing...'
              ) : format === 'video' ? (
                <>
                  <Download className="mr-2 h-4 w-4" /> Download Video
                </>
              ) : (
                <>
                  <Music className="mr-2 h-4 w-4" /> Convert to MP3
                </>
              )}
            </Button>
          </form>
          {error && (
            <div className="flex items-center justify-center text-red-400">
              <AlertCircle className="mr-2 h-4 w-4" />
              {error}
            </div>
          )}
          <div className="text-center text-sm text-gray-500">
            <p>Making downloads easier.</p>
          </div>
        </div>
      </div>
      <footer className="mt-8 text-center">
        <p className="text-teal-400 text-sm font-medium animate-pulse">
          Developed by Aneesh
        </p>
      </footer>
    </div>
  )
}
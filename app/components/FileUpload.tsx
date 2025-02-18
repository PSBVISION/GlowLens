"use client";
import React, {  useState } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";


interface FileUploadProps {
  onSuccess: (res: IKUploadResponse)=> void
  onProgress? : (progress: number) => void;
  fileType? : "image" | "video";
}


const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;




export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image"
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onError = (err: {message: string}) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };
  
  const handleSuccess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false);
    setError(null);
    onSuccess(res);
  };
  
  const handleProgress = (evt : ProgressEvent) => {
    if(evt.lengthComputable && onProgress){
      const percentComplete = (evt.loaded /evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };
  
  const handleStartUpload = () => {
    setUploading(true)
    setError(null);
  };

  const validateFile = (file: File) => {
    if(fileType === "video"){
      if(!file.type.startsWith("video/")){
        setError("Please Upload Video File")
      }
      if(file.size > 100 * 1024 * 1024){
        setError("File size should be less than 100MB")
        return false
      }
    }else{
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if(!validTypes.includes(file.type)){
        setError("Please Upload Image with valid format")
        return false
      }
      if(file.size > 5 * 1024 * 1024){
        setError("File size should be less than 5MB")
        return false
      }
    }
  }
  return false

  }

  return (
    <div className="space-y-2">
      
        <IKUpload
          fileName={fileType === "video" ? "video" : "image"}
          
          
          useUniqueFileName={true}
          
          validateFile={validateFile}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleStartUpload}
          transformation={{
            pre: "l-text,i-Imagekit,fs-50,l-end",
            post: [
              {
                type: "transformation",
                value: "w-100",
              },
            ],
          }}
          style={{display: 'none'}} // hide the default input and use the custom upload button
          ref={ikUploadRefTest}
        />
        <p>Custom Upload Button</p>
        {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.click()}>Upload</button>}
        <p>Abort upload request</p>
        {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.abort()}>Abort request</button>}
      
      {/* ...other SDK components added previously */}
    </div>
  );
}
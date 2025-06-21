
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isProcessing: boolean;
  uploadedImage: string | null;
}

const ImageUpload = ({ onImageUpload, isProcessing, uploadedImage }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
    setDragActive(false);
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false)
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300",
          "hover:border-blue-400 hover:bg-blue-50/50",
          isDragActive || dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
          isProcessing && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        
        {uploadedImage ? (
          <div className="space-y-4">
            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm">Extracting colors...</p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {isProcessing ? 'Processing image...' : 'Click to upload a different image'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {isProcessing ? (
              <>
                <Loader2 className="w-12 h-12 text-blue-500 mx-auto animate-spin" />
                <p className="text-gray-600">Processing your image...</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {isDragActive ? 'Drop your image here' : 'Upload an image'}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Drag and drop or click to browse • PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

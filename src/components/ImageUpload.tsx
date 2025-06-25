import React, { useCallback, useState, memo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, Loader2, FileImage } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isProcessing: boolean;
  uploadedImage: string | null;
  uploadedFileName?: string;
}

const ImageUpload = memo(({ onImageUpload, isProcessing, uploadedImage, uploadedFileName }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
    setDragActive(false);
  }, [onImageUpload]);

  const handleDragEnter = useCallback(() => setDragActive(true), []);
  const handleDragLeave = useCallback(() => setDragActive(false), []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave
  });

  // Generate descriptive alt text for uploaded image
  const generateAltText = (fileName?: string) => {
    if (!fileName) return "Uploaded image for color extraction";
    
    const fileExtension = fileName.split('.').pop()?.toUpperCase() || '';
    const fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
    
    return `Image file "${fileNameWithoutExt}" (${fileExtension} format) uploaded for color palette extraction. Click to upload a different image.`;
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300",
          "hover:border-[#49a8b0] hover:bg-[#d7dbde]/20",
          isDragActive || dragActive ? "border-[#fc6c2c] bg-[#d7dbde]/30" : "border-gray-300",
          isProcessing && "pointer-events-none opacity-50"
        )}
        role="button"
        tabIndex={0}
        aria-label="Upload image for color extraction"
        aria-describedby="upload-instructions"
      >
        <input {...getInputProps()} aria-label="Select image file" />
        
        {uploadedImage ? (
          <div className="space-y-4">
            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={uploadedImage}
                alt={generateAltText(uploadedFileName)}
                className="max-w-full max-h-full object-contain bg-white"
                loading="lazy"
                decoding="async"
                role="img"
                aria-label={`Preview of uploaded image: ${uploadedFileName || 'image'}`}
              />
              {isProcessing && (
                <div 
                  className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  role="status"
                  aria-live="polite"
                  aria-label="Processing image for color extraction"
                >
                  <div className="text-white text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" aria-hidden="true" />
                    <p className="text-sm">Extracting colors...</p>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {uploadedFileName && (
                <p className="text-xs text-gray-500 font-mono">
                  File: {uploadedFileName}
                </p>
              )}
              <p className="text-sm text-gray-600" id="upload-instructions">
                {isProcessing ? 'Processing image for color extraction...' : 'Click to upload a different image'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {isProcessing ? (
              <>
                <Loader2 
                  className="w-12 h-12 text-[#fc6c2c] mx-auto animate-spin" 
                  aria-hidden="true"
                />
                <p className="text-gray-600" role="status" aria-live="polite">
                  Processing your image for color extraction...
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-gradient-to-br from-[#f5a94d] to-[#fc6c2c] rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-lg font-medium text-[#23394a] mb-2">
                    {isDragActive ? 'Drop your image here' : 'Upload an image'}
                  </p>
                  <p className="text-[#49a8b0] text-sm" id="upload-instructions">
                    Drag and drop or click to browse • PNG, JPG, GIF, WebP up to 10MB
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: JPEG, PNG, GIF, BMP, WebP
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;

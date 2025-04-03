
import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { X, FileIcon, Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface EnhancedFileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (files: FileList | null) => void;
  value?: File | null;
  accepted?: string[];
  maxSizeInMB?: number;
  label?: string;
  showPreview?: boolean;
  onError?: (errorMessage: string) => void;
  multiple?: boolean;
  description?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getAcceptedTypesString = (accepted?: string[]): string => {
  if (!accepted || accepted.length === 0) return '';
  return accepted.join(', ');
};

export function EnhancedFileUpload({
  onChange,
  value,
  accepted = [],
  maxSizeInMB = 5,
  label = 'Upload File',
  showPreview = true,
  onError,
  multiple = false,
  description,
  id,
  ...props
}: EnhancedFileUploadProps) {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  
  // Create a unique ID for the file input if not provided
  const inputId = id || `file-upload-${Math.random().toString(36).substring(2, 11)}`;
  
  React.useEffect(() => {
    if (value && value instanceof File) {
      if (value.type.startsWith('image/') && showPreview) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(value);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setPreviewUrl(null);
    }
    
    return () => {
      // Cleanup URL on unmount
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [value, showPreview]);
  
  const simulateUploadProgress = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    
    return () => clearInterval(interval);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setErrorMessage(null);
    
    if (!files || files.length === 0) {
      onChange(null);
      return;
    }
    
    // Check file size
    const file = files[0];
    if (file.size > maxSizeInBytes) {
      const errorMsg = `File too large. Maximum size is ${maxSizeInMB}MB`;
      setErrorMessage(errorMsg);
      if (onError) onError(errorMsg);
      toast({
        title: "File Too Large",
        description: errorMsg,
        variant: "destructive",
      });
      return;
    }
    
    // Check file type
    if (accepted.length > 0 && !accepted.includes(file.type)) {
      const errorMsg = `Invalid file type. Please upload ${getAcceptedTypesString(accepted)}`;
      setErrorMessage(errorMsg);
      if (onError) onError(errorMsg);
      toast({
        title: "Invalid File Type",
        description: errorMsg,
        variant: "destructive",
      });
      return;
    }
    
    const cleanup = simulateUploadProgress();
    onChange(files);
    
    // Cleanup after "upload" completes
    setTimeout(() => {
      cleanup();
    }, 1000);
  };
  
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    onChange(null);
    setErrorMessage(null);
    setPreviewUrl(null);
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="space-y-2">
      <div className="flex flex-col items-center justify-center w-full">
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-secondary/20 transition-colors"
          aria-describedby={`${inputId}-description`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 text-primary mb-2" />
            <p className="mb-2 text-sm text-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground" id={`${inputId}-description`}>
              {description || `${accepted.length > 0 ? getAcceptedTypesString(accepted) : 'Any file'} (Max ${maxSizeInMB}MB)`}
            </p>
            {errorMessage && (
              <div className="flex items-center mt-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
          <Input
            id={inputId}
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept={accepted.join(',')}
            multiple={multiple}
            className="hidden"
            aria-invalid={!!errorMessage}
            {...props}
          />
        </label>
      </div>
      
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Uploading...</span>
            <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}
      
      {value && !isUploading && (
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between p-2 bg-secondary/30 rounded-md">
            <div className="flex items-center space-x-2 overflow-hidden">
              {value.type.startsWith('image/') ? (
                <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <FileIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ) : (
                <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
                  <FileIcon className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{value.name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(value.size)}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClear}
              aria-label="Remove file"
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {showPreview && previewUrl && value.type.startsWith('image/') && (
            <div className="mt-2">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-48 rounded-md object-contain mx-auto border border-muted" 
              />
            </div>
          )}
          
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            <span>File ready for upload</span>
          </div>
        </div>
      )}
      
      <Button 
        type="button" 
        variant="secondary" 
        size="sm" 
        onClick={triggerFileInput}
        className="mt-2"
      >
        {value ? "Replace file" : "Select file"}
      </Button>
    </div>
  );
}

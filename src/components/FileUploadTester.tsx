import React, { useState, useRef } from 'react';
import { uploadFileToBucket } from '@/utils/fileUpload';

const FileUploadTester: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [bucketName, setBucketName] = useState<string>('test-uploads');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
      setUploadResult(null);
      setSuccessMessage(null);
    }
  };

  const handleBucketNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBucketName(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    if (!bucketName.trim()) {
      setError('Please enter a valid bucket name');
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadResult(null);
    setSuccessMessage(null);

    try {
      console.log(`Starting file upload to bucket '${bucketName}'...`);
      const result = await uploadFileToBucket(bucketName, file);
      console.log('Upload result:', result);
      
      setUploadResult(result);
      
      if (result.success) {
        setSuccessMessage(`File uploaded successfully! URL: ${result.publicUrl}`);
      } else {
        setError(typeof result.error === 'string' ? result.error : JSON.stringify(result.error));
      }
    } catch (err) {
      console.error('Error in upload:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setUploadResult(null);
    setError(null);
    setSuccessMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">File Upload Tester</h2>
      <p className="mb-4 text-gray-600">
        This tool helps test file uploads to Supabase Storage.
      </p>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Bucket Name</label>
        <input
          type="text"
          value={bucketName}
          onChange={handleBucketNameChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter bucket name (use hyphens, not underscores)"
        />
        <p className="mt-1 text-sm text-gray-500">Note: Bucket names must use hyphens (-) instead of underscores (_)</p>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select a file to upload</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          ref={fileInputRef}
        />
      </div>
      
      {file && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm font-medium">Selected file:</p>
          <p className="text-sm">{file.name} ({(file.size / 1024).toFixed(2)} KB)</p>
        </div>
      )}
      
      <div className="flex space-x-4">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          onClick={handleUpload}
          disabled={!file || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>
        
        <button
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={resetForm}
          disabled={isUploading}
        >
          Reset
        </button>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {successMessage && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Success</h3>
          <p className="text-green-600">{successMessage}</p>
          <a 
            href={uploadResult?.publicUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            View Uploaded File
          </a>
        </div>
      )}
      
      {uploadResult && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
          <h3 className="text-lg font-semibold mb-2">Upload Result Details</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-60">
            {JSON.stringify(uploadResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default FileUploadTester;

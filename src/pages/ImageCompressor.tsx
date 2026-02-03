import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { Upload, Download, X, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import SEO from '@/components/SEO';

interface CompressedImage {
  id: string;
  originalFile: File;
  compressedBlob: Blob;
  previewUrl: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  originalSize: number;
  compressedSize: number;
}

export default function ImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality] = useState(0.8);

  const processImage = async (file: File) => {
    const id = Math.random().toString(36).substring(7);
    const newImage: CompressedImage = {
      id,
      originalFile: file,
      compressedBlob: new Blob(),
      previewUrl: URL.createObjectURL(file),
      status: 'processing',
      originalSize: file.size,
      compressedSize: 0,
    };

    setImages((prev) => [...prev, newImage]);

    try {
      const options = {
        maxSizeMB: 2, // Default max size, can be adjusted
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality,
      };

      const compressedFile = await imageCompression(file, options);

      setImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? {
                ...img,
                compressedBlob: compressedFile,
                status: 'done',
                compressedSize: compressedFile.size,
              }
            : img
        )
      );
    } catch (error) {
      console.error(error);
      setImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, status: 'error' } : img))
      );
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(processImage);
  }, [quality]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
  });

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadImage = (img: CompressedImage) => {
    if (img.status !== 'done') return;
    const url = URL.createObjectURL(img.compressedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed-${img.originalFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <SEO 
        title="Image Compressor" 
        description="Secure client-side image compression. Compress JPG, PNG, WebP images locally without uploading to any server." 
      />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Image Compressor</h1>
        <p className="text-muted-foreground mt-2">
          Compress your images securely in your browser.
        </p>
      </div>

      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-muted-foreground/25 hover:border-primary/50'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-muted rounded-full">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-lg">
              {isDragActive ? 'Drop images here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              JPG, PNG, WebP up to 10MB
            </p>
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className="mt-8 space-y-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-card"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded overflow-hidden bg-muted relative">
                    <img src={img.previewUrl} alt="preview" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-medium truncate max-w-[200px]">
                    {img.originalFile.name}
                  </p>
                  <div className="text-xs text-muted-foreground flex gap-2">
                    <span>{formatSize(img.originalSize)}</span>
                    {img.status === 'done' && (
                      <>
                        <span>→</span>
                        <span className="text-green-600 font-medium">
                          {formatSize(img.compressedSize)}
                        </span>
                        <span className="text-green-600">
                          (-{Math.round(((img.originalSize - img.compressedSize) / img.originalSize) * 100)}%)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {img.status === 'processing' && (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                )}
                {img.status === 'done' && (
                  <button
                    onClick={() => downloadImage(img)}
                    className="p-2 hover:bg-accent rounded-md transition-colors text-primary"
                    title="Download"
                    >
                    <Download className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => removeImage(img.id)}
                  className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors text-muted-foreground"
                  title="Remove"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

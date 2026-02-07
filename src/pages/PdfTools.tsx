import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import jsPDF from 'jspdf';
import { FileText, Image as ImageIcon, Download, Trash2, Plus, MoveUp, MoveDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import SEO from '@/components/SEO';

type ToolType = 'merge' | 'img2pdf';

interface PdfFile {
  id: string;
  file: File;
  preview?: string;
}

export default function PdfTools() {
  const { t } = useTranslation();
  const [activeTool, setActiveTool] = useState<ToolType>('merge');
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: activeTool === 'merge' 
      ? { 'application/pdf': ['.pdf'] }
      : { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }
  });

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === files.length - 1)
    ) return;

    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const handleMerge = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const fileObj of files) {
        const fileBuffer = await fileObj.file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      downloadBlob(blob, 'merged.pdf');
    } catch (error) {
      console.error('Merge error:', error);
      alert(t('common.error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImg2Pdf = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const doc = new jsPDF();
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (i > 0) doc.addPage();
        
        const imgData = await fileToDataURL(file.file);
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
      
      doc.save('images.pdf');
    } catch (error) {
      console.error('Img2Pdf error:', error);
      alert(t('common.error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container max-w-4xl py-10 space-y-8">
      <SEO 
        title={t('pdf.title')} 
        description="Secure local PDF tools. Merge PDFs, convert images to PDF. No server uploads." 
      />
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t('pdf.title')}</h1>
        <p className="text-muted-foreground">
          {t('home.tools.pdfTools.desc')}
        </p>
      </div>

      {/* Tool Selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => { setActiveTool('merge'); setFiles([]); }}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-lg border transition-all",
            activeTool === 'merge' 
              ? "bg-primary text-primary-foreground border-primary" 
              : "bg-card hover:bg-accent"
          )}
        >
          <FileText className="w-5 h-5" />
          {t('pdf.merge')}
        </button>
        <button
          onClick={() => { setActiveTool('img2pdf'); setFiles([]); }}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-lg border transition-all",
            activeTool === 'img2pdf' 
              ? "bg-primary text-primary-foreground border-primary" 
              : "bg-card hover:bg-accent"
          )}
        >
          <ImageIcon className="w-5 h-5" />
          {t('pdf.imagesToPdf')}
        </button>
      </div>

      {/* Dropzone */}
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
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-lg">
              {t('pdf.dragDrop')}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {activeTool === 'merge' ? t('pdf.dropPdfs') : t('pdf.dropImages')}
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">
              {files.length} Files
            </h3>
            <button
              onClick={() => setFiles([])}
              className="text-sm text-destructive hover:underline"
            >
              {t('pdf.clear')}
            </button>
          </div>

          <div className="grid gap-2">
            {files.map((file, index) => (
              <div 
                key={file.id} 
                className="flex items-center justify-between p-3 bg-card border rounded-md group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 flex items-center justify-center bg-muted rounded shrink-0">
                    {file.preview ? (
                      <img src={file.preview} alt="" className="w-full h-full object-cover rounded" />
                    ) : (
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <span className="truncate text-sm font-medium">
                    {file.file.name}
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    ({(file.file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>

                <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => moveFile(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 hover:bg-accent rounded disabled:opacity-30"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveFile(index, 'down')}
                    disabled={index === files.length - 1}
                    className="p-1.5 hover:bg-accent rounded disabled:opacity-30"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1.5 hover:bg-destructive/10 text-destructive rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={activeTool === 'merge' ? handleMerge : handleImg2Pdf}
              disabled={isProcessing}
              className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                t('common.processing')
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  {activeTool === 'merge' ? t('pdf.downloadMerged') : t('pdf.downloadPdf')}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

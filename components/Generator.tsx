import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Age, FileWithPreview, Gender, AspectRatio } from '../types';
import { GENDER_OPTIONS, AGE_OPTIONS, MAX_PRODUCT_SIZE_BYTES, MAX_LOGO_SIZE_BYTES, ACCEPTED_IMAGE_TYPES, ASPECT_RATIO_OPTIONS } from '../constants';
import { generateEditorialImages } from '../services/geminiService';
import ResultsDisplay from './ResultsDisplay';
import Spinner from './ui/Spinner';
import Toast from './ui/Toast';
import { UploadIcon, DownloadIcon } from './Icons';

// Sub-component for file input
const FileInput: React.FC<{
  id: string;
  label: string;
  description: string;
  file: FileWithPreview | null;
  onFileChange: (file: File | null) => void;
  error?: string;
}> = ({ id, label, description, file, onFileChange, error }) => {
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => e.preventDefault();
  
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <label
          htmlFor={id}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`relative flex justify-center items-center px-6 pt-5 pb-6 border-2 ${error ? 'border-red-400' : 'border-gray-300'} border-dashed rounded-md cursor-pointer hover:border-primary-400 transition-colors duration-200`}
        >
          {file ? (
            <div>
              <img src={file.preview} alt="Preview" className="mx-auto max-h-32 rounded-md" />
              <p className="text-center text-xs text-gray-500 mt-2">{file.name}</p>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <span className="relative font-medium text-primary hover:text-primary-600">
                  <span>Upload file</span>
                  <input id={id} name={id} type="file" className="sr-only" onChange={(e) => onFileChange(e.target.files?.[0] || null)} accept={ACCEPTED_IMAGE_TYPES.join(',')} />
                </span>
                <p className="pl-1">atau drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          )}
        </label>
        {file && (
          <button onClick={() => onFileChange(null)} className="mt-2 text-xs text-red-600 hover:text-red-800">
            Hapus
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

declare global {
    interface Window {
        JSZip: any;
    }
}

const Generator: React.FC = () => {
  const [productImage, setProductImage] = useState<FileWithPreview | null>(null);
  const [logoImage, setLogoImage] = useState<FileWithPreview | null>(null);
  const [gender, setGender] = useState<Gender>(Gender.Female);
  const [age, setAge] = useState<Age>(Age.YoungAdults);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Portrait);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileErrors, setFileErrors] = useState<{ product?: string; logo?: string }>({});

  const validateFile = (file: File | null, maxSize: number, type: 'product' | 'logo') => {
    if (!file) {
      setFileErrors(prev => ({ ...prev, [type]: `${type === 'product' ? 'Foto produk' : 'Logo'} wajib diunggah.` }));
      return false;
    }
    if (file.size > maxSize) {
      setFileErrors(prev => ({ ...prev, [type]: `Ukuran file maksimal ${maxSize / 1024 / 1024}MB.` }));
      return false;
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setFileErrors(prev => ({ ...prev, [type]: `Format file harus JPG atau PNG.` }));
      return false;
    }
    setFileErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[type];
        return newErrors;
    });
    return true;
  };

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<FileWithPreview | null>>, maxSize: number, type: 'product' | 'logo') => (file: File | null) => {
    if (file) {
      if (validateFile(file, maxSize, type)) {
        setter(Object.assign(file, { preview: URL.createObjectURL(file) }));
      } else {
        setter(null);
      }
    } else {
      setter(null);
      setFileErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[type];
        return newErrors;
    });
    }
  };
  
  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (productImage) URL.revokeObjectURL(productImage.preview);
      if (logoImage) URL.revokeObjectURL(logoImage.preview);
    };
  }, [productImage, logoImage]);


  const isFormValid = useMemo(() => {
    return productImage && logoImage && Object.keys(fileErrors).length === 0;
  }, [productImage, logoImage, fileErrors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !productImage || !logoImage) {
      validateFile(productImage, MAX_PRODUCT_SIZE_BYTES, 'product');
      validateFile(logoImage, MAX_LOGO_SIZE_BYTES, 'logo');
      return;
    };

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateEditorialImages(productImage, logoImage, gender, age, aspectRatio);
      setGeneratedImages(images);
    } catch (err: any) {
      setError(err.message || 'Gagal menghasilkan gambar. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }, [productImage, logoImage, gender, age, aspectRatio, isFormValid]);

  const handleDownloadAll = async () => {
    if (!window.JSZip) {
      alert('Could not download all files. JSZip library not found.');
      return;
    }
    setIsDownloading(true);
    const zip = new window.JSZip();
    generatedImages.forEach((src, index) => {
      const base64Data = src.split(',')[1];
      zip.file(`fashion_editorial_${index + 1}.png`, base64Data, { base64: true });
    });
    
    try {
        const content = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'fashion_product_studio_images.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("Error creating zip file", error);
        alert("Failed to create zip file.");
    } finally {
        setIsDownloading(false);
    }
  };
  
  return (
    <div id="generator" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">1. Upload Aset Anda</h2>
                <p className="mt-2 text-gray-600">Unggah foto produk dan logo brand Anda untuk memulai.</p>
                <div className="mt-6 space-y-6">
                    <FileInput
                        id="product-image"
                        label="Foto Produk"
                        description="JPG/PNG, maks 10MB"
                        file={productImage}
                        onFileChange={handleFileChange(setProductImage, MAX_PRODUCT_SIZE_BYTES, 'product')}
                        error={fileErrors.product}
                    />
                    <FileInput
                        id="logo-image"
                        label="Logo Brand (Transparan)"
                        description="PNG, maks 5MB"
                        file={logoImage}
                        onFileChange={handleFileChange(setLogoImage, MAX_LOGO_SIZE_BYTES, 'logo')}
                        error={fileErrors.logo}
                    />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">2. Sesuaikan Foto</h2>
                <p className="mt-2 text-gray-600">Pilih model virtual dan rasio aspek gambar.</p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800">Model Virtual</h3>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value as Gender)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                      >
                        {GENDER_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">Usia</label>
                      <select
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value as Age)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                      >
                        {AGE_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                   <h3 className="text-lg font-medium text-gray-800">Rasio Aspek</h3>
                    <fieldset className="mt-2">
                      <legend className="sr-only">Aspect Ratio</legend>
                      <div className="grid grid-cols-3 gap-3">
                        {ASPECT_RATIO_OPTIONS.map((option) => (
                          <div key={option.value}>
                            <input
                              type="radio"
                              name="aspect-ratio"
                              value={option.value}
                              id={`aspect-ratio-${option.value.replace(':', '-')}`}
                              checked={aspectRatio === option.value}
                              onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={`aspect-ratio-${option.value.replace(':', '-')}`}
                              className="block w-full text-center py-3 px-2 border rounded-md cursor-pointer text-sm font-medium transition-colors bg-white text-gray-700 border-gray-300 hover:bg-gray-50 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full flex justify-center items-center bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-primary-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? <><Spinner /> Generating...</> : 'Generate 4 Images'}
              </button>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Hasil Foto Editorial</h2>
                    <p className="mt-2 text-gray-600">AI akan menghasilkan 4 variasi foto profesional untuk Anda.</p>
                </div>
                {!isLoading && generatedImages.length > 0 && (
                    <button 
                        onClick={handleDownloadAll} 
                        disabled={isDownloading}
                        className="flex-shrink-0 flex items-center gap-2 bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isDownloading ? (
                            <>
                                <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                                <span>Zipping...</span>
                            </>
                        ) : (
                            <>
                                <DownloadIcon className="w-5 h-5" />
                                <span>Download All (ZIP)</span>
                            </>
                        )}
                    </button>
                )}
            </div>
            <div className="mt-6">
                <ResultsDisplay images={generatedImages} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
      {error && <Toast message={error} type="error" onDismiss={() => setError(null)} />}
    </div>
  );
};

export default Generator;

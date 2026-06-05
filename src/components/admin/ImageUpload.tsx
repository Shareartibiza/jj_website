'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface ImageUploadProps {
    value?: string;
    onChange?: (url: string) => void;
    placeholder?: string;
    multiple?: boolean;
    onUploadComplete?: (urls: string[]) => void;
}

interface UploadingFile {
    id: string;
    name: string;
    progress: number;
    status: 'uploading' | 'success' | 'error';
    error?: string;
}

export default function ImageUpload({
    value = '',
    onChange,
    placeholder = "Image URL or Upload File",
    multiple = false,
    onUploadComplete
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
    const [dragActive, setDragActive] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Standard single file upload handler
    const uploadSingleFile = async (file: File) => {
        setError('');
        setIsUploading(true);
        setProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/upload', true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progressValue = (event.loaded / event.total) * 100;
                    setProgress(progressValue);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.url) {
                            if (onChange) onChange(response.url);
                        } else {
                            setError('Upload succeeded but no URL was returned.');
                        }
                    } catch (parseErr) {
                        setError('Failed to parse response: ' + xhr.responseText.substring(0, 100));
                    }
                } else {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        setError(response.error || `Upload failed (Status ${xhr.status})`);
                    } catch {
                        setError(`Server returned error code ${xhr.status}: ${xhr.statusText}`);
                    }
                }
                setIsUploading(false);
                setProgress(0);
            };

            xhr.onerror = () => {
                setError('A network error occurred. Please check if your server is reachable.');
                setIsUploading(false);
                setProgress(0);
            };

            xhr.send(formData);
        } catch (err: any) {
            setError(`Unexpected error: ${err.message || err}`);
            setIsUploading(false);
        }
    };

    // Bulk multiple files upload handler
    const uploadMultipleFiles = async (files: FileList) => {
        const newFiles: UploadingFile[] = Array.from(files).map((file, index) => ({
            id: `${Date.now()}-${index}`,
            name: file.name,
            progress: 0,
            status: 'uploading'
        }));

        setUploadingFiles(prev => [...prev, ...newFiles]);

        const uploadPromises = Array.from(files).map((file, index) => {
            const uploadingFileId = newFiles[index].id;
            
            return new Promise<string | null>((resolve) => {
                const formData = new FormData();
                formData.append('file', file);

                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/api/upload', true);

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const progressVal = Math.round((event.loaded / event.total) * 100);
                        setUploadingFiles(prev =>
                            prev.map(f => f.id === uploadingFileId ? { ...f, progress: progressVal } : f)
                        );
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            if (response.url) {
                                setUploadingFiles(prev =>
                                    prev.map(f => f.id === uploadingFileId ? { ...f, status: 'success', progress: 100 } : f)
                                );
                                resolve(response.url);
                                return;
                            }
                        } catch {}
                    }
                    
                    let errorMsg = `Upload failed (${xhr.status})`;
                    try {
                        const response = JSON.parse(xhr.responseText);
                        errorMsg = response.error || errorMsg;
                    } catch {}
                    
                    setUploadingFiles(prev =>
                        prev.map(f => f.id === uploadingFileId ? { ...f, status: 'error', error: errorMsg } : f)
                    );
                    resolve(null);
                };

                xhr.onerror = () => {
                    setUploadingFiles(prev =>
                        prev.map(f => f.id === uploadingFileId ? { ...f, status: 'error', error: 'Network error' } : f)
                    );
                    resolve(null);
                };

                xhr.send(formData);
            });
        });

        const urls = await Promise.all(uploadPromises);
        const validUrls = urls.filter((url): url is string => url !== null);
        
        if (validUrls.length > 0 && onUploadComplete) {
            onUploadComplete(validUrls);
        }

        // Clean up success status after 3 seconds
        setTimeout(() => {
            setUploadingFiles(prev => prev.filter(f => f.status !== 'success'));
        }, 3000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (multiple) {
            uploadMultipleFiles(files);
        } else {
            uploadSingleFile(files[0]);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            if (multiple) {
                uploadMultipleFiles(e.dataTransfer.files);
            } else {
                uploadSingleFile(e.dataTransfer.files[0]);
            }
        }
    };

    if (multiple) {
        return (
            <div className="w-full space-y-4">
                <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                        border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer
                        transition-all duration-200 group min-h-[160px]
                        ${dragActive 
                            ? 'border-pink-500 bg-pink-500/5' 
                            : 'border-white/10 hover:border-pink-500/50 hover:bg-white/[0.02]'}
                    `}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                    />
                    
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                        <UploadCloud size={24} className="text-zinc-400 group-hover:text-pink-500 transition-colors" />
                    </div>
                    <p className="text-sm font-semibold text-white text-center">
                        Drag & drop images here or <span className="text-pink-500 group-hover:underline">browse</span>
                    </p>
                    <p className="text-xs text-zinc-500 mt-1 text-center">
                        Supports JPEG, PNG, WebP, GIF (Max 15MB each, up to 12+ files recommended)
                    </p>
                </div>

                {/* Uploading Files Status List */}
                {uploadingFiles.length > 0 && (
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {uploadingFiles.map((f) => (
                            <div key={f.id} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl text-xs gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate">{f.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-300 ${
                                                    f.status === 'error' ? 'bg-red-500' : 'bg-pink-500'
                                                }`}
                                                style={{ width: `${f.progress}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] text-zinc-400 font-semibold shrink-0 w-8 text-right">
                                            {f.progress}%
                                        </span>
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    {f.status === 'uploading' && <Loader2 size={16} className="text-pink-500 animate-spin" />}
                                    {f.status === 'success' && <CheckCircle size={16} className="text-green-500" />}
                                    {f.status === 'error' && (
                                        <div className="flex items-center gap-1 text-red-500" title={f.error}>
                                            <AlertCircle size={16} />
                                            <span className="text-[10px] max-w-[120px] truncate">{f.error}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="w-full space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    disabled={isUploading}
                    className="flex-1 bg-[#1a1a1a] border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className={`
                        flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                        transition-all border border-white/10 shrink-0
                        ${isUploading ? 'bg-white/5 text-zinc-400 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 text-white'}
                    `}
                >
                    {isUploading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            {Math.round(progress)}%
                        </>
                    ) : (
                        <>
                            <UploadCloud size={16} />
                            Upload
                        </>
                    )}
                </button>
            </div>
            
            {error && (
                <div className="flex items-start gap-2 text-red-500 text-xs mt-1 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
}

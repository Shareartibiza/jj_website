'use client';
 
import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';
 
interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    placeholder?: string;
}
 
export default function ImageUpload({ value, onChange, placeholder = "Image URL or Upload File" }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
 
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
 
        // Reset state
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
                            onChange(response.url);
                        } else {
                            setError('Upload succeeded but no URL was returned.');
                        }
                    } catch (parseErr) {
                        setError('Failed to parse response from server.');
                    }
                } else {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        setError(response.error || 'Failed to upload image.');
                    } catch {
                        setError('Failed to upload image. Server returned code ' + xhr.status);
                    }
                }
                setIsUploading(false);
                setProgress(0);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            };
 
            xhr.onerror = () => {
                setError('A network error occurred during upload.');
                setIsUploading(false);
                setProgress(0);
            };
 
            xhr.send(formData);
        } catch (err) {
            setError('An unexpected error occurred during upload.');
            setIsUploading(false);
            console.error(err);
        }
    };

    return (
        <div className="w-full space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
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
                <p className="text-red-500 text-xs mt-1">{error}</p>
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

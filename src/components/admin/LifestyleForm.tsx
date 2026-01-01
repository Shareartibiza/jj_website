'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Save,
    Plus,
    Image as ImageIcon,
    Trash2,
    Anchor,
    Settings,
    Euro,
    Type,
    X
} from 'lucide-react';

interface LifestyleFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function LifestyleForm({ initialData, isEditing = false }: LifestyleFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Yacht',
        images: [{ url: '', alt: '' }],
        specs: {},
        features: ['']
    });

    const [specEntries, setSpecEntries] = useState<[string, string][]>([['', '']]);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            if (initialData.specs) {
                setSpecEntries(Object.entries(initialData.specs));
            }
        }
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSpecChange = (index: number, key: string, value: string) => {
        const newSpecs = [...specEntries];
        newSpecs[index] = [key, value];
        setSpecEntries(newSpecs);
    };

    const addSpec = () => setSpecEntries([...specEntries, ['', '']]);
    const removeSpec = (index: number) => setSpecEntries(specEntries.filter((_, i) => i !== index));

    const handleImageChange = (index: number, field: string, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = { ...newImages[index], [field]: value };
        setFormData({ ...formData, images: newImages });
    };

    const addImage = () => setFormData({ ...formData, images: [...formData.images, { url: '', alt: '' }] });
    const removeImage = (index: number) => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => setFormData({ ...formData, features: [...formData.features, ''] });
    const removeFeature = (index: number) => setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const specsObj = specEntries.reduce((acc, [key, val]) => {
            if (key.trim()) acc[key.trim()] = val;
            return acc;
        }, {} as Record<string, string>);

        try {
            const url = isEditing ? `/api/listings/${initialData.id}` : '/api/listings';
            const method = isEditing ? 'PUT' : 'POST';

            const payload = {
                ...formData,
                specs: specsObj,
                type: 'lifestyle'
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push('/admin/lifestyle');
                router.refresh();
            } else {
                alert('Failed to save lifestyle item');
            }
        } catch (err) {
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            {/* Basic Info Section */}
            <div className="bg-[#141414] border border-white/5 rounded-3xl p-8 space-y-8">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-500">
                        <Type size={20} />
                    </div>
                    General Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. Sunseeker 131 Yacht"
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all appearance-none cursor-pointer"
                        >
                            <option value="Yacht">Yacht</option>
                            <option value="Jet">Jet</option>
                            <option value="Car">Car</option>
                            <option value="Watch">Watch</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Price</label>
                        <div className="relative group">
                            <Euro className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pink-500 transition-colors" size={18} />
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g. €145,000 / week or On Request"
                                className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        placeholder="Describe the ultimate luxury experience..."
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all resize-none"
                    />
                </div>
            </div>

            {/* Dynamic Specs Section */}
            <div className="bg-[#141414] border border-white/5 rounded-3xl p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                            <Settings size={20} />
                        </div>
                        Technical Specs
                    </h2>
                    <button
                        type="button"
                        onClick={addSpec}
                        className="flex items-center gap-2 text-sm font-bold text-pink-500 hover:text-pink-400 transition-colors"
                    >
                        <Plus size={16} />
                        Add Specification
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {specEntries.map(([key, val], index) => (
                        <div key={index} className="flex flex-col gap-2 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <input
                                type="text"
                                placeholder="Label (e.g. Length)"
                                value={key}
                                onChange={(e) => handleSpecChange(index, e.target.value, val)}
                                className="bg-[#1a1a1a] border border-white/5 rounded-lg py-2 px-3 text-xs text-white"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Value (e.g. 40m)"
                                    value={val}
                                    onChange={(e) => handleSpecChange(index, key, e.target.value)}
                                    className="flex-1 bg-[#1a1a1a] border border-white/5 rounded-lg py-2 px-3 text-sm text-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSpec(index)}
                                    className="text-zinc-600 hover:text-red-500 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visuals and Features (same structure as PropertyForm) */}
            <div className="bg-[#141414] border border-white/5 rounded-3xl p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                            <ImageIcon size={20} />
                        </div>
                        Visual Gallery
                    </h2>
                    <button type="button" onClick={addImage} className="flex items-center gap-2 text-sm font-bold text-pink-500 hover:text-pink-400">
                        <Plus size={16} /> Add Image
                    </button>
                </div>
                <div className="space-y-4">
                    {formData.images.map((img, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex-1 space-y-3">
                                <input type="text" placeholder="URL" value={img.url} onChange={(e) => handleImageChange(index, 'url', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3 px-4 text-white text-sm" />
                                <input type="text" placeholder="Alt" value={img.alt} onChange={(e) => handleImageChange(index, 'alt', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3 px-4 text-white text-sm" />
                            </div>
                            <button type="button" onClick={() => removeImage(index)} className="p-3 bg-red-500/10 text-red-500 rounded-xl"><Trash2 size={20} /></button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-4 pb-12">
                <button type="button" onClick={() => router.back()} className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/5">Cancel</button>
                <button type="submit" disabled={loading} className="px-12 py-4 bg-pink-500 text-white font-bold rounded-2xl shadow-xl shadow-pink-500/20 transition-all active:scale-95">
                    {loading ? 'Saving...' : 'Save Lifestyle Item'}
                </button>
            </div>
        </form>
    );
}

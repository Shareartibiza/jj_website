'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Property } from '@/types';
import {
    Save,
    X,
    Plus,
    Image as ImageIcon,
    Trash2,
    Bed,
    Bath,
    Maximize2,
    MapPin,
    Euro,
    Type
} from 'lucide-react';

interface PropertyFormProps {
    initialData?: Partial<Property>;
    isEditing?: boolean;
}

export default function PropertyForm({ initialData, isEditing = false }: PropertyFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Property>({
        id: initialData?.id || '',
        title: initialData?.title || '',
        location: initialData?.location || '',
        price: initialData?.price || '',
        category: initialData?.category || 'Villas',
        description: initialData?.description || '',
        images: initialData?.images || [{ url: '', alt: '' }],
        specs: initialData?.specs || {
            bedrooms: 0,
            bathrooms: 0,
            buildSize: '',
            plotSize: ''
        },
        features: initialData?.features || ['']
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id || '',
                title: initialData.title || '',
                location: initialData.location || '',
                price: initialData.price || '',
                category: initialData.category || 'Villas',
                description: initialData.description || '',
                images: initialData.images || [{ url: '', alt: '' }],
                specs: initialData.specs || { bedrooms: 0, bathrooms: 0, buildSize: '', plotSize: '' },
                features: initialData.features || [''],
            });
        }
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.') as ['specs', keyof Property['specs']];
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (index: number, field: string, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = { ...newImages[index], [field]: value };
        setFormData({ ...formData, images: newImages });
    };

    const addImage = () => {
        setFormData({ ...formData, images: [...formData.images, { url: '', alt: '' }] });
    };

    const removeImage = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] });
    };

    const removeFeature = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditing ? `/api/listings/${initialData?.id}` : '/api/listings';
            const method = isEditing ? 'PUT' : 'POST';

            const payload = isEditing ? formData : { ...formData, type: 'property' };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push('/admin/properties');
                router.refresh();
            } else {
                alert('Failed to save property');
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
                            placeholder="e.g. Villa Es Cubells"
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Location</label>
                        <div className="relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pink-500 transition-colors" size={18} />
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g. Es Cubells, Ibiza"
                                className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                            />
                        </div>
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
                                placeholder="e.g. €12,500,000 or Price on Request"
                                className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all appearance-none cursor-pointer"
                        >
                            <option value="Villas">Villas</option>
                            <option value="Big Projects">Big Projects</option>
                            <option value="Apartments">Apartments</option>
                            <option value="Land">Land</option>
                        </select>
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
                        placeholder="Describe the unique features and lifestyle of this property..."
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all resize-none"
                    />
                </div>
            </div>

            {/* Specifications Section */}
            <div className="bg-[#141414] border border-white/5 rounded-3xl p-8 space-y-8">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                        <Maximize2 size={20} />
                    </div>
                    Technical Specifications
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Bedrooms</label>
                        <div className="relative group">
                            <Bed className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pink-500 transition-colors" size={18} />
                            <input
                                type="number"
                                name="specs.bedrooms"
                                value={formData.specs.bedrooms}
                                onChange={handleInputChange}
                                className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Bathrooms</label>
                        <div className="relative group">
                            <Bath className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pink-500 transition-colors" size={18} />
                            <input
                                type="number"
                                name="specs.bathrooms"
                                value={formData.specs.bathrooms}
                                onChange={handleInputChange}
                                className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Build Size</label>
                        <input
                            type="text"
                            name="specs.buildSize"
                            value={formData.specs.buildSize}
                            onChange={handleInputChange}
                            placeholder="e.g. 500 sq m"
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Plot Size</label>
                        <input
                            type="text"
                            name="specs.plotSize"
                            value={formData.specs.plotSize}
                            onChange={handleInputChange}
                            placeholder="e.g. 2,000 sq m"
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Images Section */}
            <div className="bg-[#141414] border border-white/5 rounded-3xl p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                            <ImageIcon size={20} />
                        </div>
                        Visual Gallery
                    </h2>
                    <button
                        type="button"
                        onClick={addImage}
                        className="flex items-center gap-2 text-sm font-bold text-pink-500 hover:text-pink-400 transition-colors"
                    >
                        <Plus size={16} />
                        Add Image
                    </button>
                </div>

                <div className="space-y-4">
                    {formData.images.map((img, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group relative">
                            <div className="flex-1 space-y-4">
                                <input
                                    type="text"
                                    placeholder="Image URL (e.g. /assets/villa.jpg)"
                                    value={img.url}
                                    onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                                />
                                <input
                                    type="text"
                                    placeholder="Alt text (e.g. Pool area view)"
                                    value={img.alt}
                                    onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                                />
                            </div>
                            {formData.images.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                >
                                    <Trash2 size={20} />
                                </button>
                            )}
                            {img.url && (
                                <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden border border-white/10 hidden md:block">
                                    <img src={img.url} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=Invalid+URL' }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-[#141414] border border-white/5 rounded-3xl p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                            <Plus size={20} className="text-green-500" />
                        </div>
                        Premium Features
                    </h2>
                    <button
                        type="button"
                        onClick={addFeature}
                        className="flex items-center gap-2 text-sm font-bold text-pink-500 hover:text-pink-400 transition-colors"
                    >
                        <Plus size={16} />
                        Add Feature
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2 group">
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                placeholder="e.g. Infinity pool with saline system"
                                className="flex-1 bg-[#1a1a1a] border border-white/5 rounded-xl py-3 px-4 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="p-3 text-zinc-600 hover:text-red-500 transition-colors"
                                title="Remove feature"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pb-12">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/5"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={`
            flex items-center gap-3 px-12 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl 
            shadow-xl shadow-pink-500/20 transition-all transform active:scale-95
            ${loading ? 'opacity-70 cursor-not-allowed' : ''}
          `}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <Save size={20} />
                            <span>{isEditing ? 'Save Changes' : 'Create Listing'}</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

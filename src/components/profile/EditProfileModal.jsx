import React, { useState, useEffect } from 'react';
import { X, Camera, Trash2 } from 'lucide-react';
import ConfirmationModal from '../common/ConfirmationModal';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role_id: '',
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [isImageRemoved, setIsImageRemoved] = useState(false);
    const [validationError, setValidationError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                password: '',
                role_id: user.role_id || '',
            });
            setImagePreview(user.profile_image || `https://i.pravatar.cc/150?u=${user.id}`);
            setIsImageRemoved(false);
            setValidationError(null);
            setSelectedFile(null);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setValidationError("Image size must be less than 2MB");
                return;
            }
            setValidationError(null);
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
            setIsImageRemoved(false);
        }
    };

    const handleRemoveImage = () => {
        setIsDeleteConfirmOpen(true);
    };

    const confirmRemoveImage = () => {
        setSelectedFile(null);
        setImagePreview(`https://i.pravatar.cc/150?u=${user?.id}`);
        setValidationError(null);
        setIsImageRemoved(true);
        setIsDeleteConfirmOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let dataToSend = formData;

            if (selectedFile) {
                const formDataObj = new FormData();
                Object.keys(formData).forEach(key => {
                    formDataObj.append(key, formData[key]);
                });
                formDataObj.append('profile_image', selectedFile);
                dataToSend = formDataObj;
            }
            else if (isImageRemoved) {
                dataToSend = { ...formData, profile_image: '' };
            }

            await onSave(dataToSend);
            onClose();
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            <div className="relative group cursor-pointer">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700">
                                    <img
                                        src={imagePreview}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <label htmlFor="profile-image-upload" className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-white">
                                    <Camera size={24} />
                                </label>
                                <input
                                    id="profile-image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            {((user?.profile_image && !isImageRemoved) || selectedFile) && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute bottom-0 right-0 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 border-2 border-white dark:border-gray-800 shadow-sm transition-colors z-10"
                                    title="Remove Image"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Click to change profile photo</p>
                        {validationError && (
                            <p className="text-xs text-red-500 mt-1 font-medium">
                                {validationError}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Leave blank to keep current"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role ID</label>
                        <input
                            type="text"
                            name="role_id"
                            value={formData.role_id}
                            readOnly
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed opacity-70"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
            <ConfirmationModal
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={confirmRemoveImage}
                title="Remove Profile Picture"
                message="Are you sure you want to remove your profile picture?"
            />
        </div>
    );
};

export default EditProfileModal;
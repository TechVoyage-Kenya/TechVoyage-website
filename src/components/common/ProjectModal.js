import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ProjectModal = ({ showModal, onClose, onSubmit, project }) => {
    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        description: '',
        liveLink: '', // New state for live link
        category: '', // New state for category
        public:''
    });

    useEffect(() => {
        if (project) {
            setFormData({
                id:project.id || '',
                title: project.title || '',
                imageUrl: project.imageUrl || '',
                description: project.description || '',
                liveLink: project.liveLink || '', // Initialize liveLink if project exists
                category: project.category || '', // Initialize category if project exists
                public: project.public || '', 
            });
        } else {
            setFormData({ title: '', imageUrl: '', description: '', liveLink: '', category: '',public:'' }); // Reset all fields
        }
    }, [project]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!showModal) return null;

    return (
        <motion.div
            className="fixed inset-0 text-black flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50"></div>
                <motion.div className="bg-gradient-to-r from-[#2A7B7D] to-[#7AC6E8] shadow-lg rounded-lg p-6 w-full max-w-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                >
                    <h2 className="text-2xl font-semibold mb-4 text-text">{project ? 'Edit Project' : 'Add New Project'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-text text-sm font-bold mb-2">Name</label>
                            <input
                                name="title"
                                value={formData.title}
                                className="w-full px-3 py-2 border rounded text-black/50"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-text text-sm font-bold mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                className="w-full px-3 py-2 border rounded text-black/50"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-text text-sm font-bold mb-2">Image URL</label>
                            <input
                                name="imageUrl"
                                value={formData.imageUrl}
                                className="w-full px-3 py-2 border rounded text-black/50"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-text text-sm font-bold mb-2">Live Link</label>
                            <input
                                name="liveLink"
                                value={formData.liveLink}
                                className="w-full px-3 py-2 border rounded text-black/50"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-text text-sm font-bold mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                className="w-full px-3 py-2 border rounded text-black/50"
                                required
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="Web Design">Web Design</option>
                                <option value="Website Development">Website Development</option>
                                <option value="Content Management">Content Management</option>
                            </select>
                           
                        </div>
                        <div className="mb-4">
                        <label className="block text-text text-sm font-bold mb-2">Visibility</label>
                        <select
                                name="public"
                                value={formData.public}
                                className="w-full px-3 py-2 border rounded text-black/50"
                                required
                                onChange={handleChange}
                            >
                                <option value="" disabled>Make public</option>
                                <option value="false">False</option>
                                <option value="true">True</option>
                               
                            </select>
                            </div>
                        <div className="text-right">
                            <button type="button" onClick={onClose} className="bg-accent2 text-white px-4 py-2 rounded hover:bg-hover transition duration-300 mr-2">Cancel</button>
                            <button type="submit" className="bg-accent1 text-white px-4 py-2 rounded hover:bg-hover transition duration-300">
                                {project ? 'Save Changes' : 'Add Project'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProjectModal;

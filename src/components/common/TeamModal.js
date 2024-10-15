import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TeamModal = ({ isOpen, onClose, onSubmit, member }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    role: '',
    description: '',
    expertise: '',
    tools: '',
    image_url: '',
    linkedin: '',
    twitter: '',
    github: '',
  });

  useEffect(() => {
    if (member) {
      setFormData({
        id:member.id || '',
        full_name: member.full_name || '',
        role: member.role || '',
        description: member.description || '',
        expertise: member.expertise || '',
        tools: member.tools || '',
        image_url: member.image_url || '',
        linkedin: member.linkedin || '',
        twitter: member.twitter || '',
        github: member.github || '',
      });
    } else {
      setFormData({
        full_name: '',
        role: '',
        description: '',
        expertise: '',
        tools: '',
        image_url: '',
        linkedin: '',
        twitter: '',
        github: '',
      });
    }
  }, [member]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 text-black flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50"></div>
        <motion.div className="bg-white p-8 rounded-lg shadow-lg relative z-10 w-11/12 max-w-3xl bg-gradient-to-r from-[#2A7B7D] to-[#7AC6E8]" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
          <h2 className="text-2xl font-semibold mb-4 text-text">{member ? 'Edit Member' : 'Add New Member'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-text text-sm font-bold mb-2">Name</label>
              <input name="full_name" value={formData.full_name} className="w-full px-3 py-2 border rounded text-black/50" required onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-text text-sm font-bold mb-2">Role</label>
              <input name="role" value={formData.role} className="w-full px-3 py-2 border rounded text-black/50" required onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-text text-sm font-bold mb-2">Description</label>
              <textarea name="description" value={formData.description} className="w-full px-3 py-2 border rounded text-black/50" required onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-text text-sm font-bold mb-2">Expertise</label>
              <input name="expertise" value={formData.expertise} className="w-full px-3 py-2 border rounded text-black/50" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-text text-sm font-bold mb-2">Tools</label>
              <input name="tools" value={formData.tools} className="w-full px-3 py-2 border rounded text-black/50" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-text text-sm font-bold mb-2">Image URL</label>
              <input name="image_url" value={formData.image_url} className="w-full px-3 py-2 border rounded text-black/50" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-text text-sm font-bold mb-2">LinkedIn</label>
              <input name="linkedin" value={formData.linkedin} className="w-full px-3 py-2 border rounded text-black/50" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-text text-sm font-bold mb-2">Twitter</label>
              <input name="twitter" value={formData.twitter} className="w-full px-3 py-2 border rounded text-black/50" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-text text-sm font-bold mb-2">GitHub</label>
              <input name="github" value={formData.github} className="w-full px-3 py-2 border rounded text-black/50" onChange={handleChange} />
            </div>
            <div className="text-right md:col-span-2">
              <button type="button" onClick={onClose}  className="bg-accent2 text-white px-4 py-2 rounded hover:bg-hover transition duration-300 mr-2 md:mb-0 mb-2"
                  >Cancel</button>
              <button type="submit" className="bg-accent1 text-white px-4 py-2 rounded hover:bg-hover transition duration-300">{member ? 'Save Changes' : 'Add Member'}</button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamModal;

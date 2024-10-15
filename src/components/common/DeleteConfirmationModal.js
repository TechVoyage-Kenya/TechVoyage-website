import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiTrash } from "react-icons/fi";
import { useState } from "react";

const ConfirmModal = ({Confirmed}) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleCancel(){
 
  
    setIsOpen(false)
   
 
  }

  function handleConfirm(){
   
    setIsOpen(false)
    Confirmed()
   
  }
  return (
    <div className="px-2 py-2 bg-gray-200/30 grid place-content-center">
      <button
        onClick={() => setIsOpen(true)}
        className="text-red-500 hover:text-red-700 "
      >
        <FiTrash size={24}/>
      </button>
      <SpringModal isOpen={isOpen} handleCancel={handleCancel} handleConfirm={handleConfirm} />
    </div>
  );
};

const SpringModal = ({ isOpen, handleCancel,handleConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => handleCancel}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-accent1 to-accent2 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
              Confirm Deletion
              </h3>
              <p className="text-center mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  No, go back
                </button>
                <button
                  onClick={handleConfirm}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Understood!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
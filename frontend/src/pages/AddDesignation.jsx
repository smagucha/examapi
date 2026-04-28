import React, { useState, UseContext } from 'react';
import api from "../components/api"
import { useNavigate } from 'react-router-dom';
import styles from '../css/AddDesignation.module.css';
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

function AddDesignation() {
    const [newDesignation, setNewDesignation] = useState({ title: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!newDesignation.title.trim()) {
            setError('Designation title is required');
            return;
        }
        
        setIsLoading(true);
        setError('');
        
        try {
            await api.post(
                "/teacher/add_designation/", 
                newDesignation
            );
            alert("Designation created successfully!");
            navigate('/designations/');
        } catch (err) {
            console.error("Error creating designation:", err.response?.data);
            setError(err.response?.data?.message || 'Failed to create designation. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/designations/');
    };

    return (
        <div className={styles.container}>
        <Navbar 
            user={auth.user}
            onLogout={() => {
            localStorage.clear();
            window.location.href = "/login";
            }} 
        />
            <div className={styles.card}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Add New Designation</h2>
                    <p className={styles.subtitle}>Create a new job title or role</p>
                </div>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.label}>
                            Designation Title <span className={styles.required}>*</span>
                        </label>
                        <input 
                            id="title"
                            type="text" 
                            placeholder="e.g., Senior Software Engineer, Project Manager" 
                            value={newDesignation.title}
                            onChange={(e) => {
                                setNewDesignation({ ...newDesignation, title: e.target.value });
                                if (error) setError('');
                            }} 
                            className={styles.input}
                            required 
                        />
                        {error && <div className={styles.errorMessage}>{error}</div>}
                    </div>
                    
                    <div className={styles.buttonGroup}>
                        <button 
                            type="button" 
                            onClick={handleCancel}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className={styles.submitButton}
                        >
                            {isLoading ? (
                                <span className={styles.loadingSpinner}>
                                    <span className={styles.spinner}></span>
                                    Creating...
                                </span>
                            ) : (
                                'Create Designation'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddDesignation;

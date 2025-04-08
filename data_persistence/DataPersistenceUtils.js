// Data Persistence Utilities for Trump Tariff Analysis Website
// This module provides functionality to ensure data is not lost when hitting conversation length limits

import { useState, useEffect } from 'react';

/**
 * Custom hook for persistent state that automatically saves to localStorage
 * @param {string} key - The key to store the data under in localStorage
 * @param {any} initialValue - The initial value if no value exists in storage
 * @returns {Array} - [storedValue, setValue] similar to useState
 */
export const usePersistentState = (key, initialValue) => {
  // Create state based on value in localStorage or initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error retrieving persistent state for key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      // Save state to localStorage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving persistent state for key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

/**
 * Utility class for managing data persistence
 */
export class DataPersistenceManager {
  /**
   * Save data to localStorage with automatic chunking for large datasets
   * @param {string} key - Base key for storing the data
   * @param {any} data - Data to store (will be JSON stringified)
   * @returns {boolean} - Success status
   */
  static saveData(key, data) {
    try {
      const serializedData = JSON.stringify(data);
      
      // If data is small enough, store directly
      if (serializedData.length < 5000000) { // ~5MB limit for most browsers
        localStorage.setItem(key, serializedData);
        return true;
      }
      
      // For large data, split into chunks
      const chunks = this.chunkString(serializedData, 4000000); // ~4MB chunks
      
      // Store chunk count
      localStorage.setItem(`${key}_chunks`, chunks.length.toString());
      
      // Store each chunk with indexed key
      chunks.forEach((chunk, index) => {
        localStorage.setItem(`${key}_chunk_${index}`, chunk);
      });
      
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }
  
  /**
   * Load data from localStorage, handling chunked data if necessary
   * @param {string} key - Base key for retrieving the data
   * @returns {any} - The retrieved data, or null if not found
   */
  static loadData(key) {
    try {
      // Check if data is chunked
      const chunkCount = localStorage.getItem(`${key}_chunks`);
      
      if (!chunkCount) {
        // Regular non-chunked data
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      }
      
      // Reassemble chunked data
      let fullData = '';
      for (let i = 0; i < parseInt(chunkCount); i++) {
        const chunk = localStorage.getItem(`${key}_chunk_${i}`);
        if (chunk) {
          fullData += chunk;
        } else {
          throw new Error(`Missing chunk ${i} for key ${key}`);
        }
      }
      
      return JSON.parse(fullData);
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  }
  
  /**
   * Clear all data for a specific key, including any chunks
   * @param {string} key - Base key to clear
   */
  static clearData(key) {
    try {
      // Check if data is chunked
      const chunkCount = localStorage.getItem(`${key}_chunks`);
      
      if (chunkCount) {
        // Clear all chunks
        for (let i = 0; i < parseInt(chunkCount); i++) {
          localStorage.removeItem(`${key}_chunk_${i}`);
        }
        localStorage.removeItem(`${key}_chunks`);
      }
      
      // Clear main key
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }
  
  /**
   * Export all persisted data to a downloadable JSON file
   * @returns {boolean} - Success status
   */
  static exportAllData() {
    try {
      const exportData = {};
      
      // Collect all localStorage items
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        // Skip chunk metadata and chunks (they'll be reconstructed)
        if (key.endsWith('_chunks') || key.includes('_chunk_')) {
          continue;
        }
        
        // Get the data (handling chunked data if necessary)
        exportData[key] = this.loadData(key);
      }
      
      // Create downloadable file
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `trump_tariff_data_${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      return true;
    } catch (error) {
      console.error('Error exporting data:', error);
      return false;
    }
  }
  
  /**
   * Import data from a JSON file
   * @param {File} file - JSON file to import
   * @returns {Promise<boolean>} - Success status
   */
  static importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          
          // Store each key-value pair
          Object.entries(importedData).forEach(([key, value]) => {
            this.saveData(key, value);
          });
          
          resolve(true);
        } catch (error) {
          console.error('Error parsing imported data:', error);
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        reject(error);
      };
      
      reader.readAsText(file);
    });
  }
  
  /**
   * Set up automatic periodic backup of all data
   * @param {number} intervalMinutes - Backup interval in minutes
   * @returns {number} - Interval ID for clearing if needed
   */
  static setupAutomaticBackup(intervalMinutes = 5) {
    // Create a timestamp for this backup session
    const backupSessionId = Date.now();
    
    // Store the backup session ID
    localStorage.setItem('backup_session_id', backupSessionId.toString());
    
    // Set up periodic backup
    const intervalId = setInterval(() => {
      // Check if we're still in the same session
      const currentSessionId = localStorage.getItem('backup_session_id');
      if (currentSessionId !== backupSessionId.toString()) {
        // Another session has taken over, clear this interval
        clearInterval(intervalId);
        return;
      }
      
      // Perform backup
      this.saveData('automatic_backup', {
        timestamp: new Date().toISOString(),
        data: this.getAllData()
      });
      
      console.log(`Automatic backup completed at ${new Date().toLocaleTimeString()}`);
    }, intervalMinutes * 60 * 1000);
    
    return intervalId;
  }
  
  /**
   * Get all persisted data (excluding backup metadata)
   * @returns {Object} - All persisted data
   */
  static getAllData() {
    const allData = {};
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      // Skip backup metadata and chunks
      if (key === 'backup_session_id' || key.endsWith('_chunks') || key.includes('_chunk_')) {
        continue;
      }
      
      // Get the data
      allData[key] = this.loadData(key);
    }
    
    return allData;
  }
  
  /**
   * Restore data from the latest automatic backup
   * @returns {boolean} - Success status
   */
  static restoreFromBackup() {
    try {
      const backup = this.loadData('automatic_backup');
      
      if (!backup || !backup.data) {
        console.error('No valid backup found');
        return false;
      }
      
      // Restore each key-value pair
      Object.entries(backup.data).forEach(([key, value]) => {
        // Skip restoring the backup itself to avoid recursion
        if (key !== 'automatic_backup') {
          this.saveData(key, value);
        }
      });
      
      console.log(`Restored from backup created at ${new Date(backup.timestamp).toLocaleString()}`);
      return true;
    } catch (error) {
      console.error('Error restoring from backup:', error);
      return false;
    }
  }
  
  /**
   * Split a string into chunks of specified size
   * @param {string} str - String to split
   * @param {number} size - Maximum chunk size
   * @returns {Array<string>} - Array of chunks
   */
  static chunkString(str, size) {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);
    
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size);
    }
    
    return chunks;
  }
}

/**
 * Component for data persistence controls
 */
export const DataPersistenceControls = () => {
  const handleExport = () => {
    DataPersistenceManager.exportAllData();
  };
  
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      DataPersistenceManager.importData(file)
        .then(() => {
          alert('Data imported successfully');
          window.location.reload(); // Reload to reflect imported data
        })
        .catch((error) => {
          alert(`Error importing data: ${error.message}`);
        });
    }
  };
  
  const handleBackup = () => {
    DataPersistenceManager.saveData('manual_backup', {
      timestamp: new Date().toISOString(),
      data: DataPersistenceManager.getAllData()
    });
    alert('Manual backup created successfully');
  };
  
  const handleRestore = () => {
    if (confirm('Are you sure you want to restore from the latest backup? This will overwrite current data.')) {
      const success = DataPersistenceManager.restoreFromBackup();
      if (success) {
        alert('Data restored successfully');
        window.location.reload(); // Reload to reflect restored data
      } else {
        alert('Failed to restore data. No valid backup found.');
      }
    }
  };
  
  return (
    <div className="data-persistence-controls">
      <h3>Data Persistence Controls</h3>
      <div className="controls-grid">
        <button onClick={handleExport} className="export-btn">
          Export All Data
        </button>
        
        <div className="import-container">
          <label htmlFor="import-file" className="import-label">
            Import Data
          </label>
          <input
            type="file"
            id="import-file"
            accept=".json"
            onChange={handleImport}
            className="import-input"
          />
        </div>
        
        <button onClick={handleBackup} className="backup-btn">
          Create Manual Backup
        </button>
        
        <button onClick={handleRestore} className="restore-btn">
          Restore From Backup
        </button>
      </div>
      
      <div className="persistence-status">
        <p>
          <strong>Automatic Backup:</strong> Enabled (every 5 minutes)
        </p>
        <p>
          <strong>Last Backup:</strong>{' '}
          {(() => {
            try {
              const backup = DataPersistenceManager.loadData('automatic_backup');
              return backup && backup.timestamp
                ? new Date(backup.timestamp).toLocaleString()
                : 'Never';
            } catch (e) {
              return 'Error retrieving backup info';
            }
          })()}
        </p>
      </div>
    </div>
  );
};

// Initialize automatic backup when the module is imported
if (typeof window !== 'undefined') {
  // Only run in browser environment
  setTimeout(() => {
    DataPersistenceManager.setupAutomaticBackup(5); // 5-minute interval
    console.log('Automatic data backup initialized');
  }, 1000); // Slight delay to ensure the app is fully loaded
}

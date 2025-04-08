# Data Persistence Documentation

## Overview

The Trump Tariff Analysis website includes comprehensive data persistence mechanisms to ensure your analysis data is never lost, even when hitting conversation length limits or experiencing browser crashes. This document explains how to use these features to safeguard your valuable trading analysis.

## Automatic Data Persistence

### How It Works

All your data is automatically saved to your browser's local storage as you interact with the website. This includes:

- Dashboard configurations
- Trading opportunity watchlists
- Custom alerts and notifications
- Technical analysis settings
- Portfolio allocations
- User preferences

The system uses a sophisticated chunking mechanism to handle large datasets that exceed browser storage limits, ensuring even complex analyses are preserved.

### Automatic Backups

The system creates automatic backups every 5 minutes while you're using the application. These backups capture the complete state of your analysis and can be restored if needed.

## Manual Data Management

### Exporting Data

To create a complete backup of all your data:

1. Navigate to the **Settings** page
2. In the **Data Management** section, click **Export All Data**
3. A JSON file containing all your analysis data will be downloaded to your device
4. Store this file securely for future restoration if needed

### Importing Data

To restore previously exported data:

1. Navigate to the **Settings** page
2. In the **Data Management** section, click **Import Data**
3. Select the previously exported JSON file
4. Confirm the import when prompted
5. The application will reload with all your restored data

### Manual Backups

In addition to automatic backups, you can create manual backups before making significant changes:

1. Navigate to the **Settings** page
2. In the **Data Management** section, click **Create Manual Backup**
3. A confirmation message will appear when the backup is complete

### Restoring From Backups

To restore from the most recent backup:

1. Navigate to the **Settings** page
2. In the **Data Management** section, click **Restore From Backup**
3. Confirm the restoration when prompted
4. The application will reload with the restored data

## Preventing Data Loss During Long Sessions

### Session Continuity

For extended analysis sessions that might exceed conversation length limits:

1. Periodically export your data using the **Export All Data** function
2. If you encounter a session limit, simply reload the application
3. Your data will be automatically loaded from local storage
4. For added security, you can import your previously exported data file

### Cross-Device Synchronization

To continue your analysis across different devices:

1. Export your data from the first device
2. Transfer the exported JSON file to the second device
3. Import the data on the second device
4. Continue your analysis seamlessly

## Troubleshooting

### Storage Limitations

Browser local storage typically has a 5-10MB limit. The application handles this by:

- Automatically chunking large datasets
- Compressing data where possible
- Prioritizing critical analysis data

If you receive storage limit warnings:

1. Export your current data immediately
2. Clear unnecessary data through the **Data Management** section
3. Import your essential data back

### Recovery After Crashes

If your browser crashes unexpectedly:

1. Reopen the application
2. Your data should be automatically restored from local storage
3. If data appears incomplete, use the **Restore From Backup** function
4. If backups are unavailable, import your most recently exported data file

## Best Practices

1. **Regular Exports**: Export your data at the end of each analysis session
2. **Multiple Backups**: Maintain multiple exported files from different points in time
3. **Cloud Storage**: Store exported files in cloud storage for additional security
4. **Test Restoration**: Periodically test the import function to ensure your backups are valid
5. **Clear Old Data**: Remove outdated analysis data to prevent storage limitations

## Technical Details

The data persistence system uses a combination of:

- Browser localStorage for primary data storage
- JSON serialization for data structure preservation
- Chunking algorithms for handling large datasets
- Timestamp-based versioning for backups
- Atomic write operations to prevent corruption

For developers extending the platform, the `DataPersistenceManager` class and `usePersistentState` hook provide APIs for integrating with the persistence system.

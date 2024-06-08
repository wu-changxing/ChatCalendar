import { useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import useAuthStore from '../../../authStore';

const ImportHealthDataButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  const handleImportHealthData = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      // Step 1: Send previous JSON data to Gemini API
      const response = await fetch('/api/import-health-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify("Generate Health Data for a Fake User for 7 days"),
      });

      if (!response.ok) {
        throw new Error('Failed to generate health data from Gemini API');
      }

      const generatedData = await response.json();

      // Step 2: Store the generated health data in Firebase
      const db = getFirestore();
      const userHealthDataRef = doc(db, 'users', user.uid, 'healthData');
      await setDoc(userHealthDataRef, {
        data: generatedData,
        // Add any additional metadata or timestamps
      });

      console.log('Health data imported successfully');
    } catch (error) {
      console.error('Error importing health data:', error);
    }

    setIsLoading(false);
  };

  return (
    <button onClick={handleImportHealthData} disabled={isLoading}>
      {isLoading ? 'Importing...' : 'Import Health Data'}
    </button>
  );
};

export default ImportHealthDataButton;
// UpdateSubmissionButton.jsx

import React, { useState } from 'react';
import axios from 'axios';

const UpdateSubmissionButton = ({ courseId, courseWorkId, studentId }) => {
    const [response, setResponse] = useState(null);

    const handleUpdateSubmission = async () => {
        try {
            // Assuming you have the `code` needed for authorization
            const code = 'your-auth-code'; // Replace with the actual auth code

            // Make a request to your Strapi API to update the submission
            const response = await axios.patch(
                `http://localhost:3000/google-classroom/${courseId}/${courseWorkId}/${studentId}?code=${code}`,
                {
                    draftGrade: 90,
                    assignedGrade: 95,
                    // ... other fields
                }
            );

            // Handle the response
            setResponse(response.data);
        } catch (error) {
            console.error('Error updating submission:', error);
        }
    };

    return (
        <div>
            <button onClick={handleUpdateSubmission}>Update Submission</button>

            {response && (
                <div>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default UpdateSubmissionButton;


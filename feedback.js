// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuPvu6ukKh9laZgqIMPdwuWUV56zoSD2E",
    authDomain: "chat-function-e2d2a.firebaseapp.com",
    projectId: "chat-function-e2d2a",
    storageBucket: "chat-function-e2d2a.appspot.com",
    messagingSenderId: "669713810079",
    appId: "1:669713810079:web:92893089b4bae6cc3098aa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Handle form submission
const feedbackForm = document.getElementById('feedbackForm');
feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const category = document.getElementById('feedbackCategory').value;
    const message = document.getElementById('feedbackMessage').value;

    console.log("Submitting feedback:", { category, message });

    try {
        await db.collection('feedback').add({
            category,
            message,
            status: 'Unresolved',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert('Feedback submitted successfully!');
        feedbackForm.reset();
    } catch (error) {
        console.error("Error submitting feedback:", error);
        alert('Failed to submit feedback. Please check the console for more details.');
    }
});

// Fetch and display assigned feedback
const assignedFeedbackDiv = document.getElementById('assignedFeedback');
db.collection('feedback').onSnapshot((snapshot) => {
    assignedFeedbackDiv.innerHTML = ''; // Clear previous entries
    snapshot.forEach((doc) => {
        const feedback = doc.data();
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');
        feedbackItem.innerHTML = `
            <p><strong>Category:</strong> ${feedback.category}</p>
            <p><strong>Message:</strong> ${feedback.message}</p>
            <p><strong>Status:</strong> ${feedback.status}</p>
        `;
        assignedFeedbackDiv.appendChild(feedbackItem);
    });
});

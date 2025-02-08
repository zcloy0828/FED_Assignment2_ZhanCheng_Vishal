// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, doc, setDoc, getDoc, getDocs, onSnapshot, addDoc, query, orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuPvu6ukKh9laZgqIMPdwuWUV56zoSD2E",
    authDomain: "chat-function-e2d2a.firebaseapp.com",
    projectId: "chat-function-e2d2a",
    storageBucket: "chat-function-e2d2a.firebasestorage.app",
    messagingSenderId: "669713810079",
    appId: "1:669713810079:web:92893089b4bae6cc3098aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Predefined bot responses
const botResponses = {
    "TechBot": [
        "Hello! Need help with a tech issue?",
        "Our latest gadgets are now available!",
        "I can assist with troubleshooting. What's your issue?"
    ],
    "DealBot": [
        "Looking for the best deals? I'm here to help!",
        "Check out our latest discounts on electronics!",
        "Want a special offer? Just ask!"
    ],
    "SupportBot": [
        "How can I assist you today?",
        "For order issues, please provide your order number.",
        "We are here to help! Let us know your concern."
    ]
};

// Function to get the current user's email
function getCurrentUserEmail() {
    return auth.currentUser ? auth.currentUser.email : null;
}

// Function to initialize bot chats for the user
async function initializeBotChats(userEmail) {
    const bots = ["TechBot", "DealBot", "SupportBot"];
    for (const bot of bots) {
        const chatId = generateChatId(userEmail, bot);
        const chatRef = doc(db, "chats", chatId);
        const chatDoc = await getDoc(chatRef);

        if (!chatDoc.exists()) {
            // Create a new chat with the bot
            await setDoc(chatRef, { 
                users: [userEmail, bot],
                lastMessage: "Hello! I am " + bot + ". How can I assist you?"
            });

            // Add an initial bot message
            const messagesRef = collection(chatRef, "messages");
            await addDoc(messagesRef, {
                sender: bot,
                text: "Hello! I am " + bot + ". How can I assist you?",
                timestamp: Timestamp.now()
            });
        }
    }
}

// Function to fetch and display chats for the user
async function fetchUserChats(userEmail) {
    const chatsList = document.getElementById('chatsList');
    chatsList.innerHTML = '';

    const chatsQuery = query(collection(db, "chats"));
    const querySnapshot = await getDocs(chatsQuery);

    querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        if (chatData.users.includes(userEmail)) {
            const otherUser = chatData.users.find(u => u !== userEmail);
            const chatItem = document.createElement('div');
            chatItem.className = 'chat-item';
            chatItem.innerHTML = `
                <div class="chat-avatar"></div>
                <div class="chat-info">
                    <div class="chat-name">${otherUser}</div>
                    <div class="chat-preview">${chatData.lastMessage || "No messages yet"}</div>
                </div>
            `;
            chatItem.onclick = () => openChat(doc.id, otherUser);
            chatsList.appendChild(chatItem);
        }
    });
}


// Function to open a chat and display messages
async function openChat(chatId, botName) {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = '';

    const chatHeader = document.getElementById('chatHeader');
    const chatInput = document.getElementById('chatInput');
    const emptyState = document.getElementById('emptyState');
    const sellerName = document.getElementById('currentChatName');

    sellerName.innerText = botName;
    chatHeader.classList.remove('hidden');
    chatInput.classList.remove('hidden');
    emptyState.classList.add('hidden');
    messagesContainer.classList.remove('hidden');

    const messagesRef = collection(db, "chats", chatId, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp"));

    onSnapshot(messagesQuery, (snapshot) => {
        messagesContainer.innerHTML = '';
        snapshot.forEach(doc => {
            const msg = doc.data();
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender === getCurrentUserEmail() ? 'sent' : 'received'}`;
            messageDiv.innerHTML = `
                <div class="message-time">${msg.timestamp.toDate().toLocaleTimeString()}</div>
                <div class="message-content">${msg.text}</div>
            `;
            messagesContainer.appendChild(messageDiv);
        });

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });

    // Set event listener for sending messages
    document.getElementById('messageInput').onkeypress = async function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            const messageText = this.value.trim();
            await sendMessage(chatId, messageText);
            this.value = '';
            
            // Simulate bot reply after a delay
            setTimeout(() => sendBotReply(chatId, botName), 1000);
        }
    };
}

// Function to send a message
async function sendMessage(chatId, messageContent) {
    const messagesRef = collection(db, "chats", chatId, "messages");

    await addDoc(messagesRef, {
        sender: getCurrentUserEmail(),
        text: messageContent,
        timestamp: Timestamp.now()
    });

    // Update last message in chat document
    const chatRef = doc(db, "chats", chatId);
    await setDoc(chatRef, { lastMessage: messageContent }, { merge: true });
}

// Function to send a bot reply
async function sendBotReply(chatId, botName) {
    if (botResponses[botName]) {
        const botMessage = botResponses[botName][Math.floor(Math.random() * botResponses[botName].length)];
        const messagesRef = collection(db, "chats", chatId, "messages");

        await addDoc(messagesRef, {
            sender: botName,
            text: botMessage,
            timestamp: Timestamp.now()
        });

        // Update last message in chat document
        const chatRef = doc(db, "chats", chatId);
        await setDoc(chatRef, { lastMessage: botMessage }, { merge: true });
    }
}

// Function to generate a unique chat ID
function generateChatId(user1, user2) {
    return [user1, user2].sort().join("_");
}

// Initialize chat interface when user is logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        await initializeBotChats(user.email);
        fetchUserChats(user.email);
    }
});

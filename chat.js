const chats = [
    {
        id: 1,
        name: 'Moe Lee',
        product: 'Iphone Charger Cable Lightning to USB',
        price: '$15',
        avatar: 'ML'
    },
    {
        id: 2,
        name: 'Mike Oxlong',
        product: 'Beats Studio Buds - True Wireless',
        avatar: 'MO'
    },
    {
        id: 3,
        name: 'Hugh Jass',
        product: 'Acer EK271 G EK1 Series 27" FH',
        avatar: 'HJ'
    },
    {
        id: 4,
        name: 'Ben Dover',
        product: 'Apple - Iphone 13 - 256 GB - Pink',
        avatar: 'BD'
    }
];

const sellerPersonas = {
    'Moe Lee': {
        personality: 'professional',
        product: 'Iphone Charger Cable Lightning to USB',
        price: 15,
        responses: {
            greeting: ["Hi there! Thanks for your interest in the iPhone cable.", "Hello! Looking at the iPhone charging cable?"],
            negotiation: ["I can offer it for $12, that's my best price.", "Given the quality, I think $13 would be fair.", "What price did you have in mind?"],
            confirmation: ["Great! When would you like to meet up?", "Perfect! I can meet today or tomorrow."],
            rejection: ["No worries! Let me know if you change your mind.", "Thanks for letting me know. Have a great day!"],
            generic: ["I appreciate your message. Could you please clarify what you're looking for?", "Let me know if you have any questions about the cable."]
        }
    },
    'Mike Oxlong': {
        personality: 'casual',
        product: 'Beats Studio Buds',
        price: 150,
        responses: {
            greeting: ["Hey! These Beats are still available!", "What's up! Interested in the Beats?"],
            negotiation: ["I can do $130 if you pick up today", "Make me an offer, I'm flexible"],
            confirmation: ["Sweet! When do you wanna meet?", "Awesome! I'm free after 5pm"],
            rejection: ["All good mate, take care!", "No worries! Hit me up if you change your mind"],
            generic: ["Let me know what you're thinking", "What's on your mind about the Beats?"]
        }
    },
    'Hugh Jass': {
        personality: 'technical',
        product: 'Acer Monitor',
        price: 250,
        responses: {
            greeting: ["Hello! This is a 27-inch 1080p monitor with 144Hz refresh rate.", "Hi! Interested in the Acer monitor? It's in perfect condition."],
            negotiation: ["Given the specs and condition, I can do $220 minimum.", "What's your offer? Keep in mind it's still under warranty."],
            confirmation: ["Excellent choice! Would you like to test it before purchasing?", "Great! I can demonstrate all features upon meetup."],
            rejection: ["Understood! If you're looking for other monitor specs, let me know.", "No problem! Let me know if you want to know more about its features."],
            generic: ["Feel free to ask about any technical specifications.", "I can provide detailed information about refresh rates, response time, etc."]
        }
    }
};

let currentSeller = null;

function getSellerResponse(seller, messageType, userMessage) {
    const persona = sellerPersonas[seller];
    if (!persona) return "Hello! How can I help you?";

    const msg = userMessage.toLowerCase();
    let responseType = 'generic';
    
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
        responseType = 'greeting';
    } else if (msg.includes('price') || msg.includes('offer') || msg.includes('cheaper') || msg.includes('discount')) {
        responseType = 'negotiation';
    } else if (msg.includes('okay') || msg.includes('sure') || msg.includes('yes') || msg.includes('deal')) {
        responseType = 'confirmation';
    } else if (msg.includes('no') || msg.includes('sorry') || msg.includes('cant') || msg.includes("can't")) {
        responseType = 'rejection';
    }

    const responses = persona.responses[responseType];
    return responses[Math.floor(Math.random() * responses.length)];
}

function createChatItem(chat) {
    const div = document.createElement('div');
    div.className = 'chat-item';
    div.innerHTML = `
        <div class="avatar">${chat.avatar}</div>
        <div style="flex: 1">
            <div style="font-weight: bold">${chat.name}</div>
            <div style="font-size: 14px">${chat.product}</div>
        </div>
    `;
    div.onclick = () => loadChat(chat);
    return div;
}

function loadChat(chat) {
    currentSeller = chat.name;
    
    document.getElementById('chatHeader').style.display = 'flex';
    document.getElementById('chatInput').style.display = 'block';
    
    document.getElementById('currentChat').textContent = chat.name;
    document.getElementById('chatAvatar').textContent = chat.avatar;
    
    const messagesDiv = document.getElementById('chatMessages');
    messagesDiv.innerHTML = '';
    messagesDiv.style.justifyContent = 'flex-start';
}

const chatList = document.getElementById('chatList');
chats.forEach(chat => {
    chatList.appendChild(createChatItem(chat));
});

document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim() && currentSeller) {
        const userMessage = this.value;
        const message = {
            type: 'sent',
            content: userMessage,
            timestamp: new Date().toLocaleString()
        };
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;
        messageDiv.innerHTML = `
            <div class="message-content">${message.content}</div>
            <div class="timestamp">${message.timestamp}</div>
        `;
        
        document.getElementById('chatMessages').appendChild(messageDiv);
        this.value = '';

        setTimeout(() => {
            const botResponse = {
                type: 'received',
                content: getSellerResponse(currentSeller, 'generic', userMessage),
                timestamp: new Date().toLocaleString()
            };
            
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = `message ${botResponse.type}`;
            botMessageDiv.innerHTML = `
                <div class="message-content">${botResponse.content}</div>
                <div class="timestamp">${botResponse.timestamp}</div>
            `;
            
            document.getElementById('chatMessages').appendChild(botMessageDiv);
        }, 1000);
    }
});

const chats = [
    { id: 1, name: 'Moe Lee', product: 'Iphone Charger Cable Lightning to USB', avatar: 'ML' },
    { id: 2, name: 'Mike Oxlong', product: 'Beats Studio Buds - True Wireless', avatar: 'MO' },
    { id: 3, name: 'Hugh Jass', product: 'Acer EK271 G EK1 Series 27" FH', avatar: 'HJ' },
    { id: 4, name: 'Ben Dover', product: 'Apple - Iphone 13 - 256 GB - Pink', avatar: 'BD' }
];

const sellerPersonas = {
    'Moe Lee': {
        responses: { greeting: ["Hi! Thanks for your interest in the cable!"], generic: ["Feel free to ask more!"] }
    },
    'Mike Oxlong': {
        responses: { greeting: ["Hey! These Beats are still available!"], generic: ["Let me know what you're thinking."] }
    },
};

let currentSeller = null;

function getSellerResponse(seller, userMessage) {
    const persona = sellerPersonas[seller];
    if (!persona) return "Hello! How can I help you?";

    if (userMessage.toLowerCase().includes('hi')) {
        return persona.responses.greeting[0];
    }
    return persona.responses.generic[0];
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
chats.forEach(chat => chatList.appendChild(createChatItem(chat)));

document.getElementById('messageInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && this.value.trim() && currentSeller) {
        const userMessage = this.value;

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message sent';
        userMessageDiv.innerHTML = `
            <div class="message-content">${userMessage}</div>
            <div class="timestamp">${new Date().toLocaleString()}</div>
        `;

        const chatMessages = document.getElementById('chatMessages');
        chatMessages.appendChild(userMessageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        this.value = '';

        setTimeout(() => {
            const botMessage = getSellerResponse(currentSeller, userMessage);

            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'message received';
            botMessageDiv.innerHTML = `
                <div class="message-content">${botMessage}</div>
                <div class="timestamp">${new Date().toLocaleString()}</div>
            `;

            chatMessages.appendChild(botMessageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
});

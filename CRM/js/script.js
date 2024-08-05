// scripts.js

$(document).ready(function() {
    function getVar(varName) {
        // Implement this function based on your application logic
        // Example: return localStorage.getItem(varName);
    }

    function setVar(varName, value) {
        // Implement this function based on your application logic
        // Example: localStorage.setItem(varName, value);
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const dummyConversations = [
        {
            id: 1,
            name: "Conversation 1",
            messages: [
                { content: "Hello, how are you?", type: "received" },
                { content: "I'm fine, thank you!", type: "sent" }
            ]
        },
        {
            id: 2,
            name: "Conversation 2",
            messages: [
                { content: "Are you coming to the party?", type: "received" },
                { content: "Yes, I'll be there!", type: "sent" },
                { content: "Great! See you there.", type: "received" }
            ]
        },
        {
            id: 3,
            name: "Conversation 3",
            messages: [
                { content: "Did you finish the report?", type: "sent" },
                { content: "Not yet, working on it.", type: "received" },
                { content: "Okay, let me know if you need help.", type: "sent" },
                // Adding 20 more dummy messages
                { content: "Here is the update on the project.", type: "sent" },
                { content: "Looks good, keep it up.", type: "received" },
                { content: "We need to discuss the next steps.", type: "sent" },
                { content: "Sure, let's schedule a meeting.", type: "received" },
                { content: "How about tomorrow?", type: "sent" },
                { content: "Tomorrow works for me.", type: "received" },
                { content: "Great, see you then.", type: "sent" },
                { content: "Don't forget to bring the documents.", type: "received" },
                { content: "I won't, thanks for the reminder.", type: "sent" },
                { content: "No problem.", type: "received" },
                { content: "Did you get my email?", type: "sent" },
                { content: "Yes, I did. I'll review it soon.", type: "received" },
                { content: "Thanks, looking forward to your feedback.", type: "sent" },
                { content: "I'll get back to you by the end of the day.", type: "received" },
                { content: "Perfect, talk to you then.", type: "sent" },
                { content: "Can you send me the latest report?", type: "received" },
                { content: "Sure, I'll send it right away.", type: "sent" },
                { content: "Got it, thanks.", type: "received" },
                { content: "You're welcome.", type: "sent" }
            ]
        }
    ];

    function loadMessages(conversationId) {
        const conversation = dummyConversations.find(conv => conv.id === conversationId);
        if (conversation) {
            const messagesHtml = conversation.messages.map(msg => 
                `<div class="message ${msg.type}">
                    <div class="content">${msg.content}</div>
                </div>`
            ).join('');
            $('#messages').html(messagesHtml);
        }
    }

    function loadConversations() {
        const conversationHtml = dummyConversations.map(conv => 
            `<div class='conversation' data-id='${conv.id}'>
                ${conv.id} - ${conv.name}
            </div>`
        ).join('');
        $('#conversation-list').html(conversationHtml);

        // Select the first conversation if available
        const firstConversation = $('#conversation-list .conversation').first();
        if (firstConversation.length) {
            firstConversation.addClass('selected-conversation');
            setVar('conversationId', firstConversation.data("id"));
            $('#messages').data('current-conversation-id', getVar('conversationId'));
            loadMessages(getVar('conversationId'));

            // Trigger click event to ensure all click bindings are executed
            firstConversation.trigger('click');
        }

        $('.conversation').on('click', function() {
            $('.conversation').removeClass('selected-conversation');
            $(this).addClass('selected-conversation');
            const conversationId = $(this).data('id');
            setVar('conversationId', conversationId);
            loadMessages(conversationId);
        });
    }

    $('#send-message').on('click', function() {
        const message = $('#message-input').val();
        if (message) {
            const conversationId = getVar('conversationId');
            const conversation = dummyConversations.find(conv => conv.id === conversationId);
            if (conversation) {
                conversation.messages.push({ content: message, type: "sent" });
                loadMessages(conversationId);
                $('#message-input').val(''); // Clear input after sending
            }
        }
    });

    // Load conversations when the page loads
    loadConversations();
});

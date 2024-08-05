

// Initialize default values if they don't exist in localStorage
if (!localStorage.getItem('contactID')) {
    localStorage.setItem('contactID', 0);
}
if (!localStorage.getItem('contactIdentifier')) {
    localStorage.setItem('contactIdentifier', 0);
}
if (!localStorage.getItem('contactPubsubToken')) {
    localStorage.setItem('contactPubsubToken', 0);
}
if (!localStorage.getItem('conversationId')) {
    localStorage.setItem('conversationId', -1);
}
if (!localStorage.getItem('inboxIdentifier')) {
    localStorage.setItem('inboxIdentifier', 'amaeXyB9Gog3VssESbWHG7Bx');
}
if (!localStorage.getItem('contentName')) {
    localStorage.setItem('contentName', '');
}
if (!localStorage.getItem('contentPhone')) {
    localStorage.setItem('contentPhone', '');
}
if (!localStorage.getItem('contentEmail')) {
    localStorage.setItem('contentEmail', '');
}
if (!localStorage.getItem('orderNumber')) {
    localStorage.setItem('orderNumber', '');
}

// Function to get variable values from localStorage
function getVar(key) {
    return localStorage.getItem(key);
}

// Function to set variable values in localStorage
function setVar(key, value) {
    localStorage.setItem(key, value);
}

// var contactID = getVar('contactID');
// var contactIdentifier = getVar('contactIdentifier');
// var contactPubsubToken = getVar('contactPubsubToken');
// var conversationId = getVar('conversationId');
// var inboxIdentifier = getVar('inboxIdentifier');
// var contentName = getVar('contentName');
// var contentPhone = getVar('contentPhone');
// var contentEmail = getVar('contentEmail');


function setUpConversation() {
    $.ajax({
        type: "POST",
        url: "https://srv504017.hstgr.cloud/public/api/v1/inboxes/" + getVar('inboxIdentifier') + "/contacts/" + getVar('contactIdentifier') + "/conversations",
        async: false,
        success: function (response) {
            //loadConversations(response.contact.id);
            setVar('conversationId',response.id);
        },
        error: function (xhr, status, error) {
            console.error("Error creating conversation: " + xhr.responseText);
        }
    });
}

function sendMessage() {
    var message = $('#message-input').val();
    var conversationId = $('#messages').data('current-conversation-id');
    if (!conversationId) {
        alert('No conversation selected.');
        return;
    }
    $.ajax({
        url: 'php/send_message.php',
        method: 'POST',
        data: { contactIdentifier: getVar('contactIdentifier'), conversation_id: conversationId, message: message },
        success: function (response) {
            $('#message-input').val('');
            loadMessages(getVar('conversationId'));
            scrollToBottom();
        },
        error: function (xhr, status, error) {
            console.error("Error sending message: " + xhr.responseText);
        }
    });
}

function sendInitMessage(message) {
    if (!getVar('conversationId')) {
        alert('No conversation selected.');
        return;
    }
    $.ajax({
        url: 'php/send_message.php',
        method: 'POST',
        data: { contactIdentifier: getVar('contactIdentifier'), conversation_id: getVar('conversationId'), message: `${message}` },
        success: function (response) {

            console.log("Init Message sent !!");
            window.location.href = 'conversations.php';
        },
        error: function (xhr, status, error) {
            console.error("Error sending message: " + xhr.responseText);
        }
    });
}

function setUpContact(contentPhone) {
    var contactData = {
        email: getVar('contentEmail'),
        name: getVar('contentName'),
        phone_number: getVar('contentPhone')
    };

    $.ajax({
        type: "POST",
        url: "https://srv504017.hstgr.cloud/public/api/v1/inboxes/" + getVar('inboxIdentifier') + "/contacts",
        contentType: "application/json",
        data: JSON.stringify(contactData),
        async: false,
        success: function (responseData) {
            setVar('contactIdentifier',responseData.source_id);
            setVar('contactPubsubToken', responseData.pubsub_token);
            setVar('contactID', responseData.id);
        },
        error: function () {
            console.error("Failed to create contact in Chatwoot");
        }
    });
}

function loadConversations() {
    console.log("loadConversations Start :", getVar('contactID'));
    $.ajax({
        url: 'php/get_openConversations.php',
        method: 'POST',
        data: { contactID: getVar('contactID') },
        dataType: 'json',
        success: function (response) {
            console.log("loadConversations success");
            if (response && response.conversations) {
                $('#conversation-list').html(response.conversations);

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
            } else {
                console.error("Invalid response format:", response);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error loading conversations: " + xhr.responseText);
        }
    });
}

function loadMessages(conversationId) {
    if (conversationId === -1) return;
    $.ajax({
        url: 'php/get_messages.php',
        method: 'POST',
        data: { conversation_id: conversationId },
        success: function (response) {
            $('#messages').html(response);
            scrollToBottom();
        },
        error: function (xhr, status, error) {
            console.error("Error loading messages: " + xhr.responseText);
        }
    });
}

function sendMessage() {
    var message = $('#message-input').val();
    var conversationId = $('#messages').data('current-conversation-id');
    if (!conversationId) {
        alert('No conversation selected.');
        return;
    }
    $.ajax({
        url: 'php/send_message.php',
        method: 'POST',
        data: { contactIdentifier: getVar('contactIdentifier'), conversation_id: conversationId, message: message },
        success: function (response) {
            $('#message-input').val('');
            loadMessages(conversationId);
            scrollToBottom();
        },
        error: function (xhr, status, error) {
            console.error("Error sending message: " + xhr.responseText);
        }
    });
}

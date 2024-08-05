$(document).ready(function () {
    // Set up the contact
    //setUpContact(contentPhone);
    loadConversations(getVar('contactID'));

    // Correctly attach click event to dynamically loaded conversation divs
    $("#conversation-list").on("click", "div.conversation", function () {
        $('.conversation').removeClass('selected-conversation'); // Remove class from all conversations
        $(this).addClass('selected-conversation'); // Add class to the clicked conversation

        setVar('conversationId',$(this).data("id"));
        $('#messages').data('current-conversation-id', getVar('conversationId')); // Set the current conversation ID
        loadMessages(getVar('conversationId'));
    });

    // Execute loadMessages() every 10 seconds
    setInterval(function () {
        setVar('conversationId',$('#messages').data('current-conversation-id'));
        if (getVar('conversationId') !== undefined) {
            loadMessages(getVar('conversationId'));
        }
    }, 10000);
});

function scrollToBottom() {
    var messages = $('#messages');
    messages.scrollTop(messages.prop("scrollHeight"));
}

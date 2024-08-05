$(document).ready(function () {
    setUpContact(getVar('contentPhone'));
    const form = document.getElementById('quiz-form');
    const mainChoiceInputs = document.querySelectorAll('input[name="main-choice"]');
    const subQuestionDiv = document.getElementById('sub-question');
    let userData = {
        mainChoice: '',
        subChoice: '',
        comment: ''
    };

    const mainChoiceMapping = {
        'shipping': 'الشحن',
        'payment': 'الدفع',
        'cancel': 'الغاء الطلب',
        'book-issue': 'مشكلة في الكتاب'
    };

    // Handle main choice change
    mainChoiceInputs.forEach(input => {
        input.addEventListener('change', function() {
            userData.mainChoice = mainChoiceMapping[this.value];
            updateSubQuestion(this.value);
        });
    });

    // Update sub questions based on the main choice
    function updateSubQuestion(mainChoice) {
        subQuestionDiv.innerHTML = '';
        let subChoices = [];
        if (mainChoice === 'shipping') {
            subChoices = ['ﻻيوجد رقم شحنة','تاخر الشحن اكثر من 3 ايام عمل','مشكلة مع مندوب (ادخل رقم المندوب)','مشاكل اخرى'];
        } 
        else if (mainChoice === 'payment') {
            subChoices = ['البنك : الفلوس اتخصمت و مش ظاهر علي الموقع','فوري : الفلوس اتخصمت و مش ظاهر علي الموقع','اخرى'];
        } 
        else if (mainChoice === 'cancel') {
            subChoices = ['جالي اوردر غير المطلوب', 'طلب بالخطأ', 'اخرى'];
        } else if (mainChoice === 'book-issue') {
            subChoices = ['وصلني كتاب خطأ', 'طلبت كتاب غير الي محتاجة', 'اخرى'];
        }

        subChoices.forEach(choice => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="sub-choice" value="${choice}"> ${choice}`;
            subQuestionDiv.appendChild(label);

            label.querySelector('input').addEventListener('change', function() {
                userData.subChoice = this.value;
            });
        });
    }

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const comment = form.querySelector('textarea[name="comment"]').value;
        userData.comment = comment;

        var message = `رقم الطلب : \n   ${getVar('orderNumber')} \n مشكلة بخصوص :\n  ${userData.mainChoice}\n    ${userData.subChoice}\n     وصف المشكلة\n   ${userData.comment}`;
        console.log("Message :" + message);

        setUpConversation();
        sendInitMessage(message);
    });

    // Navigation buttons
    document.querySelectorAll('.next-button').forEach(button => {
        button.addEventListener('click', function() {
            const nextCard = document.getElementById(this.getAttribute('data-next'));
            this.closest('.card').classList.remove('active');
            nextCard.classList.add('active');
        });
    });

    document.querySelectorAll('.prev-button').forEach(button => {
        button.addEventListener('click', function() {
            const prevCard = document.getElementById(this.getAttribute('data-prev'));
            this.closest('.card').classList.remove('active');
            prevCard.classList.add('active');
        });
    });
});
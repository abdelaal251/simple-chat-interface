<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BookBee</title>
  <link rel="stylesheet" href="css/style2.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>

<body>
  <div id="container-1" class="container">
    <header>
      <h1>خدمة عملاء بوك بي</h1>
    </header>
    <main>

     <!-- Form for card-0 -->
     <form id="initial-form">
        <div class="card active" id="card-0">
          <div class="question">
            <label for="user-input">أدخل رقم الطلب:</label>
            <input type="text" id="user-input" name="user-input" required>
          </div>
          <button type="button" id="submit-input">ابداء المحادثة</button>
        </div>
      </form>

      <form id="quiz-form">
        <div class="card" id="card-1">
          <div class="question">
            <p>اختر نوع المشكلة:</p>
            <label><input type="radio" name="main-choice" value="shipping" id="shipping"> الشحن</label>
            <label><input type="radio" name="main-choice" value="payment" id="payment"> الدفع</label>
            <label><input type="radio" name="main-choice" value="cancel" id="cancel"> الغاء الطلب</label>
            <label><input type="radio" name="main-choice" value="book-issue" id="book-issue"> مشكلة في الكتاب</label>
          </div>
          <button type="button" class="next-button" data-next="card-2">التالي</button>
        </div>
        <div class="card" id="card-2">
          <div class="question" id="sub-question">
            <!-- Sub questions will be dynamically added here based on main choice -->
          </div>
          <button type="button" class="prev-button" data-prev="card-1">السابق</button>
          <button type="button" class="next-button" data-next="card-3">التالي</button>
        </div>
        <div class="card" id="card-3">
          <div class="question">
            <p>3. اكتب وصف دقيق للمشكلة</p>
            <p>اذا كانت بخصوص مندوب اذكر رقم المندوب</p>
            <textarea name="comment" rows="4" cols="50"></textarea>
          </div>
          <button type="button" class="prev-button" data-prev="card-2">السابق</button>
          <button type="submit">إرسال</button>
        </div>
      </form>
    </main>
  </div>

  <script src="js/globals.js"></script>
  <script>
    setVar('contentName',"<?php echo $_SESSION['Full_Name']; ?>");

    setVar('contentPhone',"<?php echo $_SESSION['Mobile']; ?>");

    setVar('contentEmail',"<?php echo $_SESSION['Email']; ?>");

    $(document).ready(function() {
      $('#submit-input').click(function() {
        var userInput = $('#user-input').val();
        if (userInput.trim() === '') {
          alert('من فضلك ادخل رقم الطلب');
          return;
        }

        // Set the orderNumber variable using the input value
        setVar('orderNumber', userInput);

        // Hide the initial form and show the quiz form
        $('#initial-form').hide();
        $('#quiz-form').show();
        $('#card-1').addClass('active');
      });

      $('.next-button').click(function() {
        var nextCard = $(this).data('next');
        $(this).closest('.card').removeClass('active');
        $('#' + nextCard).addClass('active');
      });

      $('.prev-button').click(function() {
        var prevCard = $(this).data('prev');
        $(this).closest('.card').removeClass('active');
        $('#' + prevCard).addClass('active');
      });
    });
  </script>
  <script src="js/script2.js"></script>
</body>

</html>
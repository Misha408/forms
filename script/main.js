$(document).ready(function () {
  // Змінні для відстеження поточного кроку
  let currentStep = 1;
  const totalSteps = 4;
  let isButtonDisabled = false;

  function getIndexFromProgressSection(progressSection) {
    // Отримуємо всі елементи .progress__section
    const allProgressSections = $('.progress__section');

    // Шукаємо індекс переданого елемента в колекції всіх елементів .progress__section
    const index = allProgressSections.index(progressSection);

    // Повертаємо індекс + 1, оскільки індекси в JavaScript починаються з 0
    return index + 1;
  }

  function adjustMarginBottom($section) {
    var $modal = $section.find('.progress__modal.active');
    if ($modal.length) {
      var modalHeight = $modal.outerHeight();
      $section.css('margin-bottom', modalHeight + 'px');
    } else {
      $section.css('margin-bottom', '0');
    }
  }

  $('.progress__section:first').css('margin-bottom', $('.progress__modal:first').outerHeight() + 'px');

  $('.progress__section').on('click', function () {
    $('.progress__section:first').css('margin-bottom', '0');
    // Отримуємо порядковий номер поточного елемента .progress__section
    const index = getIndexFromProgressSection($(this));
    $('.progress__modal').removeClass('active');
    // Видаляємо відступ для інших .progress__section
    $('.progress__section').not(':first').css('margin-bottom', '0');
    // Виводимо порядковий номер у консоль для перевірки
    goToNextStep(index);
    adjustMarginBottom($(this));
  });

  // Приклад використання функції для визначення порядкового номера при натисканні на .progress__section
  $('.progress__section').on('click', function () {
    // Отримуємо порядковий номер поточного елемента .progress__section
    const index = getIndexFromProgressSection($(this));
    $('.progress__modal').removeClass('active');
    // Виводимо порядковий номер у консоль для перевірки
    goToNextStep(index)
  });
  // Функція для переходу на наступний крок
  function goToNextStep(step) {
    const currentModal = $(`#${step - 1}`);
    const prevSection = $(`.progress__section:nth-child(${step - 1})`);

    // Закриваємо поточний модальний вікно
    currentModal.removeClass('active');

    // Відкриваємо наступний модальний вікно
    $(`#${step}`).addClass('active');


    currentStep = step;

    // Налаштовуємо відступ для поточного .progress__section
    const $currentSection = $(`.progress__section:nth-child(${step})`);
    adjustMarginBottom($currentSection);

    // Видаляємо відступ для попереднього закритого .progress__section
    prevSection.css('margin-bottom', '0');
  }

  function goToPrevStep(step) {
    const currentModal = $(`#${step + 1}`);
    const prevSection = $(`.progress__section:nth-child(${step + 1})`);

    // Закриваємо поточний модальний вікно
    currentModal.removeClass('active');

    // Відкриваємо попередній модальний вікно
    $(`#${step}`).addClass('active');

    currentStep = step;

    // Налаштовуємо відступ для поточного .progress__section
    const $currentSection = $(`.progress__section:nth-child(${step})`);
    adjustMarginBottom($currentSection);

    // Видаляємо відступ для попереднього закритого .progress__section
    prevSection.css('margin-bottom', '0');
  }

  // Функція для оновлення індикатора кроків
  function updateStepIndicator(step) {
    $('.progress__section').removeClass('progress__section-active progress__section-confirmed');

    for (let i = 1; i <= step; i++) {
      $(`.progress__section:nth-child(${i})`).addClass(i === step ? 'progress__section-active' : 'progress__section-confirmed');
    }
  }

  // Обробники подій
  $('.next').click(function () {
    if (!isButtonDisabled) {
      isButtonDisabled = true;
      $(this).prop('disabled', true);
      updateStepIndicator(currentStep + 1); // Оновлення індикатора кроків негайно
      setTimeout(function () {
        if (currentStep < totalSteps) {
          goToNextStep(currentStep + 1);
        }
        isButtonDisabled = false;
        $('.next').prop('disabled', false);
      }, 150);
    }
  });

  $('.prev').click(function () {
    if (!isButtonDisabled) {
      isButtonDisabled = true;
      $(this).prop('disabled', true);
      updateStepIndicator(currentStep - 1); // Оновлення індикатора кроків негайно
      setTimeout(function () {
        if (currentStep > 1) {
          goToPrevStep(currentStep - 1);
        }
        isButtonDisabled = false;
        $('.prev').prop('disabled', false);
      }, 150);
    }
  });

  // Обробник події для кнопок вибору часу
  $('.progress__student').click(function () {
    $(this).toggleClass('selected');
  });

  // Обробник події для кнопок вибору кількості гостей
  $('.progress__modal__number__btn').click(function () {
    $('.progress__modal__number__btn').removeClass('number__btn__active');

    $(this).addClass('number__btn__active');
  });

  // Ініціалізація індикатора кроків
  updateStepIndicator(currentStep);

  $('.progress__list').click(function () {
    const selectedText = $(this).text();
    const parentSection = $(this).closest('.progress__section');
    const subtitleElement = parentSection.find('.progress__subtitle');
    const iconElement = parentSection.find('.progress__icon');
    const iconWrap = parentSection.find('.progress__icon-wrap');

    iconElement.attr('src', './icons/check.svg');
    iconWrap.css('background-color', '#abd0aa');
    subtitleElement.text(selectedText);
  });



  $('.progress__modal__number__btn__wrap').click(function () {
    const selectedNumber = $('.progress__modal__number__btn__wrap').data('number');
    const parentSection = $(this).closest('.progress__section');
    const subtitleElement = parentSection.find('.progress__subtitle');
    const iconElement = parentSection.find('.progress__icon');
    iconElement.attr('src', './icons/check.svg');
    const iconWrap = parentSection.find('.progress__icon-wrap');
    iconWrap.css('background-color', '#abd0aa');
    subtitleElement.text(`Anzahl der Gäste: ${selectedNumber}`);
  });

  $('.progress__student').click(function () {
    const selectedDuration = $(this).find('.progress__student__btn__title').text();
    const parentSection = $(this).closest('.progress__section');
    const subtitleElement = parentSection.find('.progress__subtitle');
    const iconWrap = parentSection.find('.progress__icon-wrap');
    const iconElement = parentSection.find('.progress__icon');
    iconElement.attr('src', './icons/check.svg');
    iconWrap.css('background-color', '#abd0aa');
    subtitleElement.text(`Dauer: ${selectedDuration}`);
  });

  $('.progress__check__btn').click(function () {
    const selectedTime = $(this).find('.progress__check__btn__title').text();
    const parentSection = $(this).closest('.progress__section');
    const subtitleElement = parentSection.find('.progress__subtitle');
    const iconWrap = parentSection.find('.progress__icon-wrap');
    const iconElement = parentSection.find('.progress__icon');
    iconElement.attr('src', './icons/check.svg');
    subtitleElement.text(`${selectedTime}`);

    $('.progress__section').removeClass('progress__section-active');

    parentSection.addClass('progress__section-confirmed');

    // Змінити фон елемента .progress__icon-wrap на #abd0aa
    iconWrap.css('background-color', '#abd0aa');
  });

  function addRippleEffect(button) {
    button.on('click', function (e) {
      var $btn = $(this);
      var $ripple = $('<span class="ripple"></span>');

      var btnOffset = $btn.offset();
      var xPos = e.pageX - btnOffset.left;
      var yPos = e.pageY - btnOffset.top;

      $ripple.css({
        top: yPos + 'px',
        left: xPos + 'px',
        width: '10px', /* Початковий розмір ripple */
        height: '10px' /* Початковий розмір ripple */
      });

      $btn.append($ripple);

      $ripple.on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {
        $(this).remove();
      });
    });
  }

  addRippleEffect($('.ti-btn'));
});
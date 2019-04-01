'use strict';

(function () {


  var elCalendarAppendTo = document.querySelector('.js-modal-datepicker-append-to');
  var elCalendarContainer = document.querySelector('.js-modal-datepicker-container');
  var elDatePickStartOutput = document.querySelector('.js-date-pick-start-output');
  // var elDatePickEnd = document.querySelector('.js-date-pick-end');
  var elDatePickEndOutput = document.querySelector('.js-date-pick-end-output');

  var elRangeNumber = document.querySelector('.js-date-range-number');
  var elRangeString = document.querySelector('.js-date-range-string');

  elCalendarContainer.classList.add('flatpickr-custom-inline');

  moment.locale('ru');
  flatpickr.localize(flatpickr.l10ns.ru);

  var minStartDate = moment(new Date());
  var minEndDate = moment(new Date()).add(1, 'days');
  var dateStart = moment(minStartDate).format('YYYY-MM-DD');
  var dateEnd = moment(minEndDate).format('YYYY-MM-DD');
  var daysCount;

  // elDatePickStartOutput.textContent = minStartDate.format('D MMM YYYY');
  // elDatePickEndOutput.textContent = minEndDate.format('D MMM YYYY');


  var pickerOptions = {
    inline: true,
    minDate: dateStart,
    maxDate: null,
    onChange: pickerOnChangeHandler,
  };

  function pickerOnChangeHandler(selectedDates, dateStr) {
    // elDatePickStartOutput.textContent = moment(dateStr).format('D MMM YYYY');
    dateStart = dateStr;

    // fillRange();

  }



  var picker = new flatpickr(elCalendarAppendTo, pickerOptions);
  picker.setDate(dateStart);
  // startPicker.open();

  function fillRange() {
    daysCount = moment(dateEnd).diff(moment(dateStart), 'days');

    if (daysCount > 0) {
      elRangeNumber.textContent = daysCount;

      var toText = daysCount.toString();
      var lastChar = toText.slice(-1);
      var lastDigit = +(lastChar);

      if (lastDigit === 1 && daysCount !== 11) {
        elRangeString.textContent = 'день';
      } else if ((lastDigit > 1 && lastDigit < 5) && (daysCount < 12 || daysCount > 14)) {
        elRangeString.textContent = 'дня';
      } else {
        elRangeString.textContent = 'дней';
      }
    } else {
      elRangeNumber.textContent = '0';
      elRangeString.textContent = 'дней';
    }

  }

})();

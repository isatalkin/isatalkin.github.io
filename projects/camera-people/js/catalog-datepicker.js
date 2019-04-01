'use strict';

(function () {

  var elDatePickStart = document.querySelector('.js-date-pick-start');
  var elDatePickStartOutput = document.querySelector('.js-date-pick-start-output');
  var elDatePickEnd = document.querySelector('.js-date-pick-end');
  var elDatePickEndOutput = document.querySelector('.js-date-pick-end-output');

  var elRangeNumber = document.querySelector('.js-date-range-number');
  var elRangeString = document.querySelector('.js-date-range-string');


  moment.locale('ru');
  flatpickr.localize(flatpickr.l10ns.ru);

  var minStartDate = moment(new Date());
  var minEndDate = moment(new Date()).add(1, 'days');
  var dateStart = moment(minStartDate).format('YYYY-MM-DD');
  var dateEnd = moment(minEndDate).format('YYYY-MM-DD');
  var daysCount;

  elDatePickStartOutput.textContent = minStartDate.format('D MMM YYYY');
  elDatePickEndOutput.textContent = minEndDate.format('D MMM YYYY');


  var startPickerOptions = {
    minDate: dateStart,
    maxDate: null,
    onChange: startPickerOnChangeHandler,
  };

  function startPickerOnChangeHandler(selectedDates, dateStr) {
    elDatePickStartOutput.textContent = moment(dateStr).format('D MMM YYYY');
    dateStart = dateStr;

    // minEndDate = moment(moment(dateStart).add(1, 'days')).format('YYYY-MM-DD');
    // if (moment(dateEnd).isSameOrAfter(dateStart)) {
    //   dateEnd = minEndDate;
    //   endPicker.set('minDate', minEndDate);
    //   endPicker.setDate(minEndDate, false);
    //   elDatePickEndOutput.textContent = moment(minEndDate).format('D MMM YYYY');
    // }
    // endPicker.set('minDate', minEndDate);

    // if (dateEnd) {
    fillRange();
    // }
  }

  var endPickerOptions = {
    minDate: dateEnd,
    maxDate: null,
    onChange: endPickerOnChangeHandler,
  };

  function endPickerOnChangeHandler(selectedDates, dateStr) {
    elDatePickEndOutput.textContent = moment(dateStr).format('D MMM YYYY');
    dateEnd = dateStr;

    // var maxStartDate = moment(moment(dateEnd).add(-1, 'days')).format('YYYY-MM-DD');
    // if (moment(dateStart).isSameOrAfter(dateEnd)) {
    //   dateStart = maxStartDate;
    //   startPicker.set('maxDate', maxStartDate);
    //   startPicker.setDate(maxStartDate, false);
    //   elDatePickStartOutput.textContent = moment(maxStartDate).format('D MMM YYYY');
    // }
    // startPicker.set('maxDate', maxStartDate);

    // if (dateStart) {
    fillRange();
    // }

  }

  var startPicker = new flatpickr(elDatePickStart, startPickerOptions);
  startPicker.setDate(dateStart);
  // startPicker.open();
  var endPicker = new flatpickr(elDatePickEnd, endPickerOptions);
  endPicker.setDate(dateEnd);

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

var package_info = require('../../package.json');

function format(date) {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + (date.getDate())).slice(-2);
  return (year + '-' + month + '-' + day);
}

var holiday_jp = {
  VERSION: package_info.version,
  holidays: {},
  set_holidays: function(selected_year_holidays) {
    var holidays = {}
    selected_year_holidays.forEach(function (selected_year_holiday) {
      Object.assign(holidays, selected_year_holiday)
    })
    this.holidays = holidays
  },
  between: function(start, last) {
    var selected = [];
    var d;
    var holidays = this.holidays
    start = new Date(format(start));
    last = new Date(format(last));
    Object.keys(holidays).forEach(function (date) {
      d = new Date(holidays[date]['date']);
      if (start <= d && d <= last) {
        holidays[date]['date'] = d;
        selected.push(holidays[date]);
      }
    });
    return selected;
  },

  isHoliday: function(date) {
    if (date instanceof Date) {
      date = format(date);
    }
    if (this.holidays[date]) {
      return true;
    }
    return false;
  }
};

module.exports = holiday_jp;

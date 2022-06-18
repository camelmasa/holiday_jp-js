var package_info = require('./../package.json');
var format = require('./format');

// Object.assign by Babel plugin
// https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-object-assign
var assign = function () {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends.apply(this, arguments);
};

var holiday_jp = {
  VERSION: package_info.version,
  holidays: [],
  setHolidays: function(holidays_per_years) {
    var holidays = {}
    holidays_per_years.forEach(function (holidays_per_year) {
      assign(holidays, holidays_per_year)
    })
    this.holidays = holidays
  },
  isIncludeHolidays: function (date) {
    if (date instanceof Date) {
      date = format(date);
    }
 
    return Object.keys(holidays.flat()).includes(date)
  },
  between: function(start, last) {
    if (!isIncludeHolidays(start) || !isIncludeHolidays(end)) throw new Error("Not included in the holiday dataset")

    var selected = [];
    var d;
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
    if (!isIncludeHolidays(date)) throw new Error("Not included in the holiday dataset")

    if (date instanceof Date) {
      date = format(date);
    }
    if (holidays[date]) {
      return true;
    }
    return false;
  }
};

module.exports = holiday_jp;

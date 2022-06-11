var fs = require('fs')
  , util = require('util')
  , yaml = require('js-yaml')
  , moment = require('moment');

var holidays = yaml.safeLoad(fs.readFileSync(__dirname + '/../holiday_jp/holidays_detailed.yml', 'utf8'));
var timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
var startYear = null
var endYear = null
var jsfile = [util.format("// Generated from holidays.yml at %s;", timestamp)];
jsfile.push('var holidays = {};');

Object.keys(holidays).forEach(function (date) {
  if (!startYear || startYear > new Date(date).getFullYear()) startYear = new Date(date).getFullYear()
  if (!endYear || endYear < new Date(date).getFullYear()) endYear = new Date(date).getFullYear()

  jsfile.push("holidays['" + moment(new Date(date)).format('YYYY-MM-DD') + "'] = {");
  jsfile.push("  'date': '" + moment(new Date(date)).format('YYYY-MM-DD') + "',");
  jsfile.push("  'week': '" + holidays[date]['week'] +"',");
  jsfile.push("  'week_en': '" + holidays[date]['week_en'] +"',");
  jsfile.push("  'name': '" + holidays[date]['name'] +"',");
  jsfile.push("  'name_en': \"" + holidays[date]['name_en'] +"\"");
  jsfile.push('};');
});
jsfile.push('module.exports = holidays;');

fs.writeFileSync(__dirname + '/../lib/holidays.js', jsfile.join("\n"));

try {
  fs.mkdirSync(__dirname + '/../lib/holidays');
} catch {}

for (var i = startYear; i <= endYear; i++) {
  var timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  var jsfile = [util.format("// Generated from holidays.yml at %s;", timestamp)];
  jsfile.push('var holidays = {};');
  
  Object.keys(holidays).forEach(function (date) {
    if (new Date(date).getFullYear() !== i) return;

    jsfile.push("holidays['" + moment(new Date(date)).format('YYYY-MM-DD') + "'] = {");
    jsfile.push("  'date': '" + moment(new Date(date)).format('YYYY-MM-DD') + "',");
    jsfile.push("  'week': '" + holidays[date]['week'] +"',");
    jsfile.push("  'week_en': '" + holidays[date]['week_en'] +"',");
    jsfile.push("  'name': '" + holidays[date]['name'] +"',");
    jsfile.push("  'name_en': \"" + holidays[date]['name_en'] +"\"");
    jsfile.push('};');
  });
  jsfile.push('module.exports = holidays;');
  
  try {
    fs.mkdirSync(__dirname + '/../lib/holidays/' + i);
  } catch {}
  fs.writeFileSync(__dirname + '/../lib/holidays/' + i + '/index.js', jsfile.join("\n"));
}
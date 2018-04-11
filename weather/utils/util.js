function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatWeekDay(date) {
  var week = new Date().getDay();
  var str = ""
  if (week == 0) {
    str = "周日";
  } else if (week == 1) {
    str = "周一";
  } else if (week == 2) {
    str = "周二";
  } else if (week == 3) {
    str = "周三";
  } else if (week == 4) {
    str = "周四";
  } else if (week == 5) {
    str = "周五";
  } else if (week == 6) {
    str = "周六";
  }
  return str
}

module.exports = {
  formatTime: formatTime,
  formatWeekDay:formatWeekDay
}

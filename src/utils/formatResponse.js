const momentTz = require("moment-timezone");
const moment = require("moment");

const localtime = (DateTime, timeZone) => {
  const localDt = momentTz.tz(DateTime, timeZone).format("YYYY-MM-DDTHH:mm:ss");
  return localDt;
};

const utcTime = (DateTime, timeZone) => {
  const utctime =
    momentTz.tz(DateTime, timeZone).utc().format("YYYY-MM-DDTHH:mm:ss") + "Z";

  return new Date(utctime);
};

const converStringToDate = (date) => {
  return moment(data.date + "Z", "DD-MM-YYYY" + "Z").toDate();
};

const formatUser = (userData, timezone) => {
  delete userData.otp;
  delete userData.__v;
  delete userData.password;
  delete userData.userType;
  delete userData.isBlocked;
  delete userData.isDeleted;
  userData.createdAt = localtime(userData.createdAt, timezone);
  userData.updatedAt = localtime(userData.updatedAt, timezone);
  return userData;
};

module.exports = {
  formatUser,
  converStringToDate,
};

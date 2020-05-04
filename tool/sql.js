function fmtTimePrecise(key, newKey) {
  return `DATE_FORMAT(${key},'%Y-%m-%d %H.%i.%s') as ${newKey || key}`;
}

function fmtTimeSimple(key, newKey) {
  return `DATE_FORMAT(${key},'%Y-%m-%d') as ${newKey || key}`;
}

module.exports = {
  fmtTimePrecise,
  fmtTimeSimple,
};

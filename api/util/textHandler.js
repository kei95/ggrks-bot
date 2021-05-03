function textHandler(str) {
  if (!str) return "";

  // Text will be changed if it's room
  let targetText = str;

  // When the bot is in multiple ppl chat
  var activateStr = targetText.trim().substring(0, 2).toLowerCase();
  if (
    activateStr !== "g " &&
    activateStr !== "G " &&
    activateStr !== "g　" &&
    activateStr !== "G　"
  ) {
    return "";
  }
  targetText = targetText.trim().substring(2, targetText.length).trim();
  return targetText;
}

module.exports = textHandler;

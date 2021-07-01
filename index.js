var container = document.querySelector(".container");
var containerInner = document.querySelector(".container-inner");
var scrollMarker = document.querySelector(".scroll-marker");
var markerColor = "#f53939";
var senderPosition = "left";
var msgList = [
  "お電話ありがとうございます。 PNLでございます",
  "いつもお世話になっております",
  "はい、かしこまりました",
  "お電話ありがとうございます",
  "ただいまおつなぎ致します。少々お待ちくださいませ",
  "申し訳ございません",
  "おっしゃる通りでございます",
  "ご指摘いただきありがとうございます",
];

function addMarker(span) {
  var containerHeight = container.offsetHeight;
  var containerScrollHeight = containerInner.scrollHeight;

  var spanTop = span.offsetTop;
  var spanBottom = spanTop + span.offsetHeight;

  var markerTop = Math.ceil(
    (spanTop * containerHeight) / containerScrollHeight
  );
  var markerBottom = Math.ceil(
    (spanBottom * containerHeight) / containerScrollHeight
  );

  var markerElement = document.createElement("span"); // create the marker, set color and position and put it there
  markerElement.style.backgroundColor = markerColor;
  markerElement.style.top = markerTop + "px";
  markerElement.style.height = (markerBottom - markerTop) / 2 + "px";
  scrollMarker.appendChild(markerElement);
}

function renderMarker() {
  var colorfulStuff = document.querySelectorAll(".container-inner span");
  scrollMarker.innerHTML = "";
  if (hasScrollBar()) {
    colorfulStuff.forEach(function (span) {
      addMarker(span);
    });
  }
}

//check if scrollbar visible or not
function hasScrollBar() {
  return containerInner.scrollHeight > container.offsetHeight;
}

//create a message
function createMsg(text, keyword) {
  console.log("create msg");
  var msgBox = document.createElement("DIV");
  msgBox.className = `msg ${senderPosition}-msg`;

  var sender = document.createElement("DIV");
  sender.className = "msg-sender";
  var info = document.createElement("DIV");
  info.className = "msg-info";
  var infoName = document.createElement("DIV");
  infoName.className = "msg-info-name";
  infoName.innerText = senderPosition === "left" ? "発信者" : "着信者";
  var infoTime = document.createElement("DIV");
  infoTime.className = "msg-info-time";
  var currentTime = new Date();
  infoTime.innerText = `${currentTime.getHours()}:${currentTime.getMinutes()}.${currentTime.getSeconds()}`;

  info.appendChild(infoName);
  info.appendChild(infoTime);

  sender.appendChild(info);

  var msgBubble = document.createElement("DIV");
  msgBubble.className = "msg-bubble";
  var msgText = document.createElement("DIV");
  msgText.className = "msg-text";
  var msgTextBuilder = text;

  if (keyword)
    msgTextBuilder =
      msgTextBuilder + `  <span class='keyword'>${keyword}</span>`;
  msgText.innerHTML = msgTextBuilder;
  msgBubble.appendChild(msgText);

  msgBox.appendChild(sender);
  msgBox.appendChild(msgBubble);
  senderPosition = senderPosition === "left" ? "right" : "left";
  return msgBox;
}

function addNormalMsg() {
  var randomMsg = msgList[Math.floor(Math.random() * msgList.length)];
  var msgNode = createMsg(randomMsg);
  containerInner.appendChild(msgNode);
  renderMarker();
  scrollToBottom();
}

function addKeywordMsg() {
  var msgNode = createMsg(
    msgList[Math.floor(Math.random() * msgList.length)],
    "これは注意ワード"
  );
  containerInner.appendChild(msgNode);
  renderMarker();
  scrollToBottom();
}

function scrollToBottom() {
  containerInner.scrollTo(0, containerInner.scrollHeight);
}

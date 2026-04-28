const startScreen = document.getElementById("startScreen");
const menuScreen = document.getElementById("menuScreen");
const zoneScreen = document.getElementById("zoneScreen");
const shareScreen = document.getElementById("shareScreen");

const zoneTitle = document.getElementById("zoneTitle");
const zoneDesc = document.getElementById("zoneDesc");

const viewer = document.getElementById("viewer");
const appCards = document.getElementById("appCards");
const videoWrap = document.getElementById("videoWrap");
const video = document.getElementById("video");
const cameraUI = document.getElementById("cameraUI");

const infoPanel = document.getElementById("infoPanel");
const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");
const zoneActions = document.getElementById("zoneActions");

function showScreen(screen) {
  startScreen.classList.remove("active");
  menuScreen.classList.remove("active");
  zoneScreen.classList.remove("active");
  shareScreen.classList.remove("active");

  screen.classList.add("active");
}

function goMenu() {
  video.pause();

  const audio = document.getElementById("audio");
  audio.pause();

  closeInfo();
  showScreen(menuScreen);
}

const audio = document.getElementById("audio");



video.addEventListener("ended", () => {
  audio.pause();
  audio.currentTime = 0;
});

function openZone(zoneNumber) {
  showScreen(zoneScreen);

  viewer.classList.add("hidden");
  appCards.classList.add("hidden");
  videoWrap.classList.add("hidden");
  cameraUI.classList.add("hidden");
  infoPanel.classList.add("hidden");

  video.pause();

  document.querySelectorAll(".bottom-nav button").forEach((btn) => {
    btn.classList.remove("active");
  });

  const activeBtn = document.getElementById("nav" + zoneNumber);
  if (activeBtn) activeBtn.classList.add("active");

  zoneActions.innerHTML = "";

  if (zoneNumber === 1) {
    zoneTitle.textContent = "Zone 1 — DISCOVER";
    zoneDesc.textContent = "Vision Pro 3D 모델과 부품 설명을 확인합니다.";

    viewer.classList.remove("hidden");
    viewer.setAttribute("auto-rotate", "");
    viewer.setAttribute("camera-orbit", "0deg 75deg 2.5m");

    zoneActions.innerHTML = `
      <button onclick="showInfo('전면 카메라 & 센서', '사용자의 눈과 손 동작을 인식하여 자연스러운 인터랙션을 가능하게 합니다.')">전면 카메라 & 센서</button>
      <button onclick="showInfo('렌즈', '사용자에게 고해상도의 공간 화면을 보여주는 핵심 부품입니다.')">렌즈</button>
      <button onclick="showInfo('헤드 밴드', '기기를 안정적으로 착용할 수 있도록 머리를 감싸는 구조입니다.')">헤드 밴드</button>
      <button onclick="explodeModel()">분해 보기</button>
    `;
  }

  if (zoneNumber === 2) {
    zoneTitle.textContent = "Zone 2 — PLACE";
    zoneDesc.textContent = "바닥 위에 앱 창을 배치하는 공간 인터페이스를 체험합니다.";

    viewer.classList.add("hidden");
    appCards.classList.remove("hidden");
    viewer.setAttribute("camera-orbit", "35deg 70deg 3m");

    zoneActions.innerHTML = `
      <button onclick="moveApps()">앱 창 드래그 이동</button>
      <button onclick="scaleApps()">핀치로 크기 조절</button>
      <button onclick="resetApps()">앱 배치 초기화</button>
    `;
  }

  if (zoneNumber === 3) {
    zoneTitle.textContent = "Zone 3 — WATCH";
    zoneDesc.textContent = "벽면 전체에 펼쳐지는 가상 스크린으로 영상을 감상합니다.";

    videoWrap.classList.remove("hidden");
    video.currentTime = 0;

    zoneActions.innerHTML = `
      <button onclick="playVideo()">영상 재생</button>
      <button onclick="resizeVideo('big')">스크린 크게</button>
      <button onclick="resizeVideo('small')">스크린 작게</button>
    `;
    document.querySelector(".screen-controls").style.display = "none";
  }

  if (zoneNumber === 4) {
    zoneTitle.textContent = "Zone 4 — SHARE";
    zoneDesc.textContent = "Vision Pro 3D 모델과 함께 사진을 찍고 공유합니다.";

    viewer.classList.remove("hidden");
    cameraUI.classList.remove("hidden");
    viewer.setAttribute("camera-orbit", "30deg 70deg 3m");

    zoneActions.innerHTML = `
      <button onclick="showShare()">캡처하기</button>
      <button onclick="showShare()">SNS 공유하기</button>
    `;
  }
}

function showInfo(title, text) {
  infoTitle.textContent = title;
  infoText.textContent = text;
  infoPanel.classList.remove("hidden");
}

function closeInfo() {
  infoPanel.classList.add("hidden");
}

function explodeModel() {
  showInfo(
    "분해 보기",
    "Vision Pro가 여러 레이어로 분리되는 장면을 표현한 기능입니다. 실제 구현에서는 회전과 확대를 통해 내부 구조를 확인하는 방식으로 대체했습니다."
  );

  viewer.setAttribute("camera-orbit", "70deg 70deg 3.2m");
}

function moveApps() {
  const cards = document.querySelectorAll(".app-card");

  cards.forEach((card, index) => {
    card.style.transform = `translate(${(index - 2) * 18}px, ${index % 2 === 0 ? -12 : 12}px)`;
  });
}

function scaleApps() {
  const cards = document.querySelectorAll(".app-card");

  cards.forEach((card) => {
    card.style.transform = "scale(1.15)";
  });
}

function resetApps() {
  const cards = document.querySelectorAll(".app-card");

  cards.forEach((card) => {
    card.style.transform = "none";
  });
}

function playVideo() {
  video.currentTime = 0;
  audio.currentTime = 0;

  
  video.play();

  audio.play();
}

function resizeVideo(size) {
  if (size === "big") {
    videoWrap.style.maxWidth = "1100px";
    videoWrap.style.width = "94%";
  }

  if (size === "small") {
    videoWrap.style.maxWidth = "720px";
    videoWrap.style.width = "70%";
  }
}

function showShare() {
  video.pause();
  showScreen(shareScreen);
}

// 공유할 URL
const shareUrl = "https://www.apple.com/apple-vision-pro/";
const shareText = "Apple Vision Pro AR 체험!";

// 인스타 (실제 공유 API 없음 → 안내용)
function shareInstagram() {
  alert("인스타그램은 직접 붙여넣기로 공유해주세요 🙏");
}

// 페이스북
function shareFacebook() {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    "_blank"
  );
}

// 트위터(X)
function shareTwitter() {
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    "_blank"
  );
}

// 카카오 (간단 버전)
function shareKakao() {
  alert("카카오는 SDK 필요 (지금은 데모용)");
}
let gKeyPressCount = 0;

function handleGKeyPress() {
  // Increment the key press count
  gKeyPressCount++;

  // Get all video elements on the page
  const videos = document.querySelectorAll("video");

  // Iterate through each video and update the playback speed
  videos.forEach(function (video) {
    const speed = gKeyPressCount % 2 === 1 ? 16.0 : 1.0;
    updatePlaybackSpeed(video, speed);
    localStorage.setItem("playbackSpeed", video.playbackRate.toFixed(2));
  });
}

window.addEventListener("load", function () {
  identifyVideos();
  document.addEventListener("keydown", function (event) {
    if (event.key === "G" || event.key === "g") {
      handleGKeyPress();
    }
  });
});

function identifyVideos() {
  const videos = document.querySelectorAll("video");
  videos.forEach(function (video) {
    const videoParent = video.parentElement;

    const speedButton = document.createElement("div");
    speedButton.style.position = "relative";
    speedButton.style.display = "block";
    speedButton.style.top = "1.2vw";
    speedButton.style.left = "1.2vw";
    speedButton.style.width = "2vw";
    speedButton.style.height = "2vw";
    speedButton.style.background = "#000000";
    speedButton.style.borderRadius = "5vw";
    speedButton.style.padding = "0.1vw";
    speedButton.style.color = "#ffffff";
    speedButton.style.display = "flex";
    speedButton.style.alignItems = "center";
    speedButton.style.justifyContent = "center";
    speedButton.style.cursor = "pointer";
    const speedText = document.createElement("div");
    speedText.style.zIndex = "100";
    speedText.style.color = "#ffffff";
    const speed = parseFloat(localStorage.getItem("playbackSpeed")) || 1.0;
    updatePlaybackSpeed(video, speed);
    speedText.innerText = getPlaybackSpeed(video);

    speedButton.addEventListener("mouseenter", function () {
      createSpeedControls(speedButton, video, speedText);
      speedButton.style.width = "5vw";
    });

    speedButton.addEventListener("mouseleave", function () {
      speedButton.style.width = "2vw";
      removeSpeedControls(speedButton, speedText);
    });

    videoParent.appendChild(speedButton);
    speedButton.appendChild(speedText);
  });
}

function getPlaybackSpeed(video) {
  const playbackSpeed = video.playbackRate.toFixed(2);
  return playbackSpeed;
}

function updatePlaybackSpeed(video, speed) {
  video.playbackRate = speed;
}

function createSpeedControls(speedButton, video, speedText) {
  const increaseButton = createControlButton("+", video, 0.1, speedText);
  const decreaseButton = createControlButton("-", video, -0.1, speedText);
  while (speedButton.firstChild) {
    speedButton.removeChild(speedButton.firstChild);
  }
  speedButton.appendChild(decreaseButton);
  speedButton.appendChild(document.createTextNode(" "));
  speedButton.appendChild(speedText);
  speedButton.appendChild(document.createTextNode(" "));
  speedButton.appendChild(increaseButton);
}

function removeSpeedControls(speedButton, speedText) {
  while (speedButton.firstChild) {
    speedButton.removeChild(speedButton.firstChild);
  }

  speedButton.appendChild(speedText);
}

function createControlButton(text, video, speedChange, speedText) {
  const button = document.createElement("button");
  button.innerText = text;
  button.style.margin = "0.2vw";
  button.style.padding = "0.2vw";
  button.style.paddingLeft = "0.5vw";
  button.style.paddingRight = "0.5vw";
  button.style.background = "#333333";
  button.style.border = "none";
  button.style.color = "#ffffff";
  button.style.cursor = "pointer";
  button.style.borderRadius = "100%";

  button.addEventListener("click", function (event) {
    event.stopPropagation();
    video.playbackRate += speedChange;
    localStorage.setItem("playbackSpeed", video.playbackRate);
    speedText.innerText = getPlaybackSpeed(video);
  });

  return button;
}

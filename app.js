
const videos = [
  {
    file: "videos/sample.mp4",
    message: "Merry Christmas, Luna! ❤️"
  },
  {
    file: "videos/luna2.mp4",
    message: "I love belly rubs and snuggles 🥰"
  },
  {
    file: "videos/luna3.mp4",
    message: "Eat your deen-ur 🍲"
  }
];

let lastVideoIndex = -1;

const videoPlayer = document.getElementById("surprise-video");
const videoPlaceholder = document.getElementById("video-placeholder");
const playButton = document.getElementById("play-surprise");
const videoMessage = document.getElementById("video-message");

// Initial opening screen
videoPlayer.classList.remove("active");
videoPlayer.removeAttribute("src");
videoMessage.classList.remove("active");
videoPlaceholder.style.display = "block";

playButton.addEventListener("click", function () {
let randomIndex;

do {
  randomIndex = Math.floor(Math.random() * videos.length);
} while (randomIndex === lastVideoIndex);

lastVideoIndex = randomIndex;

const selectedVideo = videos[randomIndex];

  videoPlayer.src = selectedVideo.file;
  videoPlayer.controls = true;
  videoPlayer.volume = 0.5;
  videoPlayer.classList.add("active");

  videoPlaceholder.style.display = "none";

  videoMessage.textContent = selectedVideo.message;
  videoMessage.classList.add("active");
  playButton.textContent = "▶ Play Another Surprise!";

  videoPlayer.load();
  videoPlayer.play();
});

videoPlayer.addEventListener("ended", function () {
  videoMessage.classList.remove("active");

  // Hide the video controls when playback ends
  videoPlayer.controls = false;

  // Invite the recipient to play another surprise
  playButton.textContent = "▶ Play Another Surprise!";
});
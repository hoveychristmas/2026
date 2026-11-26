// =====================================
// PERSONALIZED CHRISTMAS SETTINGS
// Change these details for each person
// =====================================

const christmasConfig = {
  recipientName: "Luna",
  senderName: "Dadders",
  christmasYear: "2026",
  photo: "images/luna.jpeg",

    videos: [
    {
      file: "videos/santa.mp4",
      message: "Merry Christmas, Luna! 🎅❤️"
    },
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
  ]
};

// =====================================
// PAGE PERSONALIZATION
// =====================================

document.title = `Hovey Homemade Christmas ${christmasConfig.christmasYear}`;

document.getElementById("christmas-greeting").textContent =
  `Merry Christmas, ${christmasConfig.recipientName}! ❤️`;

document.getElementById("made-with-love").textContent =
  `Made with love by ${christmasConfig.senderName}`;

document.getElementById("christmas-year").textContent =
  `Christmas ${christmasConfig.christmasYear}`;

const recipientPhoto = document.getElementById("recipient-photo");
recipientPhoto.src = christmasConfig.photo;
recipientPhoto.alt = `${christmasConfig.recipientName}'s Christmas portrait`;


// =====================================
// VIDEO PLAYER
// =====================================

const videos = christmasConfig.videos;

let lastVideoIndex = -1;
let firstPlay = true;

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
  let selectedIndex;

  if (firstPlay) {
    // Always play Santa first
    selectedIndex = 0;
    firstPlay = false;
  } else {
    // Randomize all videos, including Santa
    do {
      selectedIndex = Math.floor(Math.random() * videos.length);
    } while (
      videos.length > 1 &&
      selectedIndex === lastVideoIndex
    );
  }

  lastVideoIndex = selectedIndex;

  const selectedVideo = videos[selectedIndex];

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

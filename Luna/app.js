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

let firstPlay = true;
let lastVideoIndex = -1;
let shuffleBag = [];

const videoPlayer = document.getElementById("surprise-video");
const videoPlaceholder = document.getElementById("video-placeholder");
const playButton = document.getElementById("play-surprise");
const videoMessage = document.getElementById("video-message");

// Shuffle an array using Fisher-Yates
function shuffleVideos(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// Fill the shuffle bag with every video
function refillShuffleBag() {
  shuffleBag = shuffleVideos(
    videos.map((video, index) => index)
  );

  // Prevent an immediate repeat across rounds
  if (
    shuffleBag.length > 1 &&
    shuffleBag[shuffleBag.length - 1] === lastVideoIndex
  ) {
    [shuffleBag[0], shuffleBag[shuffleBag.length - 1]] =
      [shuffleBag[shuffleBag.length - 1], shuffleBag[0]];
  }
}

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
    // Refill when all videos have played
    if (shuffleBag.length === 0) {
      refillShuffleBag();
    }

    // Take the next video from the shuffled bag
    selectedIndex = shuffleBag.pop();
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

$(function() {
    var video = document.getElementById("video-player");
    var playPauseBtn = document.getElementById("play-pause-btn");
    var progressBar = document.querySelector(".progress-bar");
    var progressBarFilled = document.querySelector(".progress-bar-filled");
    var muteBtn = document.getElementById("mute-btn");
    var volumeBar = document.getElementById("volume-bar");
    var currentTimeDisplay = document.getElementById("current-time");
    var totalTimeDisplay = document.getElementById("total-time");
    var isDragging = false;
    var thumbnail = document.getElementById("thumbnail");
    var controls = document.getElementById("controls");
    var fullscreenBtn = document.getElementById("fullscreen-btn");
    var controlsTimeout;
    var seekDuration = 15; // Duration in seconds for forward/rewind

    video.addEventListener("play", updatePlayPauseIcon);
    video.addEventListener("pause", updatePlayPauseIcon);
    video.addEventListener("ended", updatePlayPauseIcon);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handlePause);
    fullscreenBtn.addEventListener("click", toggleFullscreen);

    function handlePlay() {
        isPlaying = true;
        controls.style.opacity = 1;
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(function() {
          if (!video.paused) {
            hideControls();
          }
        }, 2000);
      }

      function handlePause() {
        isPlaying = false;
        clearTimeout(controlsTimeout);
        controls.style.opacity = 1;
        controls.style.display = "flex";
      }

      function hideControls() {
        if (!isPlaying) {
          controls.style.opacity = 0;
          setTimeout(function() {
            if (!isPlaying) {
              controls.style.display = "none";
            }
          }, 300);
        } else {
          controls.style.opacity = 0;
          setTimeout(function() {
            if (isPlaying) {
              controls.style.display = "flex";
            }
          }, 300);
        }
    }

    function updatePlayPauseIcon() {
        if (video.paused || video.ended) {
            playPauseBtn.classList.remove("playing");
            playPauseBtn.classList.add("paused");
        } else {
            playPauseBtn.classList.remove("paused");
            playPauseBtn.classList.add("playing");
        }
    }

    playPauseBtn.addEventListener("click", togglePlayPause);
    video.addEventListener("click", togglePlayPause);

    video.addEventListener("timeupdate", function () {
    if (!isDragging) {
        var progress = (video.currentTime / video.duration) * 100;
        progressBarFilled.style.width = progress + "%";
    }

    currentTimeDisplay.textContent = formatTime(video.currentTime);
    });

    video.addEventListener("loadedmetadata", function () {
    totalTimeDisplay.textContent = formatTime(video.duration);
    });

    video.addEventListener("ended", function () {
    playPauseBtn.classList.remove("playing");
    playPauseBtn.classList.add("paused");
    });

    progressBar.addEventListener("mousedown", function (e) {
    isDragging = true;
    updateProgressBar(e.clientX);
    });

    document.addEventListener("mousemove", function (e) {
    if (isDragging) {
        updateProgressBar(e.clientX);
    }
    });

    document.addEventListener("mouseup", function (e) {
    if (isDragging) {
        isDragging = false;
        var progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
        video.currentTime = progress * video.duration;
    }
    });

    document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        e.preventDefault(); // Prevent default scrolling behavior
        togglePlayPause();
    } else if (e.code === "ArrowRight") {
        e.preventDefault();
        seekForward();
    } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        seekBackward();
    }
    });

    function togglePlayPause() {
        if (video.paused) {
            video.play();
            playPauseBtn.classList.remove("paused");
            playPauseBtn.classList.add("playing");
        } else {
            video.pause();
            playPauseBtn.classList.remove("playing");
            playPauseBtn.classList.add("paused");
        }
    }

    function updateProgressBar(clientX) {
    var rect = progressBar.getBoundingClientRect();
    var progressBarWidth = rect.width;
    var progressBarOffset = rect.left;
    var clickPosition = clientX - progressBarOffset;
    var progress = (clickPosition / progressBarWidth) * 100;
    progress = Math.max(0, Math.min(progress, 100));
    progressBarFilled.style.width = progress + "%";
    }

    muteBtn.addEventListener("click", function () {
    if (video.muted) {
        video.muted = false;
        muteBtn.classList.remove("muted");
        muteBtn.classList.add("unmuted");
    } else {
        video.muted = true;
        muteBtn.classList.remove("unmuted");
        muteBtn.classList.add("muted");
    }
    });

    volumeBar.addEventListener("input", function () {
        video.volume = volumeBar.value;
    });

    function seekForward() {
        video.currentTime += 15;
    }

    function seekBackward() {
        video.currentTime -= 15;
    }

    function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        var formattedTime = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        return formattedTime;
    }

    video.addEventListener("playing", function () {
        thumbnail.style.display = "none";
        video.style.display = "block";
    });

    thumbnail.addEventListener("click", function () {
        thumbnail.style.display = "none";
        video.style.display = "block";
        video.play();
    });

    function toggleFullscreen() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else {
            video.webkitEnterFullscreen();
        }
    }

    video.addEventListener("dblclick", handleDoubleTap);

    function handleDoubleTap(event) {
        var currentTime = video.currentTime;
        var clientX = event.clientX || (event.touches && event.touches[0].clientX);

        if (clientX < window.innerWidth / 2) {
            // Rewind 15 seconds
            video.currentTime = currentTime - seekDuration;
        } else {
            // Forward 15 seconds
            video.currentTime = currentTime + seekDuration;
        }
    }

    var touchStartTimestamp = 0;

    video.addEventListener("touchstart", handleTouchStart);

    function handleTouchStart(event) {
        var currentTime = video.currentTime;

        if (event.touches.length === 1) {
            var touch = event.touches[0];

            if (touchStartTimestamp === 0) {
            touchStartTimestamp = Date.now();
            } else {
            var timeSinceLastTap = Date.now() - touchStartTimestamp;
            touchStartTimestamp = 0;

            if (timeSinceLastTap < 300) {
                if (touch.clientX < window.innerWidth / 2) {
                // Rewind 15 seconds
                video.currentTime = currentTime - seekDuration;
                } else {
                // Forward 15 seconds
                video.currentTime = currentTime + seekDuration;
                }
            }
            }
        }
    }

    // 바로 시작
    video.play();
});
const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const playPauseBtn = wrapper.querySelector(".play-pause");
const prevBtn = wrapper.querySelector("#prev");
const nextBtn = wrapper.querySelector("#next");
const mainAudio = wrapper.querySelector("#main-audio");
const progressArea = wrapper.querySelector(".progress-area");
const progressBar = wrapper.querySelector(".progress-bar");
const moreMusicBtn = wrapper.querySelector("#more-music");
const closemoreMusic = wrapper.querySelector("#close");
const musicList = wrapper.querySelector(".music-list")
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
let isMusicPaused = true;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
});

//show music list onclick of music icon
moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});
///
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `./public/images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `./public/songs/${allMusic[indexNumb - 1].src}.mp3`;

}

//Play music function
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

function prevMusic() {
    musicIndex--;//decrement of music index by 1
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex - 1
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}
function nextMusic() {
    musicIndex++;//increment of music index by 1
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex + 1
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}


//PLAY OR PAUSE BUTTON EVENT
playPauseBtn.addEventListener("click", () => {

    const isMusicPlay = wrapper.classList.contains("paused");
    //if isplaymusic is true then call pausemusic else call playmusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong()
});


prevBtn.addEventListener("click", () => {
    prevMusic();
});

nextBtn.addEventListener('click', () => {
    nextMusic();
});

mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let Width = (currentTime / duration) * 100;
    progressBar.style.width = Width + "%";
    let musicCurrentTime = wrapper.querySelector(".current-time");
    musicDuration = wrapper.querySelector(".max-duration");
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
        totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
    // mainAudio.addEventListener("loadeddata", () => {
    //     console.log("data loaded")
    //     console.log("phase-2")
    //     let mainAdDuration = mainAudio.duration;
    //     let totalMin = Math.floor(mainAdDuration / 60);
    //     let totalSec = Math.floor(mainAdDuration % 60);
    //     if (totalSec < 10) {
    //         totalSec = `0${totalSec}`;
    //     }
    //     musicDuration.innerText = `${totalMin}:${totalSec}`;
    // });
})


progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth//getting width of progress bar
    console.log(progressWidth)
    let clickedOffsetX = e.offsetX//getting offset x value
    console.log(clickedOffsetX)
    let songDuration = mainAudio.duration;//getting song total duration
    console.log(songDuration)
    let clickedOffsetY = e.offsetY//getting offset x value
    console.log(clickedOffsetY)
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration

})

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {

    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "song looped");

            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle"
            repeatBtn.setAttribute = ("title", "Playback Shuffled");
            count = false;
            break;
        // case "shuffle":
        //     repeatBtn.innerText = "repeat";
        //     repeatBtn.setAttribute("title", "song looped");
        //     break;

        // case "shuffle" && count:
        //     repeatBtn.innerText = "repeat_one";
        //     repeatBtn.setAttribute("title", "song looped");
        //     break;



    }
})

mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            nextMusic()//calling next music function
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic()
            break;

        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1)
            }
            while (musicIndex == randIndex);
            loadMusic(musicIndex);
            playMusic();
            break;
    }



})




moreMusicBtn.addEventListener("click", () => {
    musicList.classList.add("show");
});

closemoreMusic.addEventListener("click", () => {
    musicList.classList.remove("show");
})
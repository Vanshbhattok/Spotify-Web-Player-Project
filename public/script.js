console.log('Writing JavaScript now');
let currentSong = new Audio();
let songs = [];
let currFolder = "";

const CLOUDINARY_BASE = "https://res.cloudinary.com/dd4repvz4";
const META_URL = `${CLOUDINARY_BASE}/raw/upload/v1751231016/meta_aaxemd.json`;
const COVER_META_URL = `${CLOUDINARY_BASE}/raw/upload/v1751234731/covers_meta_etoibl.json`;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getSongs(folder) {
    currFolder = folder;
    try {
        let metaRes = await fetch(META_URL);
        let meta = await metaRes.json();
        let infoUrl = meta[folder];
        if (!infoUrl) throw new Error("Info JSON not found for " + folder);

        let res = await fetch(infoUrl);
        let info = await res.json();
        songs = info.songs || [];

        let songUL = document.querySelector(".songlist ul");
        songUL.innerHTML = "";
        for (const song of songs) {
            songUL.innerHTML += `<li>
                <img class="invert" src="music.svg" alt="">
                <div class="info">
                    <div>${decodeURIComponent(song)}</div>
                    <div>${info.title || "Artist"}</div>
                </div>
                <div class="playnow"><span>Play Now</span><img class="invert" src="play.svg" alt=""></div>
            </li>`;
        }

        Array.from(document.querySelectorAll(".songlist li")).forEach(e => {
            e.addEventListener("click", () => {
                let track = e.querySelector(".info").firstElementChild.innerHTML.trim();
                playMusic(track);
            });
        });

    } catch (err) {
        console.error(`❌ Failed to load songs for folder "${folder}"`, err);
    }
}

const playMusic = (track, pause = false) => {
    const encodedFolder = encodeURIComponent(currFolder);
    const encodedTrack = encodeURIComponent(track);
    currentSong.src = `${CLOUDINARY_BASE}/video/upload/songs/${encodedFolder}/${encodedTrack}`;
    if (!pause) {
        currentSong.play();
        play.src = "pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {
    let cardContainer = document.querySelector(".cardContainer");

    try {
        let metaRes = await fetch(META_URL);
        let meta = await metaRes.json();

        let coverRes = await fetch(COVER_META_URL);
        let covers = await coverRes.json();

        for (let folder in meta) {
            let infoUrl = meta[folder];
            let coverUrl = covers[folder];

            try {
                let metaData = await (await fetch(infoUrl)).json();
                cardContainer.innerHTML += `
                    <div data-folder="${folder}" class="card">
                        <div class="play">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M5 20V4L19 12L5 20Z" fill="#000" stroke="#141B34" stroke-width="1.5" />
                            </svg>
                        </div>
                        <img src="${coverUrl}" alt="">
                        <h2>${metaData.title}</h2>
                        <p>${metaData.description}</p>
                    </div>`;
            } catch (e) {
                console.warn(`⚠️ Skipping folder ${folder} due to missing info.json`);
            }
        }

        document.querySelectorAll(".card").forEach(card => {
            card.addEventListener("click", async () => {
                await getSongs(card.dataset.folder);
                playMusic(songs[0]); // autoplay first song
            });
        });
    } catch (err) {
        console.error("Failed to load metadata or covers", err);
    }
}

async function main() {
    await getSongs("BestOnes");
    playMusic(songs[0], true);
    await displayAlbums();

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        } else {
            currentSong.pause();
            play.src = "play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    previous.addEventListener("click", () => {
        let currentTrack = decodeURIComponent(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentTrack);
        if (index <= 0) {
            playMusic(songs[songs.length - 1]);
        } else {
            playMusic(songs[index - 1]);
        }
    });

    next.addEventListener("click", () => {
        let currentTrack = decodeURIComponent(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentTrack);
        if (index === -1 || index === songs.length - 1) {
            playMusic(songs[0]);
        } else {
            playMusic(songs[index + 1]);
        }
    });

    document.querySelector(".range input").addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
    });

    document.querySelector(".volume > img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = 0.5;
            document.querySelector(".range input").value = 50;
        }
    });

    // 🔁 Autoplay next song when one ends
    currentSong.addEventListener("ended", () => {
        let currentTrack = decodeURIComponent(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentTrack);
        if (index === -1 || index === songs.length - 1) {
            playMusic(songs[0]); // loop to first
        } else {
            playMusic(songs[index + 1]); // next
        }
    });
}

main();


console.log('Writing java script now');
let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder){
    currFolder = folder;
        let a = await fetch(`http://127.0.0.1:3000/${folder}/`);
        let response = await a.text();
        console.log(response);
        let div = document.createElement("div");
        div.innerHTML = response;
        let as = div.getElementsByTagName("a");
        songs = [];
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if(element.href.endsWith(".mp3")){
                songs.push(element.href.split(`/${folder}/`)[1]);
            }
        }
    //Showing all the songs in the playlist.
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                <img class="invert" src="music.svg" alt="">
                <div class="info">
                  <div> ${song.replaceAll("%20", " ")}</div>
                  <div>Harry</div>
                </div>
                <div class="playnow">
                  <span>Play Now
                  </span>
                  
                    <img class="invert" src="play.svg" alt="">
                </div>
               
    </li>`
    } 
    //Attach an event listener
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    }
)
       
}

const playMusic = (track, pause=false) => {
    //let audio = new Audio("/songs/" + track)
    currentSong.src = `/${currFolder}/` + track
    if(!pause){
            currentSong.play()
            play.src = "pause.svg"
    }
   
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

    
}

async function displayAlbums(){
     let a = await fetch(`http://127.0.0.1:3000/songs/`);
        let response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let anchors = div.getElementsByTagName("a")
        let cardContainer = document.querySelector(".cardContainer")
        let array = Array.from(anchors)
            for (let index = 0; index < array.length; index++) {
                const e = array[index];
                
            
            if(e.href.includes("/songs")){
                let folder = e.href.split("/").slice(-2)[0]
                //get metadata of folder:
        let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`);
        let response = await a.json();
        console.log(response)
        cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
              <div class="play">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://
                           www.w3.org/2000/svg">
                          <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                           stroke-linejoin="round"/>
                          </svg>
                        
                  </div>
              <img src="/songs/${folder}/cover.jpg/" alt="">
              <h2>${response.title}</h2>
              <p>${response.description}</p>

              
            </div>`
            }
        }

           //Loding the playlist:
   Array.from(document.getElementsByClassName("card")).forEach(e=>{
    e.addEventListener("click", async item=>{
        songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        
    })
   })
}

async function main(){
    
    //getting list of all the songs
        await getSongs("songs/BestOne's")
        playMusic(songs[0], true)
        
    //displaying all the albums
    displayAlbums()

//Attack e.listener to play, next and previous
play.addEventListener("click", ()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src = "pause.svg"
    }else{
        currentSong.pause()
        play.src = "play.svg"
    }
})

//timeupdate event:
currentSong.addEventListener("timeupdate", ()=>{
    document.querySelector(".songtime").innerHTML = 
    `${secondsToMinutesSeconds(currentSong.currentTime)}
    / ${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime/ currentSong.duration) * 100 + "%";
})
   //Eventlisterner added to seekbar now:
   document.querySelector(".seekbar").addEventListener("click", e=>{
    let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration) *percent)/100;
   })

   //Adding event listener for hamburger
   document.querySelector(".hamburger").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "0"
   })

   //close button:
   document.querySelector(".close").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "-120%"
   })

   //previous:
   previous.addEventListener("click", ()=>{
    console.log("Previous Clicked")
    console.log(currentSong)
    
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    
   if((index - 1) >= 0){
    playMusic(songs[index-1])
   }

   })
   //Next:
   next.addEventListener("click", ()=>{
    console.log("Next Clicked")

    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    
   if((index + 1) <= songs.length-1){
    playMusic(songs[index+1])
   }
   })

   //Volume
   document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
    console.log("Setting Volume at", e.target.value, "/ 100")
    currentSong.volume = parseInt(e.target.value)/100
   })

   //Event for muting the track:
   document.querySelector(".volume>img").addEventListener("click", e=>{
    if(e.target.src.includes("volume.svg")){
        e.target.src = e.target.src.replace("volume.svg", "mute.svg")
        currentSong.volume = 0;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 0
    }else{
         e.target.src = e.target.src.replace("mute.svg", "volume.svg")
        currentSong.volume = 0.50;
                document.querySelector(".range").getElementsByTagName("input")[0].value = 50

    }
   })


}
main()

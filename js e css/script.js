const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const cover = document.getElementById('cover');
const song = document.getElementById('audio');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

const hearMeNow = {
    songName: 'Hear Me Now',
    artist: 'Boyce Avenue',
    music: 'hear_me_now',
    file: 'boyce_avenue',
    liked: false,
};

const allCaps = {
    songName: 'ALL CAPS',
    artist: 'Llunr',
    music: 'all_caps',
    file: 'llunr',
    liked: false,
};

const hymnForHer = {
    songName: 'Hymn For Her',
    artist: 'Ames',
    music: 'hymn_for_her',
    file: 'ames',
    liked: false,
};

const loveYouLikeTheMovies = {
    songName: 'Love You Like The Movies',
    artist: 'Anthem Lights',
    music: 'love_you_like_the_movies',
    file: 'anthem',
    liked: false,
};

const twnetySevenThousand = {
    songName: '27,000 Days',
    artist: 'Casey Lowry',
    music: '27000_days',
    file: 'casey',
    liked: false,
};

const pare = {
    songName: 'Stop',
    artist: 'Anthony Ramos',
    music: 'stop',
    file: 'anthony',
    liked: false,
};

const somethingBoutThatFeeling = {
    songName: 'Something Bout That Feeling',
    artist: 'Devin Kennedy',
    music: 'something_bout_that_feeling',
    file: 'devin',
    liked: false,
};

const hairTossArmsCrossed = {
    songName: 'Hair Toss, Arms Crossed',
    artist: 'Mark Ambor',
    music: 'hair_toss_arms_crossed',
    file: 'mark',
    liked: false,
};

const maryOnACross = {
    songName: 'Mary On A Cross',
    artist: 'Ghost',
    music: 'mary_on_a_cross',
    file: 'ghost',
    liked: false,
};

const littleBird = {
    songName: 'Little Bird',
    artist: 'Jasmine Cephas-Jones',
    music: 'little_bird',
    file: 'jasmine',
    liked: false,
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const playlist = JSON.parse(localStorage.getItem('playlist')) ?? [hearMeNow, allCaps, hymnForHer, loveYouLikeTheMovies, twnetySevenThousand, pare, somethingBoutThatFeeling, hairTossArmsCrossed, maryOnACross, littleBird];
let sortedPlaylist = [...playlist];
let index = 0; 

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    } else{
        playSong();
    }
}

function likeButtonRender(){
    if(sortedPlaylist[index].liked === true){
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    } else{
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }

}

function initializeSong(){
    cover.src = `imagens/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].music}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}

function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length - 1;
    } else{
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong(){
    if(index === sortedPlaylist.length - 1){
        index = 0;
    } else{
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgress(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}
function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)*song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleAray){
    const size = preShuffleAray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleAray[currentIndex];
        preShuffleAray[currentIndex] = preShuffleAray[randomIndex];
        preShuffleAray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleSongs(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    } else{
        isShuffled = false;
        sortedPlaylist = [...playlist];
        shuffleButton.classList.remove('button-active');
    }
}

function repeatSong(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    } else{
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat(){
    if(repeatOn === false){
        nextSong();
    } else{
        playSong();
    }
}

function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - (hours * 3600)) / 60);
    let secs = Math.floor(originalNumber - (hours * 3600) - (min * 60));

    return `${hours !== 0 ? hours.toString().padStart(2, '0') + ":" : ""}${min
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime(){
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked(){
    if(sortedPlaylist[index].liked === false){
        sortedPlaylist[index].liked = true;
    } else{
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(playlist));
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleSongs);
repeatButton.addEventListener('click', repeatSong);
likeButton.addEventListener('click', likeButtonClicked);

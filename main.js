import viet from './assets/json/Viet.json' assert {type: 'json'};
import ngoai from './assets/json/US-UK.json' assert {type: 'json'};
        alert(1)

const VIE= Object.values(viet)
const USUK = Object.values(ngoai)
const selectType = document.querySelector(".choice")
const cover = document.querySelector(".cover")
const choiceTable = document.querySelector(".choice-table")
const pre = document.querySelector(".fa-backward-step")
const start = document.querySelector(".fa-circle-play")
const pause = document.querySelector(".fa-circle-pause")
const next = document.querySelector(".fa-forward-step")
const repeat = document.querySelector(".fa-repeat")
const random = document.querySelector(".fa-shuffle")
var cdName = document.querySelector(".cd-name")
var cdThumb = document.querySelector(".cd-thumb")
var cdSinger = document.querySelector(".cd-singer")
var cdAudio = document.querySelector("audio")
const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
    duration: 10000, // 10 seconds
    iterations: Infinity
  });
var currentPlaylist
cdThumbAnimate.pause()

const app = {
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    current: 0,
    choose: false,
    render: function (arr) {
        if (app.choose) {
            cdName.innerHTML = "Song Name"
            cdThumb.style.backgroundImage = `url(/assets/img/default.jpg)`
            cdSinger.innerHTML = "Singer"
            cdAudio.src = " "
            cdThumbAnimate.pause()
        }
        var html = arr[0].map(function(song,i) {
            return `<div class="playlist-bar song">
            <div class="playlist-content number">${i+1}</div>
            <div class="playlist-content songs">${song.name}</div>
            <div class="playlist-content singer">${song.singer}</div>
            </div>`
        })
        document.querySelector(".playlist-list").innerHTML = html.join(" ")
    },
    //Chon bai hat
    preStart: function() {
        selectType.onclick = function () {
            cover.style.display = 'flex'
        }
        cover.onclick = function () {
                if (app.choose == true) {
                cover.style.display = 'none'
            }
        }
        choiceTable.onclick = function (e) {
            e.stopPropagation()
        }
        document.querySelector('.type.viet').onclick = function () {
            app.render(VIE)
            app.choose = true
            cover.style.display = 'none'
            app.chooseSong(VIE)
            currentPlaylist = VIE
        }
        document.querySelector('.type.USUK').onclick = function () {
            app.render(USUK)
            app.choose = true
            cover.style.display = 'none'
            app.chooseSong(USUK)
            currentPlaylist = USUK
        }
    },
    playSong: function() {
        start.style.display = "none"
        pause.style.display = "unset"
        this.isPlaying = true
        cdAudio.play()
        cdThumbAnimate.play()
    },
    pauseSong: function() {
        pause.style.display = "none"
        start.style.display = "unset"
        this.isPlaying = false
        cdAudio.pause()
        cdThumbAnimate.pause()
    },
    chooseSong: function (arr) {
        var songs = document.querySelectorAll(".song")
        var cdName = document.querySelector(".cd-name")
        var cdThumb = document.querySelector(".cd-thumb")
        var cdSinger = document.querySelector(".cd-singer")
        var cdAudio = document.querySelector("audio")
        for ( let i = 0 ; i < songs.length ; ++i) {
            songs[i].onclick = () => {
            songs[this.current].classList.remove("active")
            songs[i].classList.add("active")
            this.current = i
            cdName.innerHTML = arr[0][i].name
            cdThumb.style.backgroundImage = `url(${arr[0][i].img})`
            cdSinger.innerHTML = arr[0][i].singer
            cdAudio.src = arr[0][i].path
            this.playSong()
            }
        }
    },
    eventHandle: function () {
        //Nút chế độ phát  
    repeat.onclick = () => {
        if (this.isRepeat == true) {
            this.isRepeat = false
            repeat.classList.remove("active-btn")
        } else {
            repeat.classList.add("active-btn")
            random.classList.remove("active-btn")
            this.isRepeat = true
            this.isRandom = false
        }
        
    }
    random.onclick = () => {
        if (this.isRandom == true) {
            this.isRandom = false
            random.classList.remove("active-btn")
        } else {
            random.classList.add("active-btn")
            repeat.classList.remove("active-btn")
            this.isRandom = true
            this.isRepeat = false
        }
    }

        //Nút phát
    start.onclick = () => {
        this.playSong()
    }
    pause.onclick = () => {
        this.pauseSong()
    }
    pre.onclick = () => {
        var songs = document.querySelectorAll(".song")
        songs[this.current].classList.remove("active")
        this.current--
        if (this.current < 0) this.current = songs.length -1
        songs[this.current].classList.add("active")
        cdName.innerHTML = currentPlaylist[0][this.current].name
        cdThumb.style.backgroundImage = `url(${currentPlaylist[0][this.current].img})`
        cdSinger.innerHTML = currentPlaylist[0][this.current].singer
        cdAudio.src = currentPlaylist[0][this.current].path
        this.playSong()
    }
    next.onclick = () => {
        var songs = document.querySelectorAll(".song")
        songs[this.current].classList.remove("active")
        if (!this.isRandom && !this.isRepeat) {
            this.current++
            if (this.current == songs.length) this.current = 0
            songs[this.current].classList.add("active")
            cdName.innerHTML = currentPlaylist[0][this.current].name
            cdThumb.style.backgroundImage = `url(${currentPlaylist[0][this.current].img})`
            cdSinger.innerHTML = currentPlaylist[0][this.current].singer
            cdAudio.src = currentPlaylist[0][this.current].path
            var playingSong = document.querySelector(".active")
            playingSong.scrollIntoView({ behavior: "smooth", block: "center" })
        }
        if (this.isRandom) {
            do {
                var ran = Math.floor(Math.random() * (songs.length-1 - 0 + 1)) + 0
            } while (ran == this.current )
            this.current = ran
            songs[this.current].classList.add("active")
            cdName.innerHTML = currentPlaylist[0][this.current].name
            cdThumb.style.backgroundImage = `url(${currentPlaylist[0][this.current].img})`
            cdSinger.innerHTML = currentPlaylist[0][this.current].singer
            cdAudio.src = currentPlaylist[0][this.current].path
        }
        if (this.isRepeat) {
            songs[this.current].classList.add("active")
            cdName.innerHTML = currentPlaylist[0][this.current].name
            cdThumb.style.backgroundImage = `url(${currentPlaylist[0][this.current].img})`
            cdSinger.innerHTML = currentPlaylist[0][this.current].singer
            cdAudio.src = currentPlaylist[0][this.current].path
        }
        this.playSong()
    }

        //Âm lượng
    const volume = document.querySelector(".volume-bar") 
    var volumeHigh = document.querySelector(".fa-volume-high")
    var mute = document.querySelector(".fa-volume-xmark")
    volumeHigh.onclick = () => {volume.value = 0; volumeHigh.style.display = "none"; mute.style.display = "unset"; cdAudio.volume = volume.value/100}
    mute.onclick = () => {volume.value = 100; mute.style.display = "none"; volumeHigh.style.display = "unset"; cdAudio.volume = volume.value/100}
    volume.onclick = () => {cdAudio.volume = volume.value/100}
        
    //Thanh nhạc
    const audioBar = document.querySelector(".audio-bar")
    const now = document.querySelector(".now")
    const full = document.querySelector(".full")
    var isMouseDown
    audioBar.onclick = () => {
        cdAudio.currentTime = audioBar.value*(cdAudio.duration) / 100
    }
    audioBar.addEventListener("mousedown", function(){
        isMouseDown = true
    })
    audioBar.addEventListener("mouseup", function(){
        isMouseDown = false
    })
    audioBar.addEventListener("input", function () {
        cdAudio.currentTime = (audioBar.value * cdAudio.duration) / 100;
    });
    cdAudio.ontimeupdate = () => {
        if (!isMouseDown) {
            if(cdAudio.currentTime) {
                audioBar.value = (cdAudio.currentTime)*100/cdAudio.duration
            } else {
                audioBar.value = 0
            }
            function formatNumber(number) {
                if (isNaN(number)) return "00";
                return number < 10 ? '0' + number : number;
            }
            now.innerHTML = `${formatNumber(Math.floor(cdAudio.currentTime/60))}:${formatNumber(Math.floor(cdAudio.currentTime % 60))}`
            full.innerHTML = `${formatNumber(Math.floor(cdAudio.duration/60))}:${formatNumber(Math.floor(cdAudio.duration%60))}`
        }
        if ((cdAudio.currentTime == cdAudio.duration) && (!isMouseDown)) {
            setTimeout(function(){
                next.click()},1000)
        }
    }
    },

    //Bắt đầu
    start: function () {
        this.preStart()
        this.eventHandle()
    },
}
app.start();

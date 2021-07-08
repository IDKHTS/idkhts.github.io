let audio = document.querySelector('#audio')
let songName = document.querySelector('#songName')
let progeres = document.querySelector('#progress')
let timeDom = document.querySelector('#time')
let play = document.querySelector('#play')
let stop = document.querySelector('#stop')
let list = document.querySelector('#musics-list')
let isFirst = true
let songList = []
let currSong = {
    songName: '',
    src: '',
    total: 0,
    current: 0,
    interval: null,
    index: 0,
    _index: 0,
}
Object.defineProperty(currSong, 'index', {
    set: function (val) {
        let len = songList.length
        if (val >= len) return
        this._index = val
        this.songName = songList[val].name
        audio.src = songList[val].src
    },
    get: function () {
        return this._index
    },
})

audio.oncanplay = function () {
    currSong.total = audio.duration
    handleTime()
    handleSongMsg()
    if (isFirst) {
        isFirst = !isFirst
    } else {
        onSetStatus('play')
    }
}
// audio.ended = function () {
//     console.log('end')
// }
function dateFormat(number) {
    let date = new Date(number)
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return minute + ':' + second
}

// 获取歌曲列表
function getSongList() {
    for (item of list.children) {
        songList.push({ src: item.dataset.src, name: item.dataset.name })
    }
    console.log(songList)
}
getSongList()

function handleSongName() {
    songName.textContent = currSong.songName
}
function handleTime() {
    let total = dateFormat(currSong.total * 1000)
    let now = dateFormat(currSong.current * 1000)
    timeDom.textContent = `${total}/${now}`
}
function handleProgress() {
    let { total, current } = currSong
    let value = Math.ceil((current / total) * 100)
    progeres.value = value
}
function handleSongMsg() {
    clearInterval(currSong.interval)
    currSong.total = audio.duration
    if (audio.paused) return
    currSong.interval = setInterval(() => {
        currSong.current = audio.currentTime
        handleTime()
        handleProgress()
        if (currSong.current >= currSong.total) onNextSong()
    }, 1000)
}

function onSetStatus(status) {
    if (status == 'play') {
        play.style.display = 'none'
        stop.style.display = 'unset'
        audio.play()
        handleSongMsg()
    } else {
        play.style.display = 'unset'
        stop.style.display = 'none'
        audio.pause()
        clearInterval(currSong.interval)
    }
}
function onNextSong() {
    let len = songList.length
    startPlay((currSong.index = (currSong.index + 1) % len))
}
function onPreSong() {
    let len = songList.length
    startPlay((currSong.index + 1) % len)
}

function onClickSong(i) {
    const set = songList[i]
    console.log(set)
    startPlay(i)
}
function startPlay(i) {
    currSong.index = i
    handleSongName()
}
// list.addEventListener('click', (e) => {
//     console.log(e)
//     const set = e.target.dataset
//     console.log(set)
//     audio.src = set.src
//     currSong.songName = set.name
//     handleSongName()
// })

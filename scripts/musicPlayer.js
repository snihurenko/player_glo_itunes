export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    const loadTRack = () => {
        const isPlayed = audioPlayer.paused;    //текущее значение
        const track = playlist[trackIndex];

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed){
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1){
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTRack();
    };

    const prevTrack = () => {
        if (trackIndex !== 0){
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1    
        }
        loadTRack();
    };

    const addZero = n => n < 10 ? '0' + n : n;  

    audioNavigation.addEventListener('click', event => {    //делегирование через евент
        const target = event.target;

        if (target.classList.contains('audio-button__play')){
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused){
                audioPlayer.play()
            } else {
                audioPlayer.pause()
            }

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')){
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')){
            nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    //бегунок прогресса песни
    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%'
        
        const minutesPassed = Math.floor(currentTime / 60) || '0';      // 0 при переключении трека
        const secondsPassed = Math.floor(currentTime % 60) || '0';     //остаток от минут

        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;    //координата от крайней левой точки
        const allWidth = audioProgress.clientWidth;     //размер сейчас на странице
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    })

};
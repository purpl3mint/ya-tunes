import { formattedTime } from './common.js';

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoVolumeIcon = document.querySelector('.video-icon-volume');
    const videoFullScreen = document.querySelector('.video-fullscreen');

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const togglePlay = () => {
        videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();

        toggleIcon();
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    const volumeIconCheck = () => {
        if (videoVolume.value < 50) {
            videoVolumeIcon.classList.add('fa-volume-down');
            videoVolumeIcon.classList.remove('fa-volume-up');
        } else {
            videoVolumeIcon.classList.remove('fa-volume-down');
            videoVolumeIcon.classList.add('fa-volume-up');
        }
    }


    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutesPassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minutesTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = formattedTime(minutesPassed, secondsPassed);
        videoTimeTotal.textContent = formattedTime(minutesTotal, secondsTotal);
    });

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;

        volumeIconCheck();
    });

    videoPlayer.volume = 0.5;
    videoVolume.value = videoPlayer.volume * 100;
    volumeIconCheck();

    videoFullScreen.addEventListener('click', () => {
        if (!videoPlayer.fullScreenElement)
            videoPlayer.requestFullscreen().catch(err => console.err(err));
        else
            videoPlayer.exitFullScreen();
    });

    videoPlayerInit.stop = () => {
        if (!videoPlayer.paused) {
            stopPlay();
        }
    };
};
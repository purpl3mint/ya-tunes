export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');
    const radioVolumeIcon = document.querySelector('.radio-icon-volume');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;


    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }

    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    const volumeIconCheck = () => {
        if (radioVolume.value < 50) {
            radioVolumeIcon.classList.add('fa-volume-down');
            radioVolumeIcon.classList.remove('fa-volume-up');
        } else {
            radioVolumeIcon.classList.remove('fa-volume-down');
            radioVolumeIcon.classList.add('fa-volume-up');
        }
    }

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');

        selectItem(parent);

        const title = parent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const img = parent.querySelector('.radio-img').src;
        radioCoverImg.src = img;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });


    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }

        changeIconPlay();
    });

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;

        volumeIconCheck();
    });

    audio.volume = 0.5;
    radioVolume.value = audio.volume * 100;
    volumeIconCheck();

    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    }
};
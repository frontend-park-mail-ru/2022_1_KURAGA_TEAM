import playerTemplate from './player.pug';
import BaseViewClass from "../baseView/baseViewClass";
import LoaderViewClass from "../loaderView/loaderViewClass";
import { routes } from "Routing/constRouting";
import MovieModel from "../../models/Movie.js"
import router from "Routing/router";
import handlerLink from "Utils/handlerLink";

import '../../css/player.scss';

export default class PlayerViewClass extends BaseViewClass {
    #movie;
    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const id = +/\d+/.exec(window.location.pathname);

            const check = window.location.pathname.indexOf('trailer');

            const { movBody } = await MovieModel.getMovie(id);
            const movData = await Promise.resolve(movBody);
            if (movData.status === routes.ERROR) {
                router.go(routes.ERROR_VIEW);
                return;
            }
            this.#movie = new MovieModel(movData);


            let video = this.#movie.video;
            if (check !== -1) {
                video = this.#movie.trailer;
            }

            super.render(playerTemplate, {
                video,
            });

            handlerLink()
            this.setHandler();
        } catch (err) {
            console.error(err);
        }
    }

    setHandler() {
        const videoContainer = document.querySelector('.video-container');
        const video = document.querySelector('.player');
        video.play();

        const controlsContainers = document.querySelector('.controls-container');
        const exit = document.querySelector('.exit');

        const playPauseButton = document.querySelector('.play-pause');
        const play = playPauseButton.querySelector('.play__svg');
        const pause = playPauseButton.querySelector('.pause__svg');

        if (window.screen.width <= 700) {
            play.style.display = '';
            pause.style.display = 'none';
        } else {
            play.style.display = 'none';
            pause.style.display = '';
        }


        const rewindButton = document.querySelector('.rewind');
        const forwardButton = document.querySelector('.forward');

        const volumeButton = document.querySelector('.volume');
        const volumeFull = volumeButton.querySelector('.volume-full__svg');
        const volumeMute = volumeButton.querySelector('.volume-mute__svg');
        volumeMute.style.display = 'none';
        volumeFull.style.display = '';

        const fullScreenButton = document.querySelector('.full');
        const fullSize = fullScreenButton.querySelector('.full__svg');
        const minSize = fullScreenButton.querySelector('.min__svg');
        minSize.style.display = 'none';
        fullSize.style.display = '';

        const progressTime = document.querySelector('.progress-time');
        const progressBar = document.querySelector('.progress-bar');
        const watchBar = document.querySelector('.watched-bar');
        watchBar.style.width = '0';

        let displayTime;

        const displayControls = () => {
            controlsContainers.style.opacity = '1';
            exit.style.opacity = '1';
            document.body.style.cursor = 'initial';

            if (displayTime) {
                clearTimeout(displayTime);
            }

            displayTime = setTimeout(() => {
                controlsContainers.style.opacity = '0';
                exit.style.opacity = '0';
                document.body.style.cursor = 'none';
            }, 5000);
        }

        displayControls();

        const playPause = () => {
            if (video.paused) {
                video.play();
                play.style.display = 'none';
                pause.style.display = '';

                return;
            }

            video.pause();
            play.style.display = '';
            pause.style.display = 'none';
        }

        const forward = () => {
            video.currentTime += 10;
        }

        const rewind = () => {
            video.currentTime -= 10;
        }

        video.addEventListener('timeupdate', () => {
            watchBar.style.width = ((video.currentTime / video.duration) * 100) + '%';

            const totalSecondsRemaining = video.duration - video.currentTime;
            const hoursRemaining = Math.floor(totalSecondsRemaining / 3600);
            const minutesRemaining = Math.floor(totalSecondsRemaining / 60);
            const secondsRemaining = Math.floor(totalSecondsRemaining - minutesRemaining * 60);

            progressTime.textContent =
                `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
        });

        progressBar.addEventListener('click', (e) => {
           const pos = (e.pageX - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;

           video.currentTime = pos * video.duration;
        });

        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                minSize.style.display = 'none';
                fullSize.style.display = '';

                return;
            }

            minSize.style.display = '';
            fullSize.style.display = 'none';
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();

                playPause();
            }

            if (e.code === 'ArrowRight') {
                forward();
            }

            if (e.code === 'ArrowLeft') {
                rewind();
            }

            displayControls();
        });

        document.addEventListener('pointermove', () => {
            displayControls();
        });

        document.addEventListener('touchstart', () => {
            displayControls();
        })

        playPauseButton.addEventListener('click', playPause);

        rewindButton.addEventListener('click', rewind);

        forwardButton.addEventListener('click', forward);

        volumeButton.addEventListener('click', () => {
            if (video.muted) {
                volumeFull.style.display = '';
                volumeMute.style.display = 'none';
            } else {
                volumeFull.style.display = 'none';
                volumeMute.style.display = '';
            }

            video.muted = !video.muted;
        });

        fullScreenButton.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                videoContainer.requestFullscreen();

                return;
            }

            document.exitFullscreen();
        });
    }
}
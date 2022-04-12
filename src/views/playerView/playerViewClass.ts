import playerTemplate from './player.pug';
import BaseViewClass from "../baseView/baseViewClass";
import LoaderViewClass from "../loaderView/loaderViewClass";
import { routes } from "Routing/constRouting";
import MovieModel from "../../models/Movie.js"
import router from "Routing/router";
import handlerLink from "Utils/handlerLink";

import './player.scss';

export default class PlayerViewClass extends BaseViewClass {
    private movie: MovieModel;

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const idx = +/\d+/.exec(window.location.pathname);

            const check = window.location.pathname.indexOf('trailer');

            const { movBody } = await MovieModel.getMovie(idx);
            const movData = await Promise.resolve(movBody);

            if (movData.status === routes.ERROR) {
                router.go(routes.ERROR_VIEW);
                return;
            }
            this.movie = new MovieModel(movData);

            let video = this.movie.video;
            if (check !== -1) {
                video = this.movie.trailer;
            }

            super.render(playerTemplate, {
                id: this.movie.id,
                video,
            });

            handlerLink()
            this.setHandler();
        } catch {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    setHandler() {
        const videoContainer = document.querySelector('.video-container');
        const video: HTMLVideoElement = document.querySelector('.player');
        video.play();

        const noVideo: HTMLDivElement = document.querySelector('.novideo');

        const controlsContainers: HTMLDivElement = document.querySelector('.controls-container');
        const exit: HTMLAnchorElement = document.querySelector('.exit');

        const playPauseButton = document.querySelector('.play-pause');
        const play: SVGElement = playPauseButton.querySelector('.play__svg');
        const pause: SVGElement = playPauseButton.querySelector('.pause__svg');

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
        const volumeFull: SVGElement = volumeButton.querySelector('.volume-full__svg');
        const volumeMute: SVGElement = volumeButton.querySelector('.volume-mute__svg');
        volumeMute.style.display = 'none';
        volumeFull.style.display = '';

        const fullScreenButton = document.querySelector('.full');
        const fullSize: SVGElement = fullScreenButton.querySelector('.full__svg');
        const minSize: SVGElement = fullScreenButton.querySelector('.min__svg');
        minSize.style.display = 'none';
        fullSize.style.display = '';

        const progressTime = document.querySelector('.progress-time');
        const progressBar: HTMLDivElement = document.querySelector('.progress-bar');
        const watchBar: HTMLDivElement = document.querySelector('.watched-bar');
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

            if (isNaN(totalSecondsRemaining)) {
                noVideo.style.display = 'flex';

                progressTime.textContent = '00:00:00';

                return;
            }

            progressTime.textContent =
                `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
        });

        progressBar.addEventListener('click', (e: any) => {
           // @ts-ignore
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

        document.addEventListener('touchend', () => {
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
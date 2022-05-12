import playerTemplate from "./player.pug";
import BaseViewClass from "../baseView/baseViewClass";
import LoaderViewClass from "../loaderView/loaderViewClass";
import { routes } from "Routing/constRouting";
import MovieModel from "../../models/Movie";
import UserModel from "../../models/User";
import router from "Routing/router";
import handlerLink from "Utils/handlerLink";

import "./player.scss";

export default class PlayerViewClass extends BaseViewClass {
    private movie: MovieModel;
    private static click: boolean;
    private static displayTime: any;

    constructor() {
        super();

        PlayerViewClass.click = false;
        PlayerViewClass.displayTime = 0;
    }

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const idx = +/\d+/.exec(window.location.pathname);

            const check = window.location.pathname.indexOf("trailer");

            const {user} = await UserModel.auth();
            if (!user) {
                router.go(routes.LOGIN_VIEW);
                return;
            }

            const {movie} = await MovieModel.getMovie(idx);
            this.movie = new MovieModel(movie);



            let video = this.movie.trailer;
            if (check === -1) {
                if (!this.movie.movieData.is_movie) {
                    const arrPath = window.location.pathname.split('/');
                    const numberSeas = +/\d+/.exec(arrPath[3]) - 1;
                    const numberEpis = +/\d+/.exec(arrPath[4]) - 1;

                    video = this.movie.data.season[numberSeas].episodes[numberEpis].video
                    super.render(playerTemplate, {
                        trailer: false,
                        id: this.movie.id,
                        video,
                        episodes: this.movie.data.season[numberSeas].episodes,
                        season: numberSeas + 1,
                        episode: numberEpis + 1,
                    });
                } else {
                    video = this.movie.video;

                    super.render(playerTemplate, {
                        trailer: false,
                        is_movie: this.movie.movieData.is_movie,
                        id: this.movie.id,
                        video,
                    });
                }
            } else {
                super.render(playerTemplate, {
                    trailer: true,
                    id: this.movie.id,
                    video,
                });
            }

            handlerLink();
            this.setHandler();
        } catch {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    setHandler() {
        const series: HTMLButtonElement = document.querySelector('.series');
        series.style.display = 'none';

        if (!window.location.pathname.match(/trailer/) && !this.movie.data.is_movie) {
            series.style.display = '';
        }

        const seriesPopUp: HTMLDivElement = document.querySelector('.series__popUp');

        const video: HTMLVideoElement = document.querySelector(".player");
        video.play();

        const playPauseButton = document.querySelector(".play-pause");
        const play: SVGElement = playPauseButton.querySelector(".play__svg");
        const pause: SVGElement = playPauseButton.querySelector(".pause__svg");
        play.style.display = "none";
        pause.style.display = "";

        if (window.screen.width <= 700) {
            video.addEventListener('play', this.playStopMobile);
        }

        const rewindButton = document.querySelector(".rewind");
        const forwardButton = document.querySelector(".forward");

        const volumeButton = document.querySelector(".volume");
        const volumeFull: SVGElement =
            volumeButton.querySelector(".volume-full__svg");
        const volumeMute: SVGElement =
            volumeButton.querySelector(".volume-mute__svg");
        const volumeHalf: SVGElement =
            volumeButton.querySelector(".volume-half__svg");
        volumeMute.style.display = "none";
        volumeHalf.style.display = "none";
        volumeFull.style.display = "";

        const volumeReg: HTMLDivElement = document.querySelector('.volume__popUp');
        const volumeBar: HTMLDivElement = document.querySelector('.volume-bar');
        volumeBar.style.width = video.volume * 100 + '%';

        const fullScreenButton = document.querySelector(".full");
        const fullSize: SVGElement =
            fullScreenButton.querySelector(".full__svg");
        const minSize: SVGElement = fullScreenButton.querySelector(".min__svg");
        minSize.style.display = "none";
        fullSize.style.display = "";

        const progressBar: HTMLDivElement =
            document.querySelector(".progress-bar");
        const watchBar: HTMLDivElement = document.querySelector(".watched-bar");
        watchBar.style.width = "0";

        PlayerViewClass.displayControls();

        video.addEventListener("timeupdate", this.progressBarTime);

        progressBar.addEventListener("click", this.progressBarRewind);

        document.addEventListener("fullscreenchange", this.screenIconChange);

        document.addEventListener("keydown", this.keyEvents);

        document.addEventListener("pointermove", PlayerViewClass.displayControls);

        document.addEventListener("touchend", PlayerViewClass.displayControls);

        seriesPopUp.addEventListener("scroll", PlayerViewClass.displayControls);

        playPauseButton.addEventListener("click", PlayerViewClass.playPause);

        rewindButton.addEventListener("click", PlayerViewClass.rewind);

        forwardButton.addEventListener("click", PlayerViewClass.forward);

        volumeReg.addEventListener('click', this.volumeChange);

        volumeButton.addEventListener("click", this.volumeMute);

        fullScreenButton.addEventListener("click", this.fullScreenChange);
        document.addEventListener("dblclick", this.fullScreenChange);
    }

    volumeMute(): void {
        const video: HTMLVideoElement = document.querySelector(".player");

        const volumeBar: HTMLDivElement = document.querySelector('.volume-bar');

        const volumeButton = document.querySelector(".volume");
        const volumeFull: SVGElement =
            volumeButton.querySelector(".volume-full__svg");
        const volumeMute: SVGElement =
            volumeButton.querySelector(".volume-mute__svg");
        const volumeHalf: SVGElement =
            volumeButton.querySelector(".volume-half__svg");

        if (PlayerViewClass.click) {
            PlayerViewClass.click = false;

            return;
        }

        if (video.muted) {
            volumeBar.style.width = video.volume * 100 + '%';

            if (Number(video.volume.toFixed(2)) <= 0.35) {
                volumeFull.style.display = "none";
                volumeMute.style.display = "none";
                volumeHalf.style.display = "";
            } else {
                volumeFull.style.display = "";
                volumeMute.style.display = "none";
                volumeHalf.style.display = "none";
            }
        } else {
            volumeBar.style.width = '0';
            volumeFull.style.display = "none";
            volumeHalf.style.display = "none";
            volumeMute.style.display = "";
        }

        video.muted = !video.muted;
    }

    volumeChange(e: any): void {
        const video: HTMLVideoElement = document.querySelector(".player");

        const volumeReg: HTMLDivElement = document.querySelector('.volume__popUp');
        const volumeBar: HTMLDivElement = document.querySelector('.volume-bar');

        const volumeButton = document.querySelector(".volume");
        const volumeFull: SVGElement =
            volumeButton.querySelector(".volume-full__svg");
        const volumeMute: SVGElement =
            volumeButton.querySelector(".volume-mute__svg");
        const volumeHalf: SVGElement =
            volumeButton.querySelector(".volume-half__svg");

        PlayerViewClass.click = true;

        const pos =
            (e.pageX -
                (volumeReg.offsetLeft +
                    // @ts-ignore
                    volumeReg.offsetParent.offsetLeft)) /
            volumeReg.offsetWidth;

        video.volume = pos - 0.17;
        volumeBar.style.width = video.volume * 100 + '%';

        if (Number(video.volume.toFixed(2)) === 0) {
            volumeFull.style.display = "none";
            volumeHalf.style.display = "none";
            volumeMute.style.display = "";

            return;
        }

        if (Number(video.volume.toFixed(2)) <= 0.35) {
            volumeFull.style.display = "none";
            volumeMute.style.display = "none";
            volumeHalf.style.display = "";

            return;
        }

        volumeFull.style.display = "";
        volumeMute.style.display = "none";
        volumeHalf.style.display = "none";
    }

    static displayControls(): void {
        const controlsContainers: HTMLDivElement = document.querySelector(".controls-container");
        const video: HTMLVideoElement = document.querySelector(".player");
        const exit: HTMLAnchorElement = document.querySelector(".exit");

        controlsContainers.style.opacity = "1";
        exit.style.opacity = "1";
        video.style.cursor = "initial";

        if (this.displayTime) {
            clearTimeout(this.displayTime);
        }

        this.displayTime = setTimeout(() => {
            controlsContainers.style.opacity = "0";
            exit.style.opacity = "0";
            video.style.cursor = "none";
        }, 5000);
    }

    static playPause(): void {
        const video: HTMLVideoElement = document.querySelector(".player");
        const playPauseButton = document.querySelector(".play-pause");
        const play: SVGElement = playPauseButton.querySelector(".play__svg");
        const pause: SVGElement = playPauseButton.querySelector(".pause__svg");
        console.log(1)

        if (video.paused) {
            video.play();
            play.style.display = "none";
            pause.style.display = "";

            return;
        }

        video.pause();
        play.style.display = "";
        pause.style.display = "none";
    }

    static forward(): void {
        const video: HTMLVideoElement = document.querySelector(".player");

        video.currentTime += 10;
    }

    static rewind(): void {
        const video: HTMLVideoElement = document.querySelector(".player");

        video.currentTime -= 10;
    }

    keyEvents(e: any): any {
        if (e.code === "Space") {
            e.preventDefault();

            PlayerViewClass.playPause();
        }

        if (e.code === "ArrowRight") {
            PlayerViewClass.forward();
        }

        if (e.code === "ArrowLeft") {
            PlayerViewClass.rewind();
        }

        PlayerViewClass.displayControls();
    }

    screenIconChange(): void {
        const fullScreenButton = document.querySelector(".full");
        const fullSize: SVGElement =
            fullScreenButton.querySelector(".full__svg");
        const minSize: SVGElement = fullScreenButton.querySelector(".min__svg");

        if (!document.fullscreenElement) {
            minSize.style.display = "none";
            fullSize.style.display = "";

            return;
        }

        minSize.style.display = "";
        fullSize.style.display = "none";
    }

    progressBarRewind(e: any): void {
        const video: HTMLVideoElement = document.querySelector(".player");
        const progressBar: HTMLDivElement = document.querySelector(".progress-bar");

        const pos =
            (e.pageX -
                (progressBar.offsetLeft +
                    // @ts-ignore
                    progressBar.offsetParent.offsetLeft)) /
            progressBar.offsetWidth;

        video.currentTime = pos * video.duration;
    }

    progressBarTime(): void {
        const video: HTMLVideoElement = document.querySelector(".player");
        const progressTime = document.querySelector(".progress-time");
        const watchBar: HTMLDivElement = document.querySelector(".watched-bar");
        const noVideo: HTMLDivElement = document.querySelector(".novideo");

        watchBar.style.width =
            (video.currentTime / video.duration) * 100 + "%";

        const totalSecondsRemaining = video.duration - video.currentTime;
        const hoursRemaining = Math.floor(totalSecondsRemaining / 3600);
        const minutesRemaining = Math.floor(totalSecondsRemaining / 60);
        const secondsRemaining = Math.floor(
            totalSecondsRemaining - minutesRemaining * 60
        );

        if (isNaN(totalSecondsRemaining)) {
            noVideo.style.display = "flex";

            progressTime.textContent = "00:00:00";

            return;
        }

        progressTime.textContent = `${hoursRemaining
            .toString()
            .padStart(2, "0")}:${minutesRemaining
            .toString()
            .padStart(2, "0")}:${secondsRemaining
            .toString()
            .padStart(2, "0")}`;
    }

    playStopMobile(): void {
        const video: HTMLVideoElement = document.querySelector(".player");
        const playPauseButton = document.querySelector(".play-pause");
        const play: SVGElement = playPauseButton.querySelector(".play__svg");
        const pause: SVGElement = playPauseButton.querySelector(".pause__svg");

        if (video.paused) {
            play.style.display = "none";
            pause.style.display = "";

            return;
        }

        play.style.display = "";
        pause.style.display = "none";
    }

    fullScreenChange(): void {
        const videoContainer = document.querySelector(".video-container");

        if (!document.fullscreenElement) {
            videoContainer.requestFullscreen();

            return;
        }

        document.exitFullscreen();
    }

    unmount() {
        const fullScreenButton = document.querySelector(".full");
        const video: HTMLVideoElement = document.querySelector(".player");
        const progressBar: HTMLDivElement = document.querySelector(".progress-bar");
        const seriesPopUp: HTMLDivElement = document.querySelector('.series__popUp');
        const playPauseButton = document.querySelector(".play-pause");
        const rewindButton = document.querySelector(".rewind");
        const forwardButton = document.querySelector(".forward");
        const volumeReg: HTMLDivElement = document.querySelector('.volume__popUp');
        const volumeButton = document.querySelector(".volume");

        fullScreenButton.removeEventListener("click", this.fullScreenChange);
        document.removeEventListener("dblclick", this.fullScreenChange);
        video.removeEventListener('play', this.playStopMobile);
        video.removeEventListener("timeupdate", this.progressBarTime);
        progressBar.removeEventListener("click", this.progressBarRewind);
        document.removeEventListener("fullscreenchange", this.screenIconChange);
        document.removeEventListener("keydown", this.keyEvents);
        document.removeEventListener("pointermove", PlayerViewClass.displayControls);
        document.removeEventListener("touchend", PlayerViewClass.displayControls);
        seriesPopUp.removeEventListener("scroll", PlayerViewClass.displayControls);
        playPauseButton.removeEventListener("click", PlayerViewClass.playPause);
        rewindButton.removeEventListener("click", PlayerViewClass.rewind);
        forwardButton.removeEventListener("click", PlayerViewClass.forward);
        volumeReg.removeEventListener('click', this.volumeChange);
        volumeButton.removeEventListener("click", this.volumeMute);
    }
}

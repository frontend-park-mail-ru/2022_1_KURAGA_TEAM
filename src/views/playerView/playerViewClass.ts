import playerTemplate from "./player.pug";
import BaseViewClass from "../baseView/baseViewClass";
import LoaderViewClass from "../loaderView/loaderViewClass";
import { routes } from "Routing/constRouting";
import MovieModel from "../../models/Movie";
import router from "Routing/router";
import handlerLink from "Utils/handlerLink";

import "./player.scss";

export default class PlayerViewClass extends BaseViewClass {
    private movie: MovieModel;

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const idx = +/\d+/.exec(window.location.pathname);

            const check = window.location.pathname.indexOf("trailer");

            const { movBody }: { movBody?: Promise<any> } =
                await MovieModel.getMovie(idx);
            const movData = await Promise.resolve(movBody);

            if (movData.status === routes.ERROR) {
                router.go(routes.ERROR_VIEW);
                return;
            }
            this.movie = new MovieModel(movData);

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

        const videoContainer = document.querySelector(".video-container");
        const video: HTMLVideoElement = document.querySelector(".player");
        video.play();

        const noVideo: HTMLDivElement = document.querySelector(".novideo");

        const controlsContainers: HTMLDivElement = document.querySelector(
            ".controls-container"
        );
        const exit: HTMLAnchorElement = document.querySelector(".exit");

        const playPauseButton = document.querySelector(".play-pause");
        const play: SVGElement = playPauseButton.querySelector(".play__svg");
        const pause: SVGElement = playPauseButton.querySelector(".pause__svg");
        play.style.display = "none";
        pause.style.display = "";

        if (window.screen.width <= 700) {
            video.addEventListener('play', () => {
                console.log(1);
                if (video.paused) {
                    play.style.display = "none";
                    pause.style.display = "";

                    return;
                }

                play.style.display = "";
                pause.style.display = "none";
            })
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

        const progressTime = document.querySelector(".progress-time");
        const progressBar: HTMLDivElement =
            document.querySelector(".progress-bar");
        const watchBar: HTMLDivElement = document.querySelector(".watched-bar");
        watchBar.style.width = "0";

        let displayTime;

        const displayControls = () => {
            controlsContainers.style.opacity = "1";
            exit.style.opacity = "1";
            document.body.style.cursor = "initial";

            if (displayTime) {
                clearTimeout(displayTime);
            }

            displayTime = setTimeout(() => {
                controlsContainers.style.opacity = "0";
                exit.style.opacity = "0";
                document.body.style.cursor = "none";
            }, 5000);
        };

        displayControls();

        const playPause = () => {
            if (video.paused) {
                video.play();
                play.style.display = "none";
                pause.style.display = "";

                return;
            }

            video.pause();
            play.style.display = "";
            pause.style.display = "none";
        };

        const forward = () => {
            video.currentTime += 10;
        };

        const rewind = () => {
            video.currentTime -= 10;
        };

        video.addEventListener("timeupdate", () => {
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
        });

        progressBar.addEventListener("click", (e: any) => {
            const pos =
                (e.pageX -
                    (progressBar.offsetLeft +
                        // @ts-ignore
                        progressBar.offsetParent.offsetLeft)) /
                progressBar.offsetWidth;

            video.currentTime = pos * video.duration;
        });

        document.addEventListener("fullscreenchange", () => {
            if (!document.fullscreenElement) {
                minSize.style.display = "none";
                fullSize.style.display = "";

                return;
            }

            minSize.style.display = "";
            fullSize.style.display = "none";
        });

        document.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                e.preventDefault();

                playPause();
            }

            if (e.code === "ArrowRight") {
                forward();
            }

            if (e.code === "ArrowLeft") {
                rewind();
            }

            displayControls();
        });

        document.addEventListener("pointermove", displayControls);

        document.addEventListener("touchend", displayControls);

        seriesPopUp.addEventListener("scroll", displayControls);

        playPauseButton.addEventListener("click", playPause);

        rewindButton.addEventListener("click", rewind);

        forwardButton.addEventListener("click", forward);

        let click = false;

        volumeReg.addEventListener('click', (e: any) => {
            click = true;

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
        });

        volumeButton.addEventListener("click", () => {
            if (click) {
                click = false;

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
        });

        const fullScreenChange = () => {
            if (!document.fullscreenElement) {
                videoContainer.requestFullscreen();

                return;
            }

            document.exitFullscreen();
        }

        fullScreenButton.addEventListener("click", fullScreenChange);
        document.addEventListener("dblclick", fullScreenChange);
    }
}

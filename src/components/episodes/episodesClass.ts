import episodesTemplate from './episodes.pug'

export default class EpisodesClass {
    private readonly numSeries;

    constructor(numSeries) {
        this.numSeries = numSeries;
    }

    render() {
        return episodesTemplate({num: this.numSeries});
    }
}
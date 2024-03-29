class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=0016c9cfab8428435b9387c949340280';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        const res = this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);

        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);

        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            description: char.description ? char.description : "Unfortunately there is no description, but you can always Google it :)",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}

export default MarvelService
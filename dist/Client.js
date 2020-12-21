"use strict";
/**
 * File where Client class exists...
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = __importDefault(require("./lib/Auth"));
const User_1 = __importDefault(require("./lib/User"));
const Playlist_1 = __importDefault(require("./lib/Playlist"));
const Track_1 = __importDefault(require("./lib/Track"));
const Album_1 = __importDefault(require("./lib/Album"));
const Artist_1 = __importDefault(require("./lib/Artist"));
const Episode_1 = __importDefault(require("./lib/Episode"));
const Show_1 = __importDefault(require("./lib/Show"));
const Browse_1 = __importDefault(require("./lib/Browse"));
const Spotify_1 = __importDefault(require("./Spotify"));
const UserClient_1 = __importDefault(require("./UserClient"));
const CacheManager_1 = __importDefault(require("./CacheManager"));
const Error_1 = require("./Error");
/**
 * **Client class**
 *
 * The class which collects all the methods
 */
class Client {
    /**
     * @param oauth Token
     *
     * Pass the spotify oauth `token`
     * ```js
     * const Spotify = require('spotify-api.js')
     * const client = new Spotify.Client('oauth token')
     * ```
     */
    constructor(oauth, cacheOptions = {
        cacheTracks: false
    }) {
        this.token = oauth || 'NO TOKEN';
        this.utils = new Spotify_1.default(this.token);
        this.startedAt = Date.now();
        this.cacheOptions = cacheOptions;
        this.tracks = new Track_1.default(this.token, this);
        this.oauth = new Auth_1.default(this.token);
        this.users = new User_1.default(this.token);
        this.playlists = new Playlist_1.default(this.token);
        this.albums = new Album_1.default(this.token);
        this.artists = new Artist_1.default(this.token);
        this.episodes = new Episode_1.default(this.token);
        this.shows = new Show_1.default(this.token);
        this.browse = new Browse_1.default(this.token);
        this.user = new UserClient_1.default(this.token);
        this.cache = {
            tracks: new CacheManager_1.default('id')
        };
    }
    ;
    /**
     * **Example:**
     * ```js
     * client.login('token');
     * ```
     *
     * @param token string
     */
    login(token) {
        if (!token)
            throw new Error_1.MissingParamError('missing token');
        this.token = token;
        this.utils = new Spotify_1.default(this.token);
        this.startedAt = Date.now();
        this.oauth = new Auth_1.default(this.token);
        this.users = new User_1.default(this.token);
        this.playlists = new Playlist_1.default(this.token);
        this.tracks = new Track_1.default(this.token, this);
        this.albums = new Album_1.default(this.token);
        this.artists = new Artist_1.default(this.token);
        this.episodes = new Episode_1.default(this.token);
        this.shows = new Show_1.default(this.token);
        this.browse = new Browse_1.default(this.token);
        this.user = new UserClient_1.default(this.token);
    }
    ;
    /**
     * Uptime of the client
     */
    get uptime() {
        return Date.now() - this.startedAt;
    }
    ;
    /**
     * **Example:**
     * ```js
     * const search = await client.search('search', { limit: 10, type: ['track'] });
     * ```
     *
     * @param q Query
     * @param options Your options to selected
     */
    async search(q, options = {}) {
        return new Promise(async (resolve, reject) => {
            if (!q)
                reject(new Error_1.MissingParamError('missing query'));
            if (!options.type)
                options.type = ['track', 'album', 'artist', 'playlist', 'show', 'episode'];
            try {
                resolve(await this.utils.fetch({
                    link: `v1/search`,
                    params: {
                        q: encodeURIComponent(q),
                        type: options.type.join(','),
                        market: "US",
                        limit: options.limit || 20,
                    },
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * client.request('me', {}, (err, data) => {
     *     if(err) return console.error(err);
     *     if(data) {
     *         console.log('Success!');
     *         console.log(data);
     *     };
     * });
     * ```
     *
     * @param path Path to request
     * @param options Options to request
     * @param callback Callback when request is over
     */
    request(path, options, callback) {
        this.utils.fetch({
            link: path,
            ...options
        })
            .then(x => callback(null, x))
            .catch(x => callback(x, null));
    }
    ;
    /**
     * **Example:**
     *
     * ```js
     * let uriInfo = await client.getByURI("spotify:album:0sNOF9WDwhWunNAHPD3Baj");
     * ```
     *
     * @param uri Uri
     */
    async getByURI(uri) {
        return new Promise(async (resolve, reject) => {
            let split = uri.split(':');
            let id = split[2];
            try {
                switch (split[1]) {
                    case 'album':
                        resolve(await this.albums.get(id));
                        break;
                    case 'artist':
                        resolve(await this.artists.get(id));
                        break;
                    case 'episode':
                        resolve(await this.episodes.get(id));
                        break;
                    case 'show':
                        resolve(await this.shows.get(id));
                        break;
                    case 'track':
                        resolve(await this.shows.get(id));
                        break;
                    case 'user':
                        resolve(await this.shows.get(id));
                        break;
                    default:
                        reject(new Error_1.UnexpectedError('We could not resolve your given uri!'));
                }
                ;
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
}
exports.default = Client;
;

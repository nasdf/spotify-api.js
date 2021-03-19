import Client from './Client';
import { AffinityOptions, Image, Paging, PagingOptions, RawObject } from './Types';
import Track from './structures/Track';
import Artist from './structures/Artist';
import Album from './structures/Album';
import Episode from './structures/Episode';
import Show from './structures/Show';
export interface SavedStructure {
    addedAt: string;
}
export interface SavedAlbum extends SavedStructure {
    album: Album;
}
export interface SavedTrack extends SavedStructure {
    track: Track;
}
export interface SavedEpisode extends SavedStructure {
    episode: Episode;
}
export interface SavedShow extends SavedStructure {
    show: Show;
}
/**
 * A class which accesses the current user endpoints!
 */
export default class UserClient {
    client: Client;
    name: string;
    country: string;
    email: string;
    externalUrls: RawObject;
    totalFollowers: number;
    href: string;
    id: string;
    images: Image[];
    product: 'premium' | 'free' | 'open' | 'unknown';
    uri: string;
    /**
     * The same client but manages current user endpoints and requires a current user api token not a token which is generated by client and client secret
     *
     * @param token Your spotify current user token or provide your spotify client!
     * @example const user = new UserClient('token'); // or
     * const user = new UserClient(client);
     */
    constructor(client: Client);
    constructor(token: string);
    /**
     * Returns current user details
     *
     * @example const user = await user.info();
     */
    info(): Promise<this>;
    /**
     * Returns the top tracks of the current user!
     *
     * @param options Basic AffinityOptions
     * @example await user.getTopTracks();
     */
    getTopTracks(options?: AffinityOptions): Promise<Paging<Track>>;
    /**
     * Returns the top artists of the current user!
     *
     * @param options Basic AffinityOptions
     * @example await user.getTopArtists();
     */
    getTopArtists(options?: AffinityOptions): Promise<Paging<Artist>>;
    /**
     * Follow a playlist inshort words add the playlist to your library!
     *
     * @param id The id of the playlist!
     * @param options Options such as public!
     * @example await client.user.followPlaylist('id');
     */
    followPlaylist(id: string, options?: {
        public?: boolean;
    }): Promise<boolean>;
    /**
     * Unfollow a playlist by id!
     *
     * @param id The id of the playlist!
     * @example await client.user.unfollowPlaylist('id');
     */
    unfollowPlaylist(id: string): Promise<boolean>;
    /**
     * Verify if the current user follows a paticualr playlist by id!
     *
     * @param id Spotify playlist id
     * @example const follows = await client.user.followsPlaylist('id');
     */
    followsPlaylist(id: string): Promise<boolean>;
    /**
     * Returns the user's following list of artists!
     *
     * @param options Options such as after and limit!
     * @example const artists = await client.user.getFollowingArtists();
     */
    getFollowingArtists(options?: {
        after?: string;
        limit?: number;
    }): Promise<Paging<Artist>>;
    /**
     * Follow artists with their spotify ids!
     *
     * @param ids An array of spotify artist ids
     * @example await client.user.followArtists('id1', 'id2');
     */
    followArtists(...ids: string[]): Promise<boolean>;
    /**
     * Unfollow artists with their spotify ids!
     *
     * @param ids An array of spotify artist ids
     * @example await client.user.unfollowArtists('id1', 'id2');
     */
    unfollowArtists(...ids: string[]): Promise<boolean>;
    /**
     * Follow users with their spotify ids!
     *
     * @param ids An array of spotify user ids
     * @example await client.user.followUsers('id1', 'id2');
     */
    followUsers(...ids: string[]): Promise<boolean>;
    /**
     * Unfollow users with their spotify ids!
     *
     * @param ids An array of spotify user ids
     * @example await client.user.unfollowUsers('id1', 'id2');
     */
    unfollowUsers(...ids: string[]): Promise<boolean>;
    /**
     * Verify if the array of artists supplied is been followed by you!
     *
     * @param ids Array of spotify artist ids
     * @example const [followsArtist] = await client.user.followsArtists('id1');
     */
    followsArtists(...ids: string[]): Promise<boolean[]>;
    /**
     * Verify if the array of users supplied is been followed by you!
     *
     * @param ids Array of spotify users ids
     * @example const [followsUser] = await client.user.followsUsers('id1');
     */
    followsUsers(...ids: string[]): Promise<boolean[]>;
    /**
     * Returns the saved albums of the current user
     *
     * @param options Basic PagingOptions
     * @example const albums = await client.user.getAlbums();
     */
    getAlbums(options?: PagingOptions): Promise<Paging<SavedAlbum>>;
    /**
     * Add albums to your spotify savelist!
     *
     * @param ids Spotify albums ids to add to your save list!
     * @example await client.user.addAlbums('id1', 'id2');
     */
    addAlbums(...ids: string[]): Promise<boolean>;
    /**
     * Remove albums from your spotify savelist!
     *
     * @param ids Spotify albums ids to remove from your save list!
     * @example await client.user.deleteAlbums('id1', 'id2');
     */
    deleteAlbums(...ids: string[]): Promise<boolean>;
    /**
     * Check if those albums exist on the current user's library!
     *
     * @param ids Array of spotify album ids
     * @example const [hasFirstAlbum, hasSecondAlbum] = await client.user.hasAlbums('id1', 'id2');
     */
    hasAlbums(...ids: string[]): Promise<boolean[]>;
    /**
     * Returns the saved tracks of the current user
     *
     * @param options Basic PagingOptions
     * @example const tracks = await client.user.getTracks();
     */
    getTracks(options?: PagingOptions): Promise<Paging<SavedTrack>>;
    /**
     * Add tracks to your spotify savelist!
     *
     * @param ids Spotify tracks ids to add to your save list!
     * @example await client.user.addTracks('id1', 'id2');
     */
    addTracks(...ids: string[]): Promise<boolean>;
    /**
     * Remove tracks from your spotify savelist!
     *
     * @param ids Spotify tracks ids to remove from your save list!
     * @example await client.user.deleteTracks('id1', 'id2');
     */
    deleteTracks(...ids: string[]): Promise<boolean>;
    /**
     * Check if those tracks exist on the current user's library!
     *
     * @param ids Array of spotify track ids
     * @example const [hasFirstTrack, hasSecondTrack] = await client.user.hasTracks('id1', 'id2');
     */
    hasTracks(...ids: string[]): Promise<boolean[]>;
    /**
     * Returns the saved episodes of the current user
     *
     * @param options Basic PagingOptions
     * @example const episodes = await client.user.getEpisodes();
     */
    getEpisodes(options?: PagingOptions): Promise<Paging<SavedEpisode>>;
    /**
     * Add episodes to your spotify savelist!
     *
     * @param ids Spotify episodes ids to add to your save list!
     * @example await client.user.addEpisodes('id1', 'id2');
     */
    addEpisodes(...ids: string[]): Promise<boolean>;
    /**
     * Remove episodes from your spotify savelist!
     *
     * @param ids Spotify episodes ids to remove from your save list!
     * @example await client.user.deleteEpisodes('id1', 'id2');
     */
    deleteEpisodes(...ids: string[]): Promise<boolean>;
    /**
     * Check if those episodes exist on the current user's library!
     *
     * @param ids Array of spotify episode ids
     * @example const [hasFirstEpisode, hasSecondEpisode] = await client.user.hasEpisodes('id1', 'id2');
     */
    hasEpisodes(...ids: string[]): Promise<boolean[]>;
    /**
     * Returns the saved shows of the current user
     *
     * @param options Basic PagingOptions
     * @example const shows = await client.user.getShows();
     */
    getShows(options?: PagingOptions): Promise<Paging<SavedShow>>;
    /**
     * Add shows to your spotify savelist!
     *
     * @param ids Spotify shows ids to add to your save list!
     * @example await client.user.addShows('id1', 'id2');
     */
    addShows(...ids: string[]): Promise<boolean>;
    /**
     * Remove shows from your spotify savelist!
     *
     * @param ids Spotify shows ids to remove from your save list!
     * @example await client.user.deleteShows('id1', 'id2');
     */
    deleteShows(...ids: string[]): Promise<boolean>;
    /**
     * Check if those shows exist on the current user's library!
     *
     * @param ids Array of spotify show ids
     * @example const [hasFirstShow, hasSecondShow] = await client.user.hasShows('id1', 'id2');
     */
    hasShows(...ids: string[]): Promise<boolean[]>;
}

import {Injectable} from "@angular/core";
import {FileService} from "../../files/file.service";
import {Mp3} from "../mp3.interface";

export enum NextMethod {
    Forward = 0,
    Backward = 1,
    Random = 2,
}

@Injectable({
    providedIn: 'root',
})
export class PlaylistFactoryService {

    constructor(private fileService: FileService) {
    }

    create(): Playlist{
        return new Playlist(this.fileService);
    }
}

export interface PlaylistInterface {
    name: string;
    list: Mp3[];
}

export class Playlist {
    private name: string;
    private list: Mp3[] = [];
    private currentIndex = 0;

    constructor(private fileService: FileService) {
    }

    getName() {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }
    count() {
        return this.list.length;
    }

    getList() {
        return this.list;
    }

    saveToPlaylistInterface(): PlaylistInterface {
        let playlistInterface: PlaylistInterface = {
            name: this.name,
            list: this.list,
        }
        return playlistInterface;
    }
    loadFromPlaylistInterface(playlistInterface: PlaylistInterface) {
        this.name = playlistInterface.name;
        this.list = playlistInterface.list;
        this.initPlaylist();
    }

    initPlaylist() {
        this.currentIndex = 0;
    }

    public getNextMp3(method: NextMethod = NextMethod.Forward): Promise<Mp3> {
        return new Promise((resolve, reject) => {
            if (this.list.length == 0) {
                reject("Playlist is empty");
            }

            if ((method == NextMethod.Forward) && (this.currentIndex >= this.list.length)) {
                this.currentIndex = 0;
            } else
            if ((method == NextMethod.Backward) && (this.currentIndex < 0)) {
                this.currentIndex = this.list.length - 1;
            }

            let nextMp3:Mp3;
            if (method == NextMethod.Random)
                nextMp3 = this.list[Math.floor(Math.random() * this.list.length)];
            else if (method == NextMethod.Backward)
                nextMp3 = this.list[this.currentIndex--];
            else
                nextMp3 = this.list[this.currentIndex++];

            this.fileService.exists(nextMp3.path).then((result)=>{
                console.log('file.exists : ', result);
                resolve(nextMp3);
            }).catch((error)=>{
                console.log('file.exists : error ', error);
                this.getNextMp3(method)
                    .then((mp3:Mp3)=>{
                        resolve(mp3);
                    })
                    .catch((error)=>{
                        reject(error);
                    })
            });
        });
    }
}

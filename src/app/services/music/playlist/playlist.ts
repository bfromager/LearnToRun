import {Injectable} from "@angular/core";
import {FileService} from "../../files/file.service";
import {Mp3} from "../mp3.interface";

//todo: delete wrong files

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
    // private currentList: Mp3[] = [];
    private currentIndex;

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
    }

    // toString(): string {
    //     let playlistInterface: PlaylistInterface = {
    //         name: this.name,
    //         list: this.list,
    //     }
    //     // console.log(playlistInterface.name,playlistInterface.list);
    //     return JSON.stringify (playlistInterface);
    // }
    // loadFromString(jsonString: string) {
    //     let playlistInterface: PlaylistInterface = <PlaylistInterface>JSON.parse(jsonString);
    //     // console.log(playlistInterface.name,playlistInterface.list);
    //     this.name = playlistInterface.name;
    //     this.list = playlistInterface.list;
    // }

    initPlaylist() {
        // this.currentList = this.list.slice();
        this.currentIndex = 0;
    }

    public getNextMp3(): Promise<Mp3> {
        return new Promise((resolve, reject) => {
            if (this.list.length == 0) {
                reject("Playlist is empty");
            }

            if ((this.currentIndex) >= this.list.length) {
                this.initPlaylist();
            }
            let nextMp3 = this.list[this.currentIndex++];

            this.fileService.exists(nextMp3.path).then((result)=>{
                console.log('file.exists : ', result);
                resolve(nextMp3);
            }).catch((error)=>{
                console.log('file.exists : error ', error);
                this.getNextMp3()
                    .then((mp3:Mp3)=>{
                        resolve(mp3);
                    })
                    .catch((error)=>{
                        reject(error);
                    })
            });
            // if (this.currentList.length == 0) {
            //     this.initPlaylist();
            //     if (this.currentList.length == 0) {
            //         reject("Playlist is empty");
            //     }
            // }
            // let nextMp3 = this.currentList.shift();
            //
            // this.fileService.exists(nextMp3.path).then((result)=>{
            //     console.log('file.exists : ', result);
            //     resolve(nextMp3);
            // }).catch((error)=>{
            //     console.log('file.exists : error ', error);
            //     this.getNextMp3()
            //         .then((mp3:Mp3)=>{
            //             resolve(mp3);
            //         })
            //         .catch((error)=>{
            //             reject(error);
            //         })
            // });
        });
    }
}

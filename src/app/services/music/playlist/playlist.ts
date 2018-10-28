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


export class Playlist {
    protected name: string;
    protected list: Mp3[] = [];
    protected currentList: Mp3[] = [];

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

    initPlaylist() {
        this.currentList = this.list.slice();
    }

    public getNextMp3(): Promise<Mp3> {
        return new Promise((resolve, reject) => {
            if (this.currentList.length == 0) {
                this.initPlaylist();
                if (this.currentList.length == 0) {
                    reject("Playlist is empty");
                }
            }
            let nextMp3 = this.currentList.shift();

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
        });
    }
}

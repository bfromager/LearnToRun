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
    private displayList: Mp3[] = [];
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
        return this.list.slice();
    }

    add(mp3: Mp3) {
        this.list.push(mp3);
    }
    del(index: number) {
        if (index > -1) {
            this.list.splice(index, 1);
        }
    }
    reorder(from: number, to: number) {
        const itemToMove = this.list.splice(from, 1)[0];
        this.list.splice(to, 0, itemToMove);
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
        this.currentIndex = -1;
        this.displayList = this.list.slice();
    }

    public getNextMp3(method: NextMethod = NextMethod.Forward): Promise<Mp3> {
        return new Promise((resolve, reject) => {
            if (this.displayList.length == 0) {
                reject("Playlist is empty");
            }

            let displayIndex=this.currentIndex;
            if (method == NextMethod.Random)
                displayIndex = Math.floor(Math.random() * this.displayList.length);
            else if (method == NextMethod.Backward) {
                -- displayIndex;
                if (displayIndex < 0) displayIndex = this.displayList.length - 1;
            }
            else {
                ++displayIndex;
                if (displayIndex >= this.displayList.length) displayIndex = 0;
            }

            let nextMp3: Mp3 = this.displayList[displayIndex];

            this.fileService.exists(nextMp3.path).then((result)=>{
                console.log('file.exists : ', result);

                this.currentIndex = displayIndex;

                resolve(nextMp3);
            }).catch((error)=>{
                console.log('file.exists : error ', error);
                this.displayList.splice(displayIndex, 1); // On supprime les fichiers incorrects
                if (method == NextMethod.Backward) { // Si backward, on passe au précédent
                    this.currentIndex = displayIndex;
                }
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

import {Injectable} from "@angular/core";
import {FileService} from "../../files/file.service";

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
    protected list: string[] = [];
    protected currentList: string[] = [];

    constructor(private fileService: FileService) {
    }

    getName() {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }

    getList() {
        return this.list;
    }

    protected initPlaylist() {
        this.currentList = this.list.slice();
    }

    public getNextFile(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.currentList.length == 0) {
                this.initPlaylist();
                if (this.currentList.length == 0) {
                    reject("Playlist is empty");
                }
            }
            let nextFile = this.currentList.shift();

            this.fileService.exists(nextFile).then((result)=>{
                console.log('file.exists : ', result);
                resolve(nextFile);
            }).catch((error)=>{
                console.log('file.exists : error ', error);
                this.getNextFile()
                    .then((aFile:string)=>{
                        resolve(aFile);
                    })
                    .catch((error)=>{
                        reject(error);
                    })
            });
        });
    }
}

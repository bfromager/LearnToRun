// import {FileService} from "../../files/file.service";

abstract class PlaylistBase {
    protected list: string[] = [];
    protected currentList: string[] = [];

    constructor() {
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

            this.fileExists(nextFile).then((result)=>{
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

    protected abstract fileExists(file: string): Promise<boolean>;

}

export class Playlist extends PlaylistBase{
    constructor() {
        super();
    }

    protected fileExists(file: string): Promise<boolean> {
        return new Promise((resolve, reject) => {

            let fileName = file.substring(file.lastIndexOf('/') + 1, file.length);

            if (fileName != "not a file") {
                resolve(true);
            } else {
                reject("File not exists");
            }
        });
    }

}

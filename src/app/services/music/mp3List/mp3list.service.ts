// https://forum.ionicframework.com/t/how-do-i-retrieve-and-save-internal-audio-mp3-locations/76932
// https://stackoverflow.com/questions/34384319/ionic-cordova-get-all-mp3-files-from-sdcard

// https://stackoverflow.com/questions/28003362/how-to-get-mp3-info-in-cordova
// https://github.com/cfjedimaster/Cordova-Examples/tree/master/mp3reader
// https://www.raymondcamden.com/2015/04/29/working-with-mp3s-id3-and-phonegapcordova/

import {Mp3} from "../mp3/mp3.interface";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/index";
import {Platform} from "@ionic/angular";
import {File} from '@ionic-native/file/ngx';
import {AssetService} from "../../files/asset.service";
// import * from "jsmediatags/index"


@Injectable({
    providedIn: 'root',
    useFactory: Mp3ListServiceFactory,
    deps: [Platform, File, AssetService],
})
export abstract class Mp3ListService {
    abstract  mp3Subject: Subject<Mp3>;

    constructor() {
    }

    abstract  updateList();
}

function Mp3ListServiceFactory(platform: Platform, file: File, asset: AssetService) {
    if (platform.is('android')) {
        return new Mp3ListServiceAndroid(file);
    }
    else {
        return new Mp3ListServiceFake(asset);
    }
}

class Mp3ListServiceFake {
    public mp3Subject: Subject<Mp3> = new Subject<Mp3>();

    constructor(private asset: AssetService) {

    }

    updateList() {
        this.mp3Subject.next(<Mp3>{
            name: "07 - Marlène.mp3",
            path: this.asset.getWavePath('07 - Marlène.mp3')
        });
        this.mp3Subject.next(<Mp3>{
            name: "1 minute",
            path: this.asset.getWavePath('1 minute.wav')
        });
        this.mp3Subject.next(<Mp3>{
            name: "2 minutes",
            path: this.asset.getWavePath('2 minutes.wav')
        });
        this.mp3Subject.next(<Mp3>{
            name: "not a file",
            path: "not a file"
        });
        this.mp3Subject.next(<Mp3>{
            name: "3 minutes",
            path: this.asset.getWavePath('3 minutes.wav')
        });
        this.mp3Subject.next(<Mp3>{
            name: "4 minutes",
            path: this.asset.getWavePath('4 minutes.wav')
        });
    }
}

class Mp3ListServiceAndroid {
    public mp3Subject: Subject<Mp3> = new Subject<Mp3>();
    private root: string;

    constructor(private file: File){
        this.root = this.file.externalRootDirectory;
    }

    updateList() {
        this.listMp3Files('Music');
    }
    listMp3Files(path: string) {

        this.file.listDir(this.root, path)
            .then(result => {
                for (let item of result) {
                    if (item.isDirectory == true && item.name != '.' && item.name != '..') {
                        this.listMp3Files(path + '/' + item.name);
                    }
                    else if (item.isFile == true && item.name.substr(item.name.lastIndexOf('.') + 1).toLowerCase() == 'mp3') {
                        //File found
                        // jsmediatags.read(item.fullPath, {
                        //     onSuccess : (tags) => {
                        //         console.log("onSuccess", tags)
                        //     },
                        //     onError : (error) => {
                        //         console.log("onError", error)
                        //     }
                        // });
                        this.mp3Subject.next(<Mp3>{
                            name: item.name,
                            path: this.root + item.fullPath,
                        });
                    }
                }
            })
            .catch (error => {
                this.mp3Subject.next(<Mp3>{
                    name: "No such directory",
                    path: error
                });
            });
    }
}


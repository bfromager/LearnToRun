// https://forum.ionicframework.com/t/how-do-i-retrieve-and-save-internal-audio-mp3-locations/76932
// https://stackoverflow.com/questions/34384319/ionic-cordova-get-all-mp3-files-from-sdcard

// https://medium.com/@balramchavan/using-async-await-feature-in-angular-587dd56fdc77

// https://stackoverflow.com/questions/28003362/how-to-get-mp3-info-in-cordova
// https://github.com/cfjedimaster/Cordova-Examples/tree/master/mp3reader
// https://www.raymondcamden.com/2015/04/29/working-with-mp3s-id3-and-phonegapcordova/

import {Mp3} from "../mp3.interface";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/index";
import {Platform} from "@ionic/angular";
import {File} from '@ionic-native/file/ngx';

// https://offering.solutions/blog/articles/2018/08/17/using-useclass-usefactory-usevalue-useexisting-with-treeshakable-providers-in-angular/

@Injectable({
    providedIn: 'root',
    useFactory: Mp3ListServiceFactory,
    deps: [Platform,File],
})
export abstract class Mp3ListService {
    abstract  mp3Subject: Subject<Mp3>;

    constructor() {
    }

    abstract  getList();
}

function Mp3ListServiceFactory(platform: Platform, file: File) {
    if (platform.is('android')) {
        return new Mp3ListServiceAndroid(file);
    }
    else {
        return new Mp3ListServiceFake();
    }
}

class Mp3ListServiceFake {
    public mp3Subject: Subject<Mp3> = new Subject<Mp3>();

    constructor() {

    }

    getList() {
        this.mp3Subject.next(<Mp3>{
            name: "File 1",
            path: '/toto/tata/tutu/toto/tata/tutu/toto/tata/tutu/'
        });
        this.mp3Subject.next(<Mp3>{
            name: "File 2",
            path: '/toto/tata/tutu/toto/tata/tutu/toto/tata/tutu/'
        });
        this.mp3Subject.next(<Mp3>{
            name: "File 3",
            path: '/toto/tata/tutu/toto/tata/tutu/toto/tata/tutu/'
        });
    }
}

class Mp3ListServiceAndroid {
    public mp3Subject: Subject<Mp3> = new Subject<Mp3>();
    private root: string;

    constructor(private file: File){
        this.root = this.file.externalRootDirectory;
    }

    getList() {
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
                        this.mp3Subject.next(<Mp3>{
                            name: item.name,
                            path: item.fullPath
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


// https://www.npmjs.com/package/music-metadata
// https://www.npmjs.com/package/id3-parser

import {Injectable} from "@angular/core";
import {Mp3} from "./mp3.interface";
import {FileService} from "../../files/file.service";
import { parse } from 'id3-parser';
import {IID3Tag} from "id3-parser/lib/interface";

@Injectable({
    providedIn: 'root',
})
export class Mp3TagService {

    private toBeTagged: Mp3[] = [];
    private tagging = false;

    constructor(private fileService: FileService) {}

    tagMp3(mp3: Mp3) {
        this.toBeTagged.push(mp3);
        this.asyncTag();
    }

    private asyncTag() {
        if (this.tagging || this.toBeTagged.length == 0) return;
        this.tagging = true;

        let mp3: Mp3 = this.toBeTagged.shift();
        // alert("Tagging " + mp3.name);
        this.fileService.toBuffer(mp3.path)
            .then((buffer) => {
                if (buffer != false) {
                    const result = parse(buffer);
                    console.log(result);
                    if (result != false) {
                        let tags: IID3Tag = result;
                        mp3.title = tags.title;
                        mp3.artist = tags.artist;
                        mp3.album = tags.album;
                        mp3.genre = tags.genre;
                        mp3.track = tags.track.toString();
                        // resolve(true);
                    }
                } else {
                    // resolve(false);
                }
                // alert("Tagged "  + mp3.name);
                this.tagging = false;
                this.asyncTag();
            })
            .catch(()=> {
                // alert("Error " + mp3.name);
                this.tagging = false;
                this.asyncTag();
            })
    }

/*        tagMp3(mp3: Mp3): Promise<boolean>{
            return new Promise((resolve, reject) => {
                // fetchFileAsBuffer(mp3.path)
                this.fileService.toBuffer(mp3.path)
                    .then((buffer) => {
                        if (buffer != false) {
                            const result = parse(buffer);
                            console.log(result);
                            if (result != false) {
                                let tags: IID3Tag = result;
                                mp3.title = tags.title;
                                mp3.artist = tags.artist;
                                mp3.album = tags.album;
                                resolve(true);
                            }
                        } else {
                            resolve(false);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    })
            });
        }

    // mm.parseBlob(mp3.file)
        //     .then( metadata => {
        //         console.log(util.inspect(metadata, {showHidden: false, depth: null}));
        //     })
        //     .catch((err) => {
        //         console.error(err.message);
        //     })

        // return new Promise((resolve, reject) => {
        //     read(mp3.path, {
        //         onSuccess: function(tag) {
        //             console.log(tag);
        //         },
        //         onError: function(error) {
        //             console.log(':(', error.type, error.info);
        //         }
        //     });
        // });

        return new Promise((resolve, reject) => {
            // fetchFileAsBuffer(mp3.path)
            this.fileService.toBuffer(mp3.path)
                .then((buffer) => {
                    if (buffer != false) {
                        const result = parse(buffer);
                        console.log(result);
                        if (result != false) {
                            let tags: IID3Tag = result;
                            mp3.title = tags.title;
                            mp3.artist = tags.artist;
                            mp3.album = tags.album;
                            resolve(true);
                        }
                    } else {
                        resolve(false);
                    }
                })
                .catch((error)=>{
                    reject(error);
                })
        });

        // return new Promise((resolve, reject) => {
        //     this.fileService.toBuffer(mp3.path).then((buffer)=>{
        //         const tags = parse(<Buffer>buffer);
        //         alert(tags);
        //     })
        // });
        //
        // this.fileService.toBuffer(mp3.path).then((buffer)=>{
        //     // universalParse(<Buffer>buffer)
        //     //     .then(tag => {
        //     //         console.log(tag);
        //     //     })
        //     //     .catch((error)=>{
        //     //         console.log(error);
        //     //     })
        //     // let tags = parse(<Buffer>buffer);
        //     // console.log(tags);
        //
        //     convertFileToBuffer(mp3.file).then(parse)
        //         .then(tag => {
        //             console.log(tag);
        //         })
        //         .catch((error)=>{
        //             console.log(error);
        //         })
        //
        //     mp3.title = "toto";
        //     mp3.artist = "tata";
        //     mp3.album = "tutu";
        // }).catch((error)=>{
        //     console.log(error);
        //     mp3.title = "inconnu";
        //     mp3.artist = "inconnu";
        //     mp3.album = "inconnu";
        // });

        // convertFileToBuffer(mp3.path).then(parse)
        //     .then(tag => {
        //         console.log(tag);
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //     })

        // universalParse(mp3.path)
        //     .then(tag => {
        //         console.log(tag);
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //     })

        // mm.parseBlob(mp3.file)
        //     .then( metadata => {
        //         console.log(util.inspect(metadata, {showHidden: false, depth: null}));
        //     })
        //     .catch((err) => {
        //         console.error(err.message);
        //     })
    }*/
}

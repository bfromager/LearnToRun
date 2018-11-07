import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {File} from '@ionic-native/file/ngx';

@Injectable({
        providedIn: 'root',
})
export class FileService  {
    constructor (private platform: Platform, private file: File) {

    }

    public exists(path: string): Promise<boolean>  {
        return new Promise((resolve, reject) => {
            let filePath = path.substring(0, path.lastIndexOf('/') + 1);
            let fileName = path.substring(path.lastIndexOf('/') + 1, path.length);

            if (this.platform.is('android')) {
                console.log("FileService ANDROID");
                this.file.checkFile(filePath, fileName)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        // alert(path + " " + error);
                        reject(error);
                    });
            }
            else {
                console.log("FileService NOT ANDROID");
                if (fileName !== "not a file") {
                    resolve(true);
                }else{
                    reject("not a file");
                }
            }

        });
    }

    public toBuffer(path: string): Promise<any>  {
        return new Promise((resolve, reject) => {
            let filePath = path.substring(0, path.lastIndexOf('/') + 1);
            let fileName = path.substring(path.lastIndexOf('/') + 1, path.length);

            if (this.platform.is('android')) {
                this.file.readAsArrayBuffer(filePath, fileName)
                    .then((arrayBuffer) => {
                        resolve(new Uint8Array(arrayBuffer));
                    })
                    .catch((error) => {
                        // alert(path + " " + error);
                        reject(error);
                    });
            }
            else {
                if (fileName !== "not a file") {
                    resolve(false);
                }else{
                    reject("not a file");
                }
            }

        });
    }
}
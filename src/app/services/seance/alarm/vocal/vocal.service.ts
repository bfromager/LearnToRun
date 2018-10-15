import {Platform} from "@ionic/angular";
import {Injectable} from "@angular/core";
import {TextToSpeech} from '@ionic-native/text-to-speech/ngx';

@Injectable({
    providedIn: 'root',
    useFactory: VocalServiceFactory,
    deps: [Platform/*, TextToSpeech*/],
})
export abstract class VocalService {
    constructor() {
    }

    abstract speech(text: string): Promise <any>;
}

function VocalServiceFactory(platform: Platform /*, textToSpeech: TextToSpeech*/) {
    if (platform.is('cordova')
        && (platform.is('android') || this.platform.is('ios') || this.platform.is('windows'))
    ) {
        let textToSpeech = new TextToSpeech();
        return new VocalServiceTTS(textToSpeech);
    } else {
        return new VocalServiceFake();
    }
}

class VocalServiceTTS {
    constructor (private textToSpeech: TextToSpeech) {

    }

    speech(text: string): Promise <any>{
        return new Promise((resolve, reject) => {
            this.textToSpeech.speak({
                text: text,
                rate: 1.5,
                locale: "fr-FR"
            })
            .then(() => resolve())
            .catch((reason: any) => reject(reason));
        });
    }
}

class VocalServiceFake {
    constructor () {
    }

    speech(text: string): Promise <any>{
        return new Promise((resolve) => {
            console.log("textToSpeech", text);
            resolve();
        });
    }

}

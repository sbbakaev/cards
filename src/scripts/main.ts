import Vue from 'vue/dist/vue.js'
import { words as vocabulary } from './words';
import { shuffle } from 'lodash';

let words = vocabulary.map(word => Object.assign(word, { guessed: false }));
let setSize: number = 3

function getWordsToAsk(): { en: string, ru: string, guessed: boolean }[] {
    let additional: { en: string, ru: string, guessed: boolean }[] = []
    let notGuessed: { en: string, ru: string, guessed: boolean }[] = shuffle(words.filter(word => !word.guessed)).slice(0, setSize)
    if (notGuessed.length < setSize) {
        additional = shuffle(words.filter(word => word.guessed)).slice(0, setSize - notGuessed.length);
    }
    return shuffle([...notGuessed, ...additional]);
}

let data = {
    positionInSet: 0,
    setSize: 3,
    wordsToAsk: [],
    state: 0,
    words: ['hello', 'привет'],
    questions: ['Know the word?', 'Guessed it right?'],
    know: false
}

let methods = {
    yes: function (): string[] {
        this.wordsToAsk[this.positionInSet].guessed = true;
        this.state = 0;
        return this.nextWord();
    },
    no: function (): string[] {
        this.wordsToAsk[this.positionInSet].guessed = false;
        this.state = 0;
        return this.nextWord();
    },
    open: function (): number {
        return this.state = 1;
    },
    nextWord: function (): string[] {
        this.positionInSet++;
        if (this.positionInSet >= this.setSize) {
            this.positionInSet = 0;
            this.wordsToAsk.forEach((asked) => {
                this.words.map((word) => {
                    if (word.en === asked.en) {
                        return asked;
                    } else {
                        return word;
                    }
                });
            });
            this.wordsToAsk = getWordsToAsk();
        }
        return this.words = [this.wordsToAsk[this.positionInSet].en, this.wordsToAsk[this.positionInSet].ru];
    }

};

let hook = function () {
    let words = [];
    this.positionInSet = 0;
    this.wordsToAsk = getWordsToAsk();
    return words = [this.wordsToAsk[this.positionInSet].en, this.wordsToAsk[this.positionInSet].ru];
}

new Vue({
    el: '.wrapper',
    data,
    methods,
    created: hook
});

import Vue from 'vue/dist/vue.js'
import { words as wordsList } from './words';
import { Vocabulary as Vocabulary } from "./vocabulary";

let vocabulary = new Vocabulary(wordsList);

new Vue({
    el: '.wrapper',
    data: {
        vocabulary: vocabulary,
        questions: ['Know the word?', 'Guessed it right?'],
    },
    methods: {
        yes: function (): string[] {
            this.vocabulary.setGuessed(true);
            return this.vocabulary.nextWord();
        },
        no: function (): string[] {
            this.vocabulary.setGuessed(false);
            return this.vocabulary.nextWord();
        },
        open: function (): number {
            return this.vocabulary.state = 1;
        }
    },
    created: function () {
        this.vocabulary.getWordsToAsk();
        this.vocabulary.getCurrentWorld();
    }
});

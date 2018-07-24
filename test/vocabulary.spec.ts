import { expect } from 'chai';
import { Vocabulary } from '../src/scripts/vocabulary';
import { IWord, ISimpleWord } from "../src/scripts/interfaces";

describe("Vocabulary", () => {
    describe("test getWordsToAsk function", () => {
        it("Shoud return words which are not guessed", () => {
            let words: IWord[] = [
                { en: "afraid", ru: "боящийся", guessed: false },
                { en: "antique shop", ru: "антикварный магазин", guessed: true },
                { en: "angry", ru: "злой", guessed: false },
                { en: "annoyed", ru: "раздосадованный", guessed: false },
                { en: "bad-tempered", ru: "раздражительный", guessed: true }
            ];
            let vocabulary = new Vocabulary([]);
            vocabulary.words = words;
            let countNotGuessed: number = 0;
            let wordsToAsk: IWord[] = vocabulary.getWordsToAsk();
            wordsToAsk.forEach(word => {
                if (word.guessed === false) {
                    countNotGuessed++;
                }
            })

            expect(countNotGuessed).to.equal(3);
        });
    });
    describe("test setGuessed function", () => {
        it("Shoud change state to 0 if do not set state param", () => {
            let words: ISimpleWord[] = [
                { en: "afraid", ru: "боящийся" },
                { en: "antique shop", ru: "антикварный магазин" },
                { en: "angry", ru: "злой" },
                { en: "annoyed", ru: "раздосадованный" },
                { en: "bad-tempered", ru: "раздражительный" }
            ];
            let vocabulary = new Vocabulary(words);
            vocabulary.getWordsToAsk();
            vocabulary.state = 1;
            vocabulary.setGuessed(true);

            expect(vocabulary.state).to.equal(0);
        });

        it("Shoud change gues field", () => {
            let words: ISimpleWord[] = [
                { en: "afraid", ru: "боящийся" }
            ];
            let vocabulary = new Vocabulary(words);
            vocabulary.getWordsToAsk();
            vocabulary.setGuessed(true);
            let wordsToAsk = vocabulary.wordsToAsk;

            expect(wordsToAsk[0].guessed).to.equal(true);
        });
    });
});
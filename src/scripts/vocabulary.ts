import { shuffle, NumericDictionary } from 'lodash';
import { IWord, ISimpleWord } from "./interfaces";

export class Vocabulary {
    private _size: number = 3;
    private _words: IWord[] = [];
    private _wordsToAsk: IWord[] = [];
    private _positionInSet: number = 0;
    private _state: number = 0;
    private _currentWord: string[] = ['hello', 'привет'];
    private _guessedQty:number = 0;
    private _notGuessedQty:number = 0;
    
    public constructor(words:ISimpleWord[]){
        this._words = words.map(word => Object.assign(word, { guessed: false }));
        this.updateStatistic();
    }

    public getWordsToAsk(): IWord[] {
        let additional: IWord[] = []
        let notGuessed: IWord[] = shuffle(this._words.filter(word => !word.guessed)).slice(0, this._size)
        if (notGuessed.length < this._size) {
            additional = shuffle(this._words.filter(word => word.guessed)).slice(0, this._size - notGuessed.length);
        }
        
        return this._wordsToAsk = shuffle([...notGuessed, ...additional]);
    }

    public nextWord (): string[] {
        this._positionInSet++;
        if (this._positionInSet >= this._size) {
            this._positionInSet = 0;
            this._wordsToAsk.forEach((asked) => {
                this._words.map((word) => {
                    if (word.en === asked.en) {
                        return asked;
                    } else {
                        return word;
                    }
                });
            });
            
            this._wordsToAsk = this.getWordsToAsk();
        }
        this.updateStatistic();
        return this._currentWord = [
            this._wordsToAsk[this._positionInSet].en,
            this._wordsToAsk[this._positionInSet].ru
        ];
    }

    public updateStatistic(): void {
        let guessedQty = 0;
        let notGuessedQty = 0;
        this._words.forEach(word => {
            if (word.guessed) {
                guessedQty++;
            } else {
                notGuessedQty++
            }
        });
        this._guessedQty = guessedQty;
        this._notGuessedQty = notGuessedQty;
    }
    
    public getCurrentWorld() {
        return this._currentWord = [
            this._wordsToAsk[this._positionInSet].en,
            this._wordsToAsk[this._positionInSet].ru
        ];
    }

    public setGuessed (guessed: boolean, state: number = 0): void {
        this._wordsToAsk[this._positionInSet].guessed = guessed;
        this._state = state;
    }

    public loadNewWords (words: ISimpleWord[]) {
        this._words = words.map(word => Object.assign(word, { guessed: false }));
    }

    public set words(words: IWord[]) {
        this._words = words;
    }

    public get words(): IWord[] {
        return this._words;
    }

    public get state ():number {
        return this._state;
    }

    public set state (state: number) {
        this._state = state;
    }

    public get currentWord ():string[] {
        return this._currentWord;
    }

    public set currentWord (currentWord: string[]) {
        this._currentWord = currentWord;
    }
    
    public get size(): number {
        return this._size;
    }

    public set size(size: number) {
        this._size = size;
    }

    public get guessedQty (): number {
        return this._guessedQty;
    }

    public get notGuessedQty (): number {
        return this._notGuessedQty;
    }
}
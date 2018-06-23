import Vue from 'vue/dist/vue.js'
import { shuffle } from 'lodash'
import vocabulary from './words'

toggle = (options, current) ->
  options[(options.indexOf(current) + 1) % options.length]

# words = [
#   {en: 'word1', ru:'слово1'},
#   {en: 'word2', ru:'слово2'},
#   {en: 'word3', ru:'слово3'},
#   {en: 'word4', ru:'слово4'},
#   {en: 'word5', ru:'слово5'},
#   {en: 'word6', ru:'слово6'},
#   {en: 'word7', ru:'слово7'},
#   {en: 'word8', ru:'слово8'},
#   {en: 'word9', ru:'слово9'},
# ]
words = vocabulary.map((word) -> Object.assign(word, {guessed: false}));
setSize = 3
positionInSet = 0;
wordsToAsk = [];

getWordsToAsk = () ->
  additional = [];
  notGuessed = shuffle(words.filter((word) -> !word.guessed)).slice(0, setSize);
  if notGuessed.length < setSize
    additional = shuffle(words.filter((word) -> word.guessed)).slice(0, setSize - notGuessed.length);
  shuffle [...notGuessed, ...additional];



data = 
  state: 0
  words: ['hello', 'привет']
  questions: ['Know the word?', 'Guessed it right?']
  know: false

methods =
  yes: ->
    wordsToAsk[positionInSet].guessed = yes
    @state = 0
    @nextWord()
  
  no: ->
    wordsToAsk[positionInSet].guessed = no
    @state = 0
    @nextWord()

  open: ->
    @state = 1

  nextWord: ->
    positionInSet++;
    if positionInSet >= setSize
      positionInSet = 0
      wordsToAsk.forEach((asked) -> words = words.map(
        (word) -> if word.en == asked.en then asked else word
      ))
      wordsToAsk = getWordsToAsk()
    @words = [wordsToAsk[positionInSet].en, wordsToAsk[positionInSet].ru]

hooks = 
  created: ->
    positionInSet = 0
    wordsToAsk = getWordsToAsk()
    @words = [wordsToAsk[positionInSet].en, wordsToAsk[positionInSet].ru]

new Vue(Object.assign({
  el: '.card'
  data
  methods
}, hooks))
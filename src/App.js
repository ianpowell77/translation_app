import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){

    const initState = {
      words: [
        { "en": "cat", "de": "Katz", "fr": "chat", "sp": "gato" },
        { "en": "dog", "de": "Hund", "fr": "chien", "sp": "perro" },
        { "en": "man", "de": "Mann", "fr": "homme", "sp": "hombre" },
        { "en": "woman", "de": "Frau", "fr": "femme", "sp": "mujer" },
        { "en": "boy", "de": "Junge", "fr": "garcon", "sp": "chico" },
        { "en": "girl", "de": "Madchen", "fr": "fille", "sp": "niña" },
        { "en": "house", "de": "Haus", "fr": "maison", "sp": "casa" },
        { "en": "car", "de": "Auto", "fr": "voiture", "sp": "coche" },
        { "en": "plane", "de": "Fleugzug", "fr": "avion", "sp": "avión" },
        { "en": "butterfly", "de": "Schmetterling", "fr": "papillon", "sp": "mariposa" },
      ],
      correctGuesses: 0,
      userInput: '',
      currentWord: 0,
      correctGuess: '',
      message: '',
      preLanguage: '',
      postLanguage: '',
      hiddenClass: 'hidden'
    };

    super();
    this.state = initState;

    this.handleChange = this.handleChange.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleGuessClick = this.handleGuessClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);

  }

  handleChange(e){
    let state = Object.assign({}, this.state);
    let userInput = e.target.value;
    state.userInput = userInput;
    this.setState(state);
  }

  handleStartClick(){
    let state = Object.assign({}, this.state);
    let languageFrom = document.getElementById('translate-from').value;
    let languageTo = document.getElementById('translate-to').value;

    state.preLanguage = languageFrom;
    state.postLanguage = languageTo;
    state.hiddenClass = "";

    this.setState(state);
  }

  handleGuessClick(){
    let state = Object.assign({}, this.state);

    if(state.postLanguage === "English"){
      state.correctGuess = this.state.words[this.state.currentWord].en;
    } else if (state.postLanguage === 'German'){
      state.correctGuess = this.state.words[this.state.currentWord].de;
    } else if (state.postLanguage === 'French'){
      state.correctGuess = this.state.words[this.state.currentWord].fr;
    } else {
      state.correctGuess = this.state.words[this.state.currentWord].sp;
    };

    let guess = this.state.userInput.trim();

    if(state.correctGuesses === 9){
      state.message = "Congratulations, you got them all right! Click the reset button below if you'd like to play again.";
      this.setState(state);
    } else if (guess.toUpperCase() === state.correctGuess.toUpperCase()){

      if(state.currentWord + 1 >= state.words.length ){
        state.currentWord = 0;
      }

      state.words.splice(this.state.currentWord, 1); 
      state.correctGuesses++;
      state.message = "Good job, you got it";
      this.setState(state);
    } else {
      if(state.currentWord + 1 >= state.words.length ){
        state.currentWord = 0;
      } else {
        state.currentWord++;
      }
      state.message = "Sorry, that's incorrect, the correct answer was " + state.correctGuess;
      this.setState(state);
    }
  }

  handleResetClick(){
    const initState = {
      words: [
        { "en": "cat", "de": "Katz", "fr": "chat", "sp": "gato" },
        { "en": "dog", "de": "Hund", "fr": "chien", "sp": "perro" },
        { "en": "man", "de": "Mann", "fr": "homme", "sp": "hombre" },
        { "en": "woman", "de": "Frau", "fr": "femme", "sp": "mujer" },
        { "en": "boy", "de": "Junge", "fr": "garcon", "sp": "chico" },
        { "en": "girl", "de": "Madchen", "fr": "fille", "sp": "niña" },
        { "en": "house", "de": "Haus", "fr": "maison", "sp": "casa" },
        { "en": "car", "de": "Auto", "fr": "voiture", "sp": "coche" },
        { "en": "plane", "de": "Fleugzug", "fr": "avion", "sp": "avión" },
        { "en": "butterfly", "de": "Schmetterling", "fr": "papillon", "sp": "mariposa" },
      ],
      correctGuesses: 0,
      userInput: '',
      currentWord: 0,
      correctGuess: '',
      message: '',
      preLanguage: '',
      postLanguage: '',
      hiddenClass: 'hidden'
    };
    this.setState(initState);
  }

  render() {

    const preLanguage = this.state.preLanguage;
    let word;

    if (preLanguage === "English"){ 
      word = this.state.words[this.state.currentWord].en
    } else if (preLanguage === "German"){
      word = this.state.words[this.state.currentWord].de
    } else if (preLanguage === "French"){
      word = this.state.words[this.state.currentWord].fr
    } else {
      word = this.state.words[this.state.currentWord].sp
    }


    return (
      <div className="App">
        <h1>Translation App</h1>

        <p>What language would you like to show on the cards?</p>
        <select id="translate-from">
          <option value="English">English</option>
          <option value="German">German</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
        </select>

        <p>What language will you be translating to?</p>
        <select id="translate-to">
          <option value="English">English</option>
          <option value="German">German</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
        </select>

        <button onClick={this.handleStartClick}>Start</button>

        <div className="pre-card" id={this.state.hiddenClass}>
          <h2>{this.state.preLanguage}</h2>
          <p>{word}</p>
          <input type="text" value={this.state.userInput} onChange={this.handleChange} />
          <button onClick={this.handleGuessClick}>Guess</button>
          <button onClick={this.handleResetClick}>Reset</button>
        </div>

        <h2>{this.state.postLanguage}</h2>
        <h3>{this.state.message}</h3>

      </div>
    );
  }
}

export default App;


// Create a vocabulary study app that allows users to select a language and then get a series of flashcards of words. The user must be able to write the 
// translation of the word and the app will tell them if they are right or wrong. If they are wrong, the correct translation must be shown. Allow the 
// user to loop through the deck as many times as necessary until they get them all correct. Allow the user to reset at any time.


// Step 4: 
// If the user gets the answer correct, take the word out of the deck for this round and show the user how many words correct out of how many words in 
// the deck.

const start = document.querySelector('.content__modal button');
const playAgain = document.querySelectorAll('button.again');
let level, maxhint;
function randomNumber(limit) {
    return Math.floor(Math.random() * limit);
}

class Guess {
    constructor(el) {
        this.el = el;
        this.word;
        this.chosenWord;
        this.total;
        this.hintCount = this.score = 0;
        this.life = 5;
        this.current = 1;
        // List of words that should be guessed
        this.words = ["abandon", "abate", "abdomen", "abdicate", "abhore", "abusive", "abysmal", "accumulate", "accurate", "agile",
                      "babble", "background", "bad", "battle", "bluff", "beauty", "become", "beckon", "bedstraw", "bedroll",
                      "carapace", "card", "cardiology", "cardiovascular", "chink", "chipmunk", "citron", "classism", "constipation", "contagious", 
                      "damp", "danish", "dark", "daube", "deemster", "defecate", "defile", "derisive", "desertification", "detective", 
                      "electronics", "elite", "elixir", "elusive", "embed", "escapism", "eucharist", "euphorbia", "exarch", "exactly"];
        // List of hints for the words
        this.hints = ["[verb] To give up completely or before completion.", "[verb] Make or become less strong.", 
                      "[noun] The lower front part of a person's or animal's body, containing the stomach and intestines.",
                      "[verb] give up or renounce (the throne, a duty, etc).", "[verb] Regard with disgust and hatred", 
                      "[adj.] Rude and insulting.", "[adj.] Extremely bad.", "[adj.] To collect or pile up.", "[adj.] Correct or exact.", 
                      "[adj.] Quick-moving, nimble, active.", 
                      
                      "[verb] Talk in an incoherrent manner.", 
                      "[noun] Part of a scene, picture or description, that servers as a setting to the chief figures or objects and foreground",
                      "[adj.] inferior, inediquate, defective.", "[noun] A prolonged fight between esp. large organized armed forces.", 
                      "[adj.] (of a cliff, or a ship's bows) having a vertical or steep broad front.",
                      "[noun] A combination of qualities that pleases the aesthetic senses.", "[verb] Begin to be.", 
                      "[verb] Attract the attention of; summoned by gesture.", "[noun] Any herbaceous plant of the genus.", 
                      "[noun] Portable bedding rolled into a bundle.", 
                      
                      "[noun] The hard upper shell of a tortoise or a crustacean.", "[noun] Thick stiff papper or thin pasteboard.", 
                      "[noun] The branch of medicine concerned with diseases and abnormalities of the heart.", 
                      "[adj.] Of or relating to the heart and bloood vessels.", "[verb] Make slight ringing sound as of a glasses striking together.", 
                      "[noun] A American ground squirrel of the genus, having alternate light and dark stripes running down the body.", 
                      "[noun] A shrubby tree, bearing large lemon-like fruits.", "[noun] Discrimination on the grounds of social class", 
                      "[noun] difficulty in emptying the bowels.", "[adj.] Likely to transmit disease by conduct.", 
                      
                      "[adj.] Slightly wet.", "[adj.] Of Denmark or the Danes.", "[adj.] With little or no light.", 
                      "[noun] A stew of braised meat with wine etc.", "[noun] A judge in the Isle of Man", "[verb] Discharge faeces from the body.", 
                      "[verb] Make dirty; pollute.", "[adj.] Scoffling; ironical; scornful.", "[noun] The process of making or becoming a desert.", 
                      "[noun] A person, esp. a member of police force, employed to investigate crimes.", 

                      "[noun] The branch of physics and technology concerned with the behavior and movement of electronics in a vacuum gas, semiconductor, etc.", 
                      "[noun] The best of a group.", "[noun] A preparation supposedly able to change metals into gold.", "[adj.] Difficult to find or catch",
                      "[verb] Fix firmly in a surrounding mass.", "[noun] The tendency to seek distraction and relief from reality.", 
                      "[noun] The Chiristian sacrament commemorating the Last Supper, in which bread and wine are consecrated and consumed.", 
                      "[noun] Any plant of genus, including spurges.", 
                      "[noun] In the Orthodox Church, a bishop lower rank than a patriach and having jurisdiction wider than the metropolitan of a divorce of a diocese.", 
                      "[adj.] a\Accurately, precisely; in an exact manner."
                    ]
        // Any 3 letters will be added to the guesser buttons
        this.alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                          'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
                          'u', 'v', 'w', 'x', 'y', 'z'];
        
        this.random = randomNumber(this.words.length);
        this.init();
    }

    init() {
        document.querySelector('.start').classList.add('active_modal');
        this.wordPopulate(this.random);
        this.guessPopulate(this.random);
        this.el.parentElement.querySelector('span.current').textContent = this.current;
        this.initEvent();
    }  
    
    initEvent() {
        this.el.querySelector('.guess').addEventListener('click', e => {
            let target = e.target;
            if(target.localName != 'span') return;
            this.printOnScreen(target.textContent);
            target.classList.add('disabled');
        })

        this.el.querySelector('.hint button').addEventListener('click', () => {
            this.hintCount++
            if(this.hintCount > maxhint) {
                this.el.querySelector('.hint__content').textContent = `You've exhausted all you hints!`;
                this.showHint();
                return;
            }
            this.showHint();
        })

        start.addEventListener('click', () => {
            level = start.parentElement.querySelector('#level').value;    
            start.parentElement.parentElement.classList.remove('active_modal');
            if ( level === 'beginner' ) {
                this.total = 10;
                maxhint = 50;
            } else if ( level === 'intermediate' ) {
                this.total = 15;
                maxhint = 10;
            } else {
                this.total = 20;
                maxhint = 5;
            }
            
            this.el.parentElement.querySelector('span.total').textContent = this.total;
        });

        playAgain.forEach(play => {
            play.addEventListener('click',() => this.restart())
        })
    }

    // Populate the Guess Board
    wordPopulate(wordIndex) {
        this.chosenWord = this.words[wordIndex];
        this.el.querySelector('.hint__content').textContent = this.hints[wordIndex];

        // Get the guess word element
        this.word = this.el.querySelector('.word');
        this.word.textContent = this.words[wordIndex];

        // Split the word so that blank space could be added
        let wordArray = this.word.textContent.split('');
        let itteration;
        if(wordArray.length <= 4) {
            itteration = 2;
        } else if (wordArray === 5 || wordArray === 6) {
            itteration = 3;
        } else {
            itteration = 5;
        }

        for(let i = 0; i < itteration; i++) {
            // Insert a blank char into a random position in the word
            wordArray[randomNumber(this.word.textContent.length - 1)] = ' ';
        }        
        // Join the array to make a word
        this.word.textContent = wordArray.join('');
        charming(this.word);
        // Add the 'blank' class to position with blank char
        [...this.word.childNodes].forEach(el => {
            if(el.textContent != ' ') return;
            el.classList.add('blank');
        })
    }

    // Populate the Guesser buttons
    guessPopulate(wordIndex) {
        // Array to hold the extra letters
        let extraLetters = [];
        let selectedWord = [...this.words[wordIndex].split('')];
        [...this.word.textContent.split('')].forEach((word, idx) => {
            if(word === ' ') {
                extraLetters.push(selectedWord[idx]);
            }
        })
        
        // Adding the extra letters that were randomly selected
        for(let i = 0; i < 4; i++) {
            extraLetters.push(this.alphabets[randomNumber(this.alphabets.length - 1)]);
        }

        // Shuffle the Array
        for (let i = extraLetters.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            [extraLetters[i], extraLetters[j]] = [extraLetters[j], extraLetters[i]]; // swap elements
        }
        
        let word = extraLetters.join('');
        // Add the new word to the board
        let guessWord = this.el.querySelector('.guess');
        guessWord.textContent = word;
        charming(guessWord);
    }
    
    // Print the character on screen
    printOnScreen(chars) {
        // Missing character/letter Array stores the index of the missing letter
        let missingCharIdxs = [];
        // The guessed word is split to an array so the indexes could be matched
        let selectedWordChars = [...this.word.textContent.split('')];
        let wrd = [...this.word.querySelectorAll('span')];
        let current = 0;

        // If the letter is missing save its index the 'missingCharIdxs' array
        selectedWordChars.forEach((char, idx) => {
            if(char != ' ') return
            missingCharIdxs.push(idx)
        })
        
        wrd[missingCharIdxs[current]].classList.remove('blank');
        // Print the pressed button character on the board
        wrd[missingCharIdxs[current]].textContent = chars;

        // If the missing characters have been filled go the next word;
        if(missingCharIdxs[current + 1] ===  undefined) {
            this.nextWord();
            if((this.current + 1) <= 10 ) {
                this.current++
                this.updateNavigation(this.current);
            }
        };
    }

    nextWord() {
        // Increase the score count if the word guessed is correct or else minus life
        if(this.word.textContent === this.chosenWord) {            
            this.score++;
        } else {
            this.minusLife();
        }
        
        // No more lifes? Game Over
        if(this.life == 0) {
            document.querySelector('.modal.fail').classList.add('active_modal'); 
            return;               
        }

        setTimeout(() => {
            this.random++;
            if(this.random >= this.words.length) {
                this.random = 0;
            }
            this.wordPopulate(this.random);
            this.guessPopulate(this.random);
            this.hideHint(); 
        }, 500);
    }

    updateNavigation(next) {
        let current = document.querySelector('.current');
        anime.remove(current);
        anime({
            targets: current,
            duration: 400,
            translateY: [5, -10],
            opacity: [1, 0],
            easing: 'easeInOutSine',
            complete: () => {
                current.textContent = next;
                anime({
                    targets: current,
                    duration: 400,
                    translateY: [5, 0],
                    opacity: [0, 1],
                });
            }
        })
    }

    // Show hint
    showHint() {
        this.el.querySelector('.hint').classList.add('show');
    }

    // Hide hint
    hideHint() {
        this.el.querySelector('.hint').classList.remove('show');
    }

    // Minus life from life count
    minusLife() {
        // If life count is less then or equal to zero return nothing 
        // Can't play with life right!
        if(this.life <= 0) return;

        const lifes = [...this.el.parentElement.querySelectorAll('.life .icon')]        
        lifes[this.life - 1].classList.add('minus');
        this.life--;
    }

    restart() {
        playAgain.forEach(play => {
            play.parentElement.parentElement.classList.remove('active_modal');
        });
        start.parentElement.parentElement.classList.add('active_modal');
        this.score = 0;
        this.hintCount = 0;
        this.life = 5;
        [...this.el.parentElement.querySelectorAll('.life .icon')].forEach(life => {
            life.classList.remove('minus');
        });
        this.hideHint();
        
        this.random = randomNumber(this.words.length);
        this.wordPopulate(this.random);
        this.guessPopulate(this.random);
    }
}

new Guess(document.querySelector('.game-board'))
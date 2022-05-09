class Keyboard {
  constructor() {
    this.main = null;
    this.keysContainer = null;
    this.keys = [];
    this.inputValue = '';
    this.capsLock = false;
    this.shift = false;
    this.language = localStorage.getItem('language') || 'en';
    this.languageFlag = false;
  }

  keyLayout = {
    row1: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
    row2: ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    row3: ['caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter'],
    row4: ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&uarr;', 'shift'],
    row5: ['ctrl', 'win', 'alt', ' ', 'alt', '&larr;', '&darr;', '&rarr;', 'ctrl'],
  };

  keyLayoutRU = {
    row1: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
    row2: ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
    row3: ['caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter'],
    row4: ['shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&uarr;', 'shift'],
    row5: ['ctrl', 'win', 'alt', ' ', 'alt', '&larr;', '&darr;', '&rarr;', 'ctrl'],
  };

  allCodesArray = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];

  canBeCapsLocked = ['`', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '[', ']', ';', "'", ',', '.'];

  canBeCapsLockedRU = ['ё', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'];

  canBeShifted = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '[', ']', '\\', ';', "'", ',', '.', '/'];

  canBeShiftedRU = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '\\', '.'];

  ifShifted = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'];

  ifShiftedRU = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', '/', ','];

  init() {
    // creating main elements
    this.main = document.createElement('div');
    this.input = document.createElement('textarea');
    this.keysContainer = document.createElement('div');
    this.note = document.createElement('div');

    // adding classes for main elements
    this.main.classList.add('container');
    this.input.classList.add('text');
    this.keysContainer.classList.add('keyboard-keys');
    this.note.classList.add('note');
    this.note.innerText = '*Keyboard created in Windows OS \n**Language switching: left alt + left shift';

    // appending main elements
    this.main.append(this.input);
    this.main.append(this.keysContainer);
    this.main.append(this.note);
    document.body.append(this.main);
  }

  createKeys() {
    // this.keysContainer.innerHTML = ''
    // variables
    let languageLayout;
    let languageCaps;

    // checking for language
    if (this.language === 'en') {
      languageLayout = this.keyLayout;
      languageCaps = this.canBeCapsLocked;
    } else {
      languageLayout = this.keyLayoutRU;
      languageCaps = this.canBeCapsLockedRU;
    }

    // loop for creating keys
    for (const row in languageLayout) {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');
      this.keysContainer.append(rowElement);
      for (let i = 0; i < languageLayout[row].length; i += 1) {
        const keyElement = document.createElement('div');
        keyElement.classList.add('key');
        if (languageLayout[row][i] === 'backspace') {
          keyElement.classList.add('backspace-key');
        } else if (languageLayout[row][i] === 'tab') {
          keyElement.classList.add('tab-key');
        } else if (languageLayout[row][i] === 'del') {
          keyElement.classList.add('delete-key');
        } else if (languageLayout[row][i] === '\\') {
          keyElement.classList.add('reversed-slash-key');
        } else if (languageLayout[row][i] === 'caps') {
          keyElement.classList.add('caps-lock-key');
        } else if (languageLayout[row][i] === 'enter') {
          keyElement.classList.add('enter-key');
        } else if (languageLayout[row][i] === 'shift') {
          keyElement.classList.add('shift-key');
          if (document.querySelector('.shift-key')) {
            keyElement.classList.add('right-shift-key');
          } else {
            keyElement.classList.add('left-shift-key');
          }
        } else if (languageLayout[row][i] === 'ctrl') {
          keyElement.classList.add('ctrl-key');
          if (document.querySelector('.ctrl-key')) {
            keyElement.classList.add('right-ctrl-key');
          } else {
            keyElement.classList.add('left-ctrl-key');
          }
        } else if (languageLayout[row][i] === ' ') {
          keyElement.classList.add('space-key');
        } else if (languageLayout[row][i] === 'alt') {
          keyElement.classList.add('alt-key');
          if (document.querySelector('.alt-key')) {
            keyElement.classList.add('right-alt-key');
          } else {
            keyElement.classList.add('left-alt-key');
          }
        }

        // "capsable/shiftable" class, if letter can be caps locked or shifted
        if (languageCaps.includes(languageLayout[row][i])) {
          keyElement.classList.add('capsable');
        }
        if (this.language === 'en') {
          if (this.canBeShifted.includes(languageLayout[row][i])) {
            keyElement.classList.add('shiftable');
          }
        } else if (this.canBeShiftedRU.includes(languageLayout[row][i])) {
          keyElement.classList.add('shiftable');
        }

        // appending keys
        keyElement.innerHTML = languageLayout[row][i];
        rowElement.append(keyElement);
      }
    }

    // setting attributes
    const keys = document.querySelectorAll('.key');
    for (let i = 0; i < keys.length; i += 1) {
      keys[i].setAttribute('keyCode', this.allCodesArray[i]);
    }
  }

  toCaps() {
    // variables
    const capsableKeys = document.querySelectorAll('.capsable');

    // checking caps lock pressed or not
    if (this.capsLock === false) {
      this.capsLock = true;
      for (const key of capsableKeys) {
        key.innerText = key.innerText.toUpperCase();
      }
    } else {
      this.capsLock = false;
      for (const key of capsableKeys) {
        key.innerText = key.innerText.toLowerCase();
      }
    }
  }

  toShift() {
    if (!this.shift) {
      const shiftableKeys = document.querySelectorAll('.shiftable');
      const capsableKeys = document.querySelectorAll('.capsable');

      for (const key of capsableKeys) {
        key.innerText = key.innerText.toUpperCase();
      }
      if (this.language === 'en') {
        for (let i = 0; i < shiftableKeys.length; i += 1) {
          shiftableKeys[i].innerHTML = this.ifShifted[i];
        }
      } else {
        for (let i = 0; i < shiftableKeys.length; i += 1) {
          shiftableKeys[i].innerHTML = this.ifShiftedRU[i];
        }
      }
    }
    this.shift = true;
  }

  toUnshift() {
    this.shift = false;

    const shiftableKeys = document.querySelectorAll('.shiftable');
    const capsableKeys = document.querySelectorAll('.capsable');

    for (const key of capsableKeys) {
      key.innerText = key.innerText.toLowerCase();
    }
    if (this.language === 'en') {
      for (let i = 0; i < shiftableKeys.length; i += 1) {
        shiftableKeys[i].innerHTML = this.canBeShifted[i];
      }
    } else {
      for (let i = 0; i < shiftableKeys.length; i += 1) {
        shiftableKeys[i].innerHTML = this.canBeShiftedRU[i];
      }
    }
  }

  toLanguage() {
    const keys = document.querySelectorAll('.key');
    let keyLayoutArray = [];
    if (kbrd.language === 'en') {
      for (const row in this.keyLayoutRU) {
        keyLayoutArray = keyLayoutArray.concat(this.keyLayoutRU[row]);
      }
      kbrd.language = 'ru';
      localStorage.setItem('language', 'ru');
    } else {
      for (const row in this.keyLayout) {
        keyLayoutArray = keyLayoutArray.concat(this.keyLayout[row]);
      }
      kbrd.language = 'en';
      localStorage.setItem('language', 'en');
    }

    for (let i = 0; i < keys.length; i += 1) {
      keys[i].innerHTML = keyLayoutArray[i];
      if (kbrd.language === 'en') {
        if (this.canBeShifted.includes(keys[i].innerHTML)) {
          keys[i].classList.add('shiftable');
        } else {
          keys[i].classList.remove('shiftable');
        }
      } else if (this.canBeShiftedRU.includes(keys[i].innerHTML)) {
        keys[i].classList.add('shiftable');
      } else {
        keys[i].classList.remove('shiftable');
      }
    }

    if (this.capsLock) {
      document.querySelector('.caps-lock-key').classList.remove('active');
      this.capsLock = false;
    }
  }

  addEventListeners() {
    // variables
    const keys = document.querySelectorAll('.key');

    // adding listeners
    // 1. keydown
    function keyDown(e) {
      e.preventDefault();
      for (let i = 0; i < keys.length; i += 1) {
        // if pressed caps
        if (e.code === keys[i].getAttribute('keyCode') && e.code === 'CapsLock') {
          keys[i].classList.toggle('active');
          kbrd.toCaps();
        } else if (e.code === keys[i].getAttribute('keyCode')) {
          keys[i].classList.add('active');
          const cursor = kbrd.input.selectionStart;
          let inputValue = kbrd.input.value;
          if (e.code === 'Tab') {
            kbrd.input.value = `${inputValue.slice(0, cursor)}\t${inputValue.slice(cursor)}`;
            kbrd.input.selectionStart = cursor + 1;
            kbrd.input.selectionEnd = cursor + 1;
          } else if (e.code === 'Backspace') {
            if (cursor > 0) {
                kbrd.input.value = inputValue.slice(0, cursor - 1) + inputValue.slice(cursor);
              kbrd.input.selectionStart = cursor - 1;
              kbrd.input.selectionEnd = cursor - 1;
            }
          } else if (e.code === 'Enter') {
            kbrd.input.value = `${inputValue.slice(0, cursor)}\n${inputValue.slice(cursor)}`;
            kbrd.input.selectionStart = cursor + 1;
            kbrd.input.selectionEnd = cursor + 1;
          } else if (e.key !== 'Control' && e.key !== 'Shift' && e.key !== 'Alt' && e.key !== 'Meta') {
            kbrd.input.value = inputValue.slice(0, cursor) + keys[i].innerHTML + inputValue.slice(cursor);
            kbrd.input.selectionStart = cursor + 1;
            kbrd.input.selectionEnd = cursor + 1;
          }
        }
      }

      if (e.key === 'Shift') {
        kbrd.toShift();
      }

      if (e.code === 'AltLeft') {
        kbrd.languageFlag = true;
        setTimeout(() => {
          kbrd.languageFlag = false;
        }, 200);
      }

      if (e.code === 'ShiftLeft' && kbrd.languageFlag) {
        kbrd.toLanguage();
        kbrd.languageFlag = false;
      }
    }

    window.addEventListener('keydown', keyDown);

    // 2. keyup
    function keyUp(e) {
      for (let i = 0; i < keys.length; i += 1) {
        if (e.code === keys[i].getAttribute('keyCode') && e.code !== 'CapsLock') {
          keys[i].classList.remove('active');
        }
      }
      if (e.key === 'Shift') {
        kbrd.toUnshift();
      }
    }
    window.addEventListener('keyup', keyUp);

    // 3. click on key
    function click(e) {
      const attribute = e.target.getAttribute('keyCode');
      for (let i = 0; i < keys.length; i += 1) {
        if (attribute === keys[i].getAttribute('keyCode') && attribute === 'CapsLock') {
          keys[i].classList.toggle('active');
          kbrd.toCaps();
        } else if ((attribute === keys[i].getAttribute('keyCode') && attribute === 'ShiftLeft') || (attribute === keys[i].getAttribute('keyCode') && attribute === 'ShiftRight')) {
          keys[i].classList.toggle('active');
        } else if (attribute === keys[i].getAttribute('keyCode')) {
          keys[i].classList.add('active');
          setTimeout(() => keys[i].classList.remove('active'), 100);
          const cursor = kbrd.input.selectionStart;
          let inputValue = kbrd.input.value;
          if (attribute === 'Tab') {
            kbrd.input.value = `${inputValue.slice(0, cursor)}\t${inputValue.slice(cursor)}`;
            kbrd.input.selectionStart = cursor + 1;
            kbrd.input.selectionEnd = cursor + 1;
          } else if (attribute === 'Backspace') {
            if (cursor > 0) {
              kbrd.input.value = inputValue.slice(0, cursor - 1) + inputValue.slice(cursor);
              kbrd.input.selectionStart = cursor - 1;
              kbrd.input.selectionEnd = cursor - 1;
            }
          } else if (attribute === 'Enter') {
            kbrd.input.value = `${inputValue.slice(0, cursor)}\n${inputValue.slice(cursor)}`;
            kbrd.input.selectionStart = cursor + 1;
            kbrd.input.selectionEnd = cursor + 1;
          } else if (attribute !== 'ControlLeft' && attribute !== 'ControlRight' && attribute !== 'ShiftLeft' && attribute !== 'ShiftRight' && attribute !== 'AltLeft' && attribute !== 'AltRight' && attribute !== 'MetaLeft') {
            kbrd.input.value = inputValue.slice(0, cursor) + keys[i].innerHTML + inputValue.slice(cursor);
            kbrd.input.selectionStart = cursor + 1;
            kbrd.input.selectionEnd = cursor + 1;
          }
        }
      }
      if (attribute === 'ShiftLeft' || attribute === 'ShiftRight') {
        if (kbrd.shift) {
          kbrd.toUnshift();
          // if (kbrd.capsLock) {
          //     kbrd.toCaps()
          // }
        } else {
          kbrd.toShift();
          // if (kbrd.capsLock) {
          //     kbrd.toCaps()
          // }
        }
      }
    }
    this.keysContainer.addEventListener('click', click);
  }
}

const kbrd = new Keyboard();
kbrd.init();
kbrd.createKeys();
kbrd.addEventListeners();

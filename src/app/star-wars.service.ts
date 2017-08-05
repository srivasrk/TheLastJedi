import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
  private logService: LogService;

  charactersChanged = new Subject<void>();

  private characters = [
    { name: 'Luke Skywalker', side: ''},
    { name: 'Darth Vader', side: ''},
    { name: 'Obi Wan', side: ''}
  ];

  constructor(logService: LogService) {
    this.logService = logService;
  }

  getCharacters(chosenList) {

    if (chosenList === 'all') {
      return this.characters.slice();
    }

    return this.characters.filter((character) => {
      return character.side === chosenList;
    })
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    })

    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of ' + charInfo.name + '. New side: ' + charInfo.side);
  }

  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    })

    if (pos !== -1) {
      return;
    }

    const newChar = {name: name, side: side};
    this.characters.push(newChar);
  }

}

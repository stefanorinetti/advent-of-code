import { readFile } from 'fs/promises';

class Rules {
  #StandardHandshapeEnum;
  #StandardHandshapeMapperEnum;
  #HandshapePointsEnum;
  #WinningMapperEnum;
  #OutcomeEnum;
  #OutcomePointsEnum;
  #DesiredOutcomeMapperEnum;

  constructor() {
    this.#StandardHandshapeEnum = {
      ROCK: 'rock',
      PAPER: 'paper',
      SCISSOR: 'scissor',
    };
    this.#StandardHandshapeMapperEnum = {
      A: this.#StandardHandshapeEnum.ROCK,
      B: this.#StandardHandshapeEnum.PAPER,
      C: this.#StandardHandshapeEnum.SCISSOR,
    };
    this.#HandshapePointsEnum = {
      [this.#StandardHandshapeEnum.ROCK]: 1,
      [this.#StandardHandshapeEnum.PAPER]: 2,
      [this.#StandardHandshapeEnum.SCISSOR]: 3,
    };
    this.#OutcomeEnum = {
      WINNER: 'winner',
      DRAW: 'draw',
      LOSER: 'loser',
    };
    this.#OutcomePointsEnum = {
      [this.#OutcomeEnum.WINNER]: 6,
      [this.#OutcomeEnum.DRAW]: 3,
      [this.#OutcomeEnum.LOSER]: 0,
    };
    this.#WinningMapperEnum = {
      [this.#StandardHandshapeEnum.ROCK]: this.#StandardHandshapeEnum.SCISSOR,
      [this.#StandardHandshapeEnum.SCISSOR]: this.#StandardHandshapeEnum.PAPER,
      [this.#StandardHandshapeEnum.PAPER]: this.#StandardHandshapeEnum.ROCK,
    };
    this.#DesiredOutcomeMapperEnum = {
      X: this.#getLosingHandshape,
      Y: this.#getDrawingHandshape,
      Z: this.#getWinningHandshape,
    };
  }

  #getLosingHandshape = (opponentChoice) => {
    return this.#WinningMapperEnum[opponentChoice];
  }

  #getDrawingHandshape = (opponentChoice) => {
    return opponentChoice;
  }

  #getWinningHandshape = (opponentChoice) => {
    return Object.keys(this.#WinningMapperEnum).find(key => this.#WinningMapperEnum[key] === opponentChoice);
  }

  #toStandardHandshape = (handshape) => {
    return this.#StandardHandshapeMapperEnum[handshape];
  }

  #calculateOutcome = (playerOneChoice, playerTwoChoice) => {
    const results = {};
    if(playerOneChoice === playerTwoChoice) {
      results.playerOne = this.#OutcomeEnum.DRAW;
      results.playerTwo = this.#OutcomeEnum.DRAW;
    }
    if(this.#WinningMapperEnum[playerOneChoice] === playerTwoChoice) {
      results.playerOne = this.#OutcomeEnum.WINNER;
      results.playerTwo = this.#OutcomeEnum.LOSER;
    }
    if(this.#WinningMapperEnum[playerTwoChoice] === playerOneChoice) {
      results.playerOne = this.#OutcomeEnum.LOSER;
      results.playerTwo = this.#OutcomeEnum.WINNER;
    }
    return results;
  }

  enforce = (playerOneChoice, desiredOutcome) => {
    const standardPlayerOneChoice = this.#toStandardHandshape(playerOneChoice);
    const standardPlayerTwoChoice = this.#DesiredOutcomeMapperEnum[desiredOutcome](standardPlayerOneChoice);
    const outcome = this.#calculateOutcome(standardPlayerOneChoice, standardPlayerTwoChoice);
    const playerOnePoints = this.#HandshapePointsEnum[standardPlayerOneChoice] + this.#OutcomePointsEnum[outcome.playerOne];
    const playerTwoPoints = this.#HandshapePointsEnum[standardPlayerTwoChoice] + this.#OutcomePointsEnum[outcome.playerTwo];
    return { playerOne: playerOnePoints, playerTwo: playerTwoPoints };
  }
}

class Match {
  #playerPoints = 0;
  #rules;

  constructor(rules = new Rules()) {
    this.#rules = rules;
  }

  get playerPoints() {
    return this.#playerPoints;
  }

  playRound = (opponentChoice, desiredOutcome) => {
    const points = this.#rules.enforce(opponentChoice, desiredOutcome);
    this.#playerPoints += points.playerTwo;
  }
}

async function main() {
  const input = (await readFile('./input.txt')).toString();
  const match = new Match();
  input.split("\n").forEach(strategy => {
    const [opponentChoice, desiredOutcome] = strategy.split(" ");
    match.playRound(opponentChoice, desiredOutcome);
  });
  return match.playerPoints;
}

console.log(await main());

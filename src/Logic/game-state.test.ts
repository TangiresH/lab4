import { describe, test, expect } from '@jest/globals';

import { GameState } from './game-state';
import { Coordinates, GameStateInterface } from 'interfaces';

const nextStep_test_dataset = [
  {
    shape: [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],
    landscape: [],
    height: 10,
    width: 5,
    expectedOutput: [
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ],
  },
  {
    shape: [
      { x: 4, y: 3 },
      { x: 5, y: 3 },
      { x: 6, y: 3 },
      { x: 7, y: 3 },
    ],
    landscape: [],
    height: 10,
    width: 5,
    expectedOutput: [
      { x: 5, y: 3 },
      { x: 6, y: 3 },
      { x: 7, y: 3 },
      { x: 8, y: 3 },
    ],
  },
  {
    shape: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ],
    landscape: [],
    height: 10,
    width: 5,
    expectedOutput: [
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
    ],
  },
];

const getField_test_dataset = [
  {
    shape: [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],
    landscape: [
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 4, y: 4 },
    ],
    height: 5,
    width: 5,
    expectedOutput: ['.....', '.pp..', '.pp..', '.....', '#####'],
  },
  {
    shape: [
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 2, y: 4 },
    ],
    landscape: [
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 5, y: 0 },
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 5, y: 3 },
      { x: 5, y: 4 },
      { x: 5, y: 5 },
    ],
    height: 6,
    width: 6,
    expectedOutput: [
      '......',
      '..pp..',
      '...pp.',
      '......',
      '##....',
      '######',
    ],
  },
  {
    shape: [
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 2, y: 4 },
    ],
    landscape: [
      { x: 4, y: 4 },
      { x: 5, y: 0 },
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 5, y: 3 },
      { x: 5, y: 4 },
      { x: 5, y: 5 },
    ],
    height: 6,
    width: 7,
    expectedOutput: [
      '...p...',
      '...p...',
      '...pp..',
      '.......',
      '....#..',
      '######.',
    ],
  },
];

describe('GameState', () => {
  test('should create an instance of GameState', () => {
    const gameState: GameStateInterface<Coordinates> = new GameState(
      [],
      [],
      10,
      5
    );
    expect(gameState).toBeInstanceOf(GameState);
  });

  describe('nextStep()', () => {
    nextStep_test_dataset.forEach((dataset) =>
      test('should increase every x-coord of shape by 1 and dont set collision=true', () => {
        const { shape, landscape, height, width, expectedOutput } = dataset;
        const gameState: GameStateInterface<Coordinates> = new GameState(
          shape,
          landscape,
          height,
          width
        );
        gameState.nextStep();

        expect(gameState.collision).toBe(false);
        expect(gameState.getCoordShape()).toEqual(expectedOutput);
      })
    );
  });

  describe('checkCollision()', () => {
    test('should set collision=true when shape overlaps landscape', () => {
      const shape = [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ];
      const landscape = [
        { x: 3, y: 2 },
        { x: 4, y: 4 },
        { x: 5, y: 4 },
        { x: 5, y: 5 },
      ];
      const height = 10;
      const width = 10;
      const gameState: GameStateInterface<Coordinates> = new GameState(
        shape,
        landscape,
        height,
        width
      );
      gameState.nextStep();

      expect(gameState.collision).toBe(true);
    });
  });

  describe('getField()', () => {
    getField_test_dataset.forEach((dataset) =>
      test('should create and return correct field', () => {
        const { shape, landscape, height, width, expectedOutput } = dataset;
        const gameState: GameStateInterface<Coordinates> = new GameState(
          shape,
          landscape,
          height,
          width
        );
        const field = gameState.getField();

        expect(field).toEqual(expectedOutput);
      })
    );
  });

  describe('getCoordShape()', () => {
    test('should return coordShape value', () => {
      const shape = [
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 2, y: 4 },
      ];
      const landscape = [];
      const height = 10;
      const width = 10;
      const gameState: GameStateInterface<Coordinates> = new GameState(
        shape,
        landscape,
        height,
        width
      );

      expect(gameState.getCoordShape()).toEqual(shape);
    });
  });
});

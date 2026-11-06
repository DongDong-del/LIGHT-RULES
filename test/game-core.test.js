import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp,
  distanceToSegment,
  isReceiverLit,
  gestureTransform,
  isNewVersion,
} from '../src/game-core.js';

test('clamp keeps zoom inside supported bounds', () => {
  assert.equal(clamp(0.2, 0.65, 2.4), 0.65);
  assert.equal(clamp(3, 0.65, 2.4), 2.4);
  assert.equal(clamp(1.4, 0.65, 2.4), 1.4);
});

test('distanceToSegment measures against a thick beam center line', () => {
  assert.equal(distanceToSegment({ x: 5, y: 3 }, { x: 0, y: 0 }, { x: 10, y: 0 }), 3);
  assert.equal(distanceToSegment({ x: -4, y: 0 }, { x: 0, y: 0 }, { x: 10, y: 0 }), 4);
});

test('receiver lights only when matching beam reaches its radius', () => {
  const receiver = { x: 20, y: 10, radius: 10, color: '#36f1cd' };
  const beam = { a: { x: 0, y: 5 }, b: { x: 30, y: 5 }, width: 6, color: '#36f1cd' };
  assert.equal(isReceiverLit(receiver, [beam]), true);
  assert.equal(isReceiverLit({ ...receiver, color: '#ff4fd8' }, [beam]), false);
});

test('two-finger gesture zooms around its moving midpoint', () => {
  const result = gestureTransform(
    { scale: 1, x: 10, y: 20 },
    { midpoint: { x: 100, y: 100 }, distance: 100 },
    { midpoint: { x: 120, y: 110 }, distance: 150 },
  );
  assert.equal(result.scale, 1.5);
  assert.deepEqual(result, { scale: 1.5, x: -15, y: -10 });
});

test('version comparison ignores identical builds and flags a changed build', () => {
  assert.equal(isNewVersion('2026-11-06-a', '2026-11-06-a'), false);
  assert.equal(isNewVersion('2026-11-06-a', '2026-11-06-b'), true);
});

# @node-libraries/semaphore

Implement virtual semaphore for asynchronous processing

## usage

```ts
// Importing packages
import { semaphore } from "@node-libraries/semaphore";
// Instance Creation
const s = semaphore();
// Synchronization Lock
await s.acquire();
// Synchronization lock release
s.release();
// Wait until all locks are unlocked.
await s.all();
```

```ts
// Specify maximum number of parallels
const s = semaphore(5);
```

## example

```ts
import { semaphore } from "@node-libraries/semaphore";

const f = (value: string) =>
  new Promise<void>((resolve) => {
    console.timeLog("debug", value);
    setTimeout(resolve, 1000);
  });

const main = async () => {
  console.time("debug");
  const s = semaphore();
  ["A", "B", "C", "D", "E"].forEach(async (v) => {
    await s.acquire();
    await f(v);
    s.release();
  });
  await s.all(); // Wait for everything to be finished.
  console.timeLog("debug", "end");
};
main();

/* Result
debug: 0.197ms A
debug: 1.014s B
debug: 2.027s C
debug: 3.039s D
debug: 4.040s E
debug: 5.050s end
*/
```

```ts
import { semaphore } from "@node-libraries/semaphore";

const f = (value: string) =>
  new Promise<void>((resolve) => {
    console.timeLog("debug", value);
    setTimeout(resolve, 1000);
  });

const main = async () => {
  console.time("debug");
  const s = semaphore(2);
  ["A", "B", "C", "D", "E"].forEach(async (v) => {
    await s.acquire();
    await f(v);
    s.release();
  });
  await s.all(); // Wait for everything to be finished.
  console.timeLog("debug", "end");
};
main();

/* Result
debug: 0.19ms A
debug: 1.826ms B
debug: 1.005s C
debug: 1.005s D
debug: 2.012s E
debug: 3.028s end
*/
```

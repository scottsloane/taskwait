# taskwait
await-ible task list

## Usage

### Installing

``npm install taskwait``

### including

```javascript
// With default options
const tasks = require('taskwait')();

// With custom options
const tasks = require('taskwait')({
    attempts: 15,
    interval: 100
});

// For more than one list
const TaskWait = require('taskwait');
const ATasks = TaskWait();
const BTasks = TaskWait();

```

### Options

#### attempts
Number of iterval attempts to wait for tasks to complete before wait will resolve anyway. (attempts x interval = timeout in ms) *set to -1 for unlimited*

#### interval
Number of miliseconds between checks

### Functions

#### start([id[, fn]])
Starts a task. The function will accept a custom id. If an id is not supplied one will be generated. The function can also take a task function wich will be automatically started and finished. 
- Returns an id if no function or id were supplied. 
- Returns a promise if a function was supplied

#### finsih(id)
Finishes a task. If a task was started with out a function. Call this whenever the task has been compelte (great for things like 3rd party interactions);

#### async wait()
Waits for all started tasks to complete before resolving.

- returns a awaitable promise

### Examples

#### Using a task
```javascript
let task_id = tasks.start();
await doStuff();
tasks.finsih(task_id);
```

#### Using a task with custom id
```javascript
tasks.start(id);
// do stuff
tasks.finish(id);
```

#### Adding a task with a function
```javascript
await tasks.start(id, ()=>{
    return new Promise(async(resolve, reject)=>{
        await doStuff();
        return resolve();
    })
});
```

#### Waiting elsewhere in code
```Javascript
await tasks.wait();
```


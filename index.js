import { Task } from "./task.js";
import { User } from "./user.js";

const task = new Task('учить TypeScript');
const damir = new User(task);
console.log(damir)
damir.do()
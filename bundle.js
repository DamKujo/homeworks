(function () {
    'use strict';

    class Task{
        constructor(task){
            this.task = task;
        }
        run(){
            console.log(this.task);
        }
    }

    class User{
        constructor(hisTask){
            this.hisTask = hisTask;
        }
        do(){
            this.hisTask.run();
        }
    }

    const task = new Task('учить TypeScript');
    const damir = new User(task);
    console.log(damir);
    damir.do();

})();

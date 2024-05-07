export class User{
    constructor(hisTask){
        this.hisTask = hisTask;
    }
    do(){
        this.hisTask.run();
    }
}
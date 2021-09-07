
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Constants
 * DateTime = Thu Sep 02 2021 20:42:50 GMT+0800 (中国标准时间)
 * Author = ljp666
 * FileBasename = Constants.ts
 * FileBasenameNoExtension = Constants
 * URL = db://assets/script/Constants.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('Constants')
export class Constants{
    public static GROUP ={
        HERO:1,
        CLOUD:2,
        PROP:4
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */

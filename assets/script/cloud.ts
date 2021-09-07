
import { _decorator, Component, Node, RigidBody } from 'cc';
import { Constants } from './Constants';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Cloud
 * DateTime = Fri Sep 03 2021 00:32:06 GMT+0800 (中国标准时间)
 * Author = ljp666
 * FileBasename = cloud.ts
 * FileBasenameNoExtension = cloud
 * URL = db://assets/script/cloud.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('Cloud')
export class Cloud extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        let rigidbody=this.node.getComponent(RigidBody)
        rigidbody.setGroup(Constants.GROUP.CLOUD)
        rigidbody.setMask(Constants.GROUP.HERO)
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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

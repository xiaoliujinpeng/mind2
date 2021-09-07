
import { _decorator, Component, Node, Vec3, systemEvent, SystemEvent,EventMouse, Animation, EventTouch, Touch, RigidBody, Collider, ITriggerEvent, ICollisionEvent } from 'cc';
import { Constants } from './Constants';
const { ccclass, property } = _decorator;

@ccclass('PlayController')
export class PlayController extends Component {
    @property({
        type:Animation
    })
    cocosAnim:Animation | null = null
    private _startJump=false   //是否开始跳跃
    private _jumpStep=0      //跳跃的步长
    private _curJumpTime=0  //当前时间
    private _jumpTime=0.5   //跳跃的时间间隔
    private _curJumpSpeed=0  //跳跃的速度
    private _curPos=new Vec3()  //当前位置
    private _targetPost = new Vec3()  //目标位置
    private _deltaPos = new Vec3()  //移动差
    private _isMoving = false    //判断是跳跃状态
    private _curMoveIndex=0  //当前移动到哪个格子上
    private _runningSpeed=1.5  //人物移动的速度
    private _active = false

    start () {
        let rigidBody = this.node.getComponent(RigidBody)
        let collider = this.node.getComponent(Collider)
        collider.on("onCollisionEnter",this.onTrigger,this)
        rigidBody.setGroup(Constants.GROUP.HERO)
        rigidBody.setGroup(-1)
    }
    onTrigger(event:ICollisionEvent){
        if(event.otherCollider.node.name.startsWith("cloud")){
            return
        }
        
    }
    reset(){
        this._curMoveIndex=0
        this.node.setPosition(0,-1.8,0)
    }

    setInputActive(active:boolean){
        this._active = active
        if(active){
            // 监听鼠标的点击事件
            systemEvent.on(SystemEvent.EventType.TOUCH_START,this.onTouchUp,this)
            this.cocosAnim.play("cocos_anim_run")
        }else{
            //取消对鼠标的监听
            systemEvent.off(SystemEvent.EventType.TOUCH_START,this.onTouchUp,this)
        }
    }

    //鼠标点击的处理事件
    onTouchUp(touch:Touch,event:EventTouch){

        //鼠标左键是跳一步
        console.log("event得出的触点的X坐标",event.getLocationX(),"touch得出的触点的X坐标为",touch.getLocationX());
        
        if(event.getLocationX()<=600){
            this.jumpByStep(1)
        }
        // 鼠标右键是跳两步
        else{
            this.jumpByStep(2)
        }

    }

    // 跳跃的函数，接受步长参数
    jumpByStep(step:number){
        if(this._isMoving){
            return
        }
        this._startJump=true
        this._jumpStep=step

        //获取跳跃的速度，因为跳跃的时间不变，则用步长除以跳跃的时间可得到跳跃的速度
        this._curJumpSpeed = this._jumpStep / this._jumpTime  
        // 将当前的跳跃时间设置为零
        this._curJumpTime = 0 

        //获取此组件绑定节点的位置，并且将它存入到 _curPos变量中
        this.node.getPosition(this._curPos)


        // 获取目标位置的坐标，就是用当前位置加上步长即可
        Vec3.add(this._targetPost,this._curPos,new Vec3(step,0,0))


        if(this.cocosAnim){
            this.cocosAnim.getState("cocos_anim_jump").speed=3
            this.cocosAnim.play("cocos_anim_jump")
        }

        this._curMoveIndex+=step
    }

    onOnceJumpEnd(){
        this._isMoving=false
        if(this.cocosAnim){
            // this.cocosAnim.play("cocos_anim_idle")
            this.cocosAnim.play("cocos_anim_run")
        }
        this.node.emit("jump_end",this._curMoveIndex)
    }
    //deltaTime是每一帧的间隔时间
    update (deltaTime: number) {
        
        if(this._active){
            if(this._startJump){
                this._curJumpTime += deltaTime
                if(this._curJumpTime>this._jumpTime){
                    this.node.setPosition(this._targetPost)
                    this._startJump=false
                    this.onOnceJumpEnd()
                }else{
                    this.node.getPosition(this._curPos)
                    this._deltaPos.x = this._curJumpSpeed * deltaTime
                    Vec3.add(this._curPos,this._deltaPos,this._curPos)
                    this.node.setPosition(this._curPos)
                    this._isMoving=true
                }
            }else{
                this.node.getPosition(this._curPos)
                this._deltaPos.x = this._runningSpeed * deltaTime
                Vec3.add(this._curPos,this._deltaPos,this._curPos)
                this.node.setPosition(this._curPos)
            }
        }
    } 
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */

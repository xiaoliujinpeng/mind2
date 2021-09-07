
import { _decorator, Component, Node, Prefab, instantiate, logID, TiledUserNodeData } from 'cc';
import { PlayController } from './playController';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Thu Aug 26 2021 21:35:45 GMT+0800 (中国标准时间)
 * Author = ljp666
 * FileBasename = gameManager.ts
 * FileBasenameNoExtension = gameManager
 * URL = db://assets/script/gameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

enum BlockType {
    BT_NONE,
    BT_STONE
}
 
enum GameState{
    GS_INIT,
    GS_PLAYING,
    GS_END,
}

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab)
    curPrefab:Prefab | null = null


    控制游戏状态的变量
    @property(PlayController)
    playCtrl:PlayController |null = null

    //开始菜单节点
    @property(Node)
    startMenu:Node | null = null

    @property(Node)
    endMenu:Node | null = null

    // 设置道路的长度
    @property
    roadLength=50


    // 存放道路的列表
    private _road:BlockType[] = []

    //当前游戏状态的变量
    private _curState:GameState = null;


    set curState(value:GameState){
        switch(value){
            case GameState.GS_PLAYING:
                this.playing()
                break
            case GameState.GS_END:
                this.end()
                break
            default:
                this.init()
        }
    }

    // 初始化
    init(){
            this.generateRoad()
            this.startMenu.active=true
            this.endMenu.active=false
            this.playCtrl.setInputActive(false)
            this.playCtrl.reset()
    }

    playing(){
        this._curState=GameState.GS_PLAYING
            if(this.startMenu){
                this.startMenu.active=false
                setTimeout(()=>{
                    this.playCtrl.setInputActive(true)
                },0.5)
            }
    }


    end(){
        
        this._curState=GameState.GS_END
        this.endMenu.active=true
        this.playCtrl.setInputActive(false)
    }


    // 重新开始游戏
    restart(){
        this.generateRoad()
        this.playCtrl.reset()
        setTimeout(()=>{
            this.playCtrl.setInputActive(true)
        },0.3)
        this.endMenu.active = false
    }


    //返回到初始页面
    go_back(){
        this.startMenu.active=true
        this.endMenu.active=false
        this.playCtrl.reset()
        this.generateRoad()
        this.playCtrl.setInputActive(false)
    }




    start () {

        //默认情况下为初始化状态
        this.curState = GameState.GS_INIT
        this.playCtrl.node.on("jump_end",this.onJumpEnd,this)
    }


    onJumpEnd(moveIndex:number){
        if(moveIndex<this.roadLength){
            if(this._road[moveIndex]===BlockType.BT_NONE){
                this.curState=GameState.GS_END
            }
        }else{
            this.curState = GameState.GS_INIT
        }
    }

    //生成道路的函数
    generateRoad(){
        this.node.removeAllChildren()
        this._road.length=0

        //第一块道路肯定不能会空
        this._road.push(BlockType.BT_STONE)

        // 按照长度生成道路
        for(let i=1;i<this.roadLength;i++){

            // 如果上一块为空，那么下一块一定不能为空
            if(this._road[i-1]===BlockType.BT_NONE){
                this._road.push(BlockType.BT_STONE)

            }else{
                // 如果上一块不为空，那么下一块随机生成
                this._road.push(Math.floor(Math.random()*2))
            }
        }

        //将生成的道路实例化具体的节点
        for(let j=0;j<this.roadLength;j++){
            // 生成具体的节点
            const child=this.spwanBlockByType(this._road[j])
            if(child){
                this.node.addChild(child)
                child.setPosition(j,0,0)
            }
        }
    }

    // 生成具体节点的函数,如果为道路为空则返回null 
    spwanBlockByType(type:BlockType){
        if(!this.curPrefab){
            return null
        }
        let block:Node | null = null
        switch(type){
            case BlockType.BT_STONE:
                block=instantiate(this.curPrefab)
                break
        }
        return block
    }

    onButtonClick(){
        this.curState = GameState.GS_PLAYING
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

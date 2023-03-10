import "./css/index.scss"
import {EditComponent} from "./EditComponent"

class Quiz{
    constructor(){
        ///If the quiz anwser was not setting, user can not save the post.
        (function() {
            let locked = false

            wp.data.subscribe(function() {
              const results = wp.data.select("core/block-editor").getBlocks().filter(function(block) {
                return block.name == "payattentionplugin/are-you-paying-attention" && block.attributes.correctAnswer == undefined
              })
          
              if (results.length && locked == false) {
                locked = true
                wp.data.dispatch("core/editor").lockPostSaving("noanswer")
              }
          
              if (!results.length && locked) {
                locked = false
                wp.data.dispatch("core/editor").unlockPostSaving("noanswer")
              }
            })
        })()

        wp.blocks.registerBlockType("payattentionplugin/are-you-paying-attention",{    
            edit: EditComponent,
            save: function(){
                return null
            }
        } )
    }
}

export default Quiz



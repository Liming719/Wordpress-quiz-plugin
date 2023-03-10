import {TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, PanelRow, ColorPicker} from "@wordpress/components"
import {InspectorControls, BlockControls, AlignmentToolbar, useBlockProps} from "@wordpress/block-editor"
import {SwatchesPicker } from "react-color"

export function EditComponent(props){
    const blockProps = useBlockProps({
        className:"paying-attention-edit-block",
        style:{backgroundColor: props.attributes.bgColor}
    })

    function UpdateQuestion(value){
        props.setAttributes({question: value})
    }
    
    function UpdateAnswerValue(newValue, index){        
        const tempAnswersList = props.attributes.answers.concat([]);
        tempAnswersList[index] = newValue;
        props.setAttributes({answers: tempAnswersList})        
    }

    function DeleteAnswer(indexToDelete){
        const tempAnswersList = props.attributes.answers.filter(function(value, index) {return index != indexToDelete});
        props.setAttributes({answers: tempAnswersList})
        if(props.attributes.correctAnswer == indexToDelete){
            props.setAttributes({correctAnswer : undefined});
        }
    }

    function AddAnswer(){
        const tempAnswersList = props.attributes.answers.concat([undefined]);
        props.setAttributes({answers: tempAnswersList})
    }

    function SetCorrectAnswer(index){
        if(props.attributes.correctAnswer == index)
            props.setAttributes({correctAnswer : undefined});
        else
            props.setAttributes({correctAnswer: index})
    }
    
    return(        
    <div {...blockProps}>
        <BlockControls>
            <AlignmentToolbar value={props.attributes.titleAlignment} onChange={x=>props.setAttributes({titleAlignment: x})}/>
        </BlockControls>
        <InspectorControls>
            <PanelBody title="Background Color" initialOpen="true">
                <PanelRow>
                    <SwatchesPicker color={props.attributes.bgColor} onChangeComplete={x=>props.setAttributes({bgColor: x.hex})} />
                </PanelRow>
            </PanelBody>
        </InspectorControls>
        {/* <p style={{fontSize:"16px", textAlign: props.attributes.titleAlignment}}>Quiz:</p> */}
        <TextControl label="Quiz:" value={props.attributes.question} onChange={UpdateQuestion} style={{fontSize: "20px"}}/>
        <p style={{fontSize:"14px", margin:"20px 0 8px 0"}}>Answers：</p>
        {props.attributes.answers.map(function(answer, index){
            return (
                <Flex>
                    <FlexBlock>
                        <TextControl value={answer} onChange={(value)=>UpdateAnswerValue(value,index)} autoFocus={answer == undefined}/>
                    </FlexBlock>
                    <FlexItem>
                        <Button onClick={()=>SetCorrectAnswer(index)}>
                            <Icon className="Answer-Marker" icon={props.attributes.correctAnswer == index ? "star-filled" : "star-empty"}/>
                        </Button>
                    </FlexItem>
                    <FlexItem>
                        <Button isLink className="Answer-Delete" onClick={()=>DeleteAnswer(index)}>Delete</Button>  
                    </FlexItem>
                </Flex>
            )
        })}        
        <Button isPrimary onClick={AddAnswer}>Add another Button</Button>
    </div>
    )
}
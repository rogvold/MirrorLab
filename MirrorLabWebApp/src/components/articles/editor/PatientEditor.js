/**
 * Created by sabir on 20.01.17.
 */

import React, { Component } from 'react';
import {
    convertFromRaw,
    EditorState,
} from 'draft-js';

import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';

import createDndPlugin from 'draft-js-dnd-plugin';

import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';

import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';

import createVideoPlugin from 'draft-js-video-plugin';

import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';

const richButtonsPlugin = createRichButtonsPlugin();

// const {
//     // inline buttons
//     ItalicButton, BoldButton, MonospaceButton, UnderlineButton,
//     // block buttons
//     ParagraphButton, BlockquoteButton, CodeButton, OLButton, ULButton, H1Button, H2Button, H3Button, H4Button, H5Button, H6Button
// } = richButtonsPlugin;

import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
    AlignBlockDefaultButton,
    AlignBlockCenterButton,
    AlignBlockLeftButton,
    AlignBlockRightButton,
} from 'draft-js-buttons';

import ImageAdd from './ImageAdd'


const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const dndPlugin = createDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const sideToolbarPlugin = createSideToolbarPlugin({
    structure: [
        BoldButton
    ]
});
const { SideToolbar } = sideToolbarPlugin;

const videoPlugin = createVideoPlugin();

const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        // BoldButton,
        // ItalicButton,
        // UnderlineButton,
        // CodeButton,
        //
        // Separator,
        //
        // HeadlineOneButton,
        // HeadlineTwoButton,
        // HeadlineThreeButton,
        // UnorderedListButton,
        // OrderedListButton,
        // BlockquoteButton,
        // CodeBlockButton,
    ]
});

const { InlineToolbar } = inlineToolbarPlugin;

const decorator = composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator
    // dndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator: decorator });

const plugins = [dndPlugin, focusPlugin, alignmentPlugin,
                    resizeablePlugin, imagePlugin, inlineToolbarPlugin, sideToolbarPlugin];

const text = 'Click on the + button below and insert "/images/canada-landscape-small.jpg" to add the landscape image. Alternativly you can use any image url on the web.';

const initialState = {
    "entityMap": {
        "0": {
            "type": "image",
            "mutability": "IMMUTABLE",
            "data": {
                "src": "http://img.mypopulars.com/images/audrey-tautou/Audrey-Tautou-53.jpg"
            }
        }
    },
    "blocks": [{
        "key": "9gm3s",
        "text": "You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
    }, {
        "key": "ov7r",
        "text": " ",
        "type": "atomic",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [{
            "offset": 0,
            "length": 1,
            "key": 0
        }],
        "data": {}
    }, {
        "key": "e23a8",
        "text": "See advanced examples further down …",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
    }]
};
/* eslint-enable */

class PatientEditor extends Component {

    state = {
        // editorState: createEditorStateWithText(text),
        editorState: EditorState.createWithContent(convertFromRaw(initialState)),
    };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    focus = () => {
        // this.editor.focus();
    };

    render() {
        return (
            <div className={'patient_editor'} >

                <div className={'editor'} onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                </div>

                <ImageAdd
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    modifier={imagePlugin.addImage}
                />

                <SideToolbar />

                <AlignmentTool />

                <InlineToolbar />

            </div>
        );
    }
}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//PatientEditor = connect(mapStateToProps, mapDispatchToProps)(PatientEditor)

export default PatientEditor
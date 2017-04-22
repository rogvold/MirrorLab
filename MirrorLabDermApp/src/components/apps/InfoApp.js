/**
 * Created by sabir on 08.04.17.
 */
/**
 * Created by sabir on 15.01.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableHighlight,
    WebView,
    ScrollView
} from 'react-native';



class InfoApp extends React.Component {

    static defaultProps = {}

    static propTypes = {

    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.loadSensors();
    }

    componentWillReceiveProps() {

    }


    render = () => {
        const {lang} = this.props;
        let HTML = ruHTML;
        if (lang == 'en'){
            HTML = enHTML;
        }

        return (
            <View style={styles.container} >


                <WebView style={{}}
                         scalesPageToFit={true}
                         source={{html: HTML}}
                />

            </View>
        );
    }

}


var styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        flex: 1,
    },

});


const ruHTML = `
        <!DOCTYPE html>\n
        <html>
          <head>
            <title>Hello Static World</title>
            <meta http-equiv="content-type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=320, user-scalable=no">
            <style type="text/css">
              body {
                margin: 0;
                padding: 0;
                font: 62.5% arial, sans-serif;
                background: white;
                padding: 5px;
              }
              h1 {
                margin: 0;
                font-size: 18px;
              }
              p{
                font-size: 14px;
              }
            </style>
          </head>
          <body>
          
            <h1>О программе</h1>
            <p>
                С помощью этого приложения вы сможете отслеживать изменения кожи лица. 
            </p>
            <p>
                Так же вы можете получить консультацию профессионального врача в приложении. 
                Просто добавьте доктора и он сможет видеть историю ваших фотографий. 
                Вопросы вы можете задать ему в чате.
            </p>
            
            <h1>Помощь</h1>
            <p>
                Вопросы и предложения вы можете задать по адресу 
                <a href="mailto:sha-sabir@yandex.ru" target="_blank" >sha-sabir@yandex.ru</a> или по телефону 
                <a href="tel:+79854363704">+79854363704</a>
            </p>
            
          </body>
        </html>
`;

const enHTML = `
        <!DOCTYPE html>\n
        <html>
          <head>
            <title>Hello Static World</title>
            <meta http-equiv="content-type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=320, user-scalable=no">
            <style type="text/css">
              body {
                margin: 0;
                padding: 0;
                font: 62.5% arial, sans-serif;
                background: white;
                padding: 5px;
              }
              h1 {
                margin: 0;
                font-size: 18px;
              }
              p{
                font-size: 14px;
              }
            </style>
          </head>
          <body>
          
            <h1>About</h1>
            <p>
                With a help of this application you can track the changes of your face. 
            </p>
            <p>
                You can also get recommendations from professional dermatologists.
                Just add the doctor to allow him see your history of your photos.
                You have ask any questions on chat.
            </p>
            
            <h1>Support</h1>
            <p>
                Please let us know if you have any questions.
                <a href="mailto:sha-sabir@yandex.ru" target="_blank" >sha-sabir@yandex.ru</a>, 
                <a href="tel:+79854363704">+79854363704</a>
            </p>
            
            
          </body>
        </html>
`;


const mapStateToProps = (state) => {
    return {
        lang: state.settings.lang
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

InfoApp = connect(mapStateToProps, mapDispatchToProps)(InfoApp)

export default InfoApp;
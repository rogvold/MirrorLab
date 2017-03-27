/**
 * Created by sabir on 05.03.17.
 */

import * as colors from '../constants/AppColors'

export default QuestionnaireFactory = {

    gettingStartedQuestions: [

        {
            type: 'image',
            topText: 'What is your gender?',
            options: [
                {
                    image: require('../assets/images/start/male.png'),
                    text: 'Male'
                },
                {
                    image: require('../assets/images/start/female.png'),
                    text: 'Female'
                }
            ]
        },

        {
            type: 'circle',
            topText: 'How old are you?',
            options: [
                {
                    color: colors.button1Color,
                    text: '-14'
                },
                {
                    color: colors.button2Color,
                    text: '15-20'
                },
                {
                    color: colors.button3Color,
                    text: '21-25'
                },
                {
                    color: colors.button4Color,
                    text: '26+'
                }
            ]
        },

        {
            type: 'button',
            topText: 'How long do you have acne?',
            options: [
                {
                    color: colors.button1Color,
                    text: 'Less than 3 months'
                },
                {
                    color: colors.button2Color,
                    text: '3 months to a year'
                },
                {
                    color: colors.button3Color,
                    text: 'More than a year'
                }
            ]
        },
        {
            type: 'image',
            topText: 'What treatments have you tried before?',
            options: [
                {
                    image: require('../assets/images/start/creams.png'),
                    text: 'Creams'
                },
                {
                    image: require('../assets/images/start/pills.png'),
                    text: 'Pills'
                },
                {
                    image: require('../assets/images/start/creams_and_pills.png'),
                    text: 'Both'
                },
                {
                    image: require('../assets/images/start/nothing.png'),
                    text: 'Nothing'
                }
            ]
        },

        {
            type: 'button',
            topText: "What's your skin type?",
            options: [
                {
                    color: colors.button1Color,
                    text: 'Dry'
                },
                {
                    color: colors.button2Color,
                    text: 'Regular'
                },
                {
                    color: colors.button3Color,
                    text: 'Oily'
                },
                {
                    color: colors.button4Color,
                    text: "I'm not sure"
                }
            ]
        },

        {
            type: 'image',
            topText: 'Describe your acne',
            options: [
                {
                    image: require('../assets/images/start/blackheads.png'),
                    text: 'Only Blackheads'
                },
                {
                    image: require('../assets/images/start/mild.png'),
                    text: 'Mild'
                },
                {
                    image: require('../assets/images/start/moderate.png'),
                    text: 'Moderate'
                },
                {
                    image: require('../assets/images/start/severe.png'),
                    text: 'Severe'
                }
            ]
        }

    ]

}
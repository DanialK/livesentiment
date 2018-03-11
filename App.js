import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, KeyboardAvoidingView, Button } from 'react-native';
import debounce from 'lodash/debounce';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
import {NativeModules} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native'
import getVector from './getVector';

const { Sentiment } = NativeModules;
const { isPad } = Platform;

const pallet = {
  textColor: '#FAFAFA',
  initial: [
    '#B39DDB',
    '#673AB7',
    '#7B1FA2',
    '#6A1B9A',
    '#AA00FF',
  ],
  '+': [
    '#B2EBF2',
    '#90CAF9',
    '#1DE9B6',
    '#A5D6A7',
    '#80CBC4',
    '#81D4FA',
    '#80DEEA',
    '#4FC3F7',
    '#64B5F6',
    '#18FFFF',
    '#66BB6A',
    '#43A047',
    '#4DB6AC'
  ],
  '-': [
    '#ED493d',
    '#EF5350',
    '#FF5252',
    '#F50057',
    '#EF9A9A',
    '#EF9A9A',
    '#FF3D00',
    '#FFAB40',
    '#E65100',
    '#FFAB91',
    '#F48FB1',
  ]
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0,
  },
  info: {
    marginTop: isIphoneX() ? '10%' : (isPad ? '6%' : '8%'),
    marginRight: '2%',
    marginBottom: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  probability: {
    color: pallet.textColor,
    fontSize: 18
  },
  textInput: {
    width: '90%', 
    fontSize: isPad ? 72 : 46,
    marginLeft: '5%',
    marginRight: '5%',
    alignSelf: 'stretch',
  }
});

export default class App extends React.Component {
  state = {
    colors: pallet.initial,
    text: '',
  };

  checkSentiment = debounce(text => {
    if (Sentiment && Sentiment.check) {
      getVector(text).then(vectors => {
        Sentiment.check(vectors, (err, probability) => {
          if (err) return;
          const sentiment = probability > 0.5 ? '+' : '-';
          this.setState({
            sentiment,
            probability,
            colors: pallet[sentiment]
          });
        });
      });
    } else {
      this.setState({error: "Error"})
    }
  }, 500);

  handleTextChange = (text) => {
    if (!text) {
      return this.setState({
        text: '',
        probability: undefined,
        sentiment: undefined,
        colors: pallet.initial
      });
    }
    this.setState({text});
    this.checkSentiment(text);
  };



  render() {
    const { text, sentiment, probability, colors, error } = this.state;

    return (
      <AnimatedLinearGradient customColors={colors} speed={2000}>
        <View style={[styles.container]}>
          <View style={styles.info}>
            <Text style={styles.probability}>
              {sentiment && `Sentiment: ${sentiment}`}
            </Text>
            <Text style={styles.probability}>
              {probability && `Probability: ${Math.round(probability * 100)}%`}
            </Text>
            <Text style={styles.probability}>
              {error && `Error: ${error}`}
            </Text>
          </View>
          <KeyboardAvoidingView style={styles.contentContainer} behavior="padding">
            <TextInput
              multiline
              numberOfLines={Infinity}
              style={[styles.textInput, {color: pallet.textColor, opacity: text.length ? 1 : 0.5}]}
              placeholderTextColor={pallet.textColor}
              underlineColorAndroid="transparent"
              placeholder="Type here"
              onChangeText={this.handleTextChange}
              value={text}
              autocorrect={false}
              textBreakStrategy="highQuality"
            />
          </KeyboardAvoidingView>
        </View>
      </AnimatedLinearGradient>
    );
  }
}


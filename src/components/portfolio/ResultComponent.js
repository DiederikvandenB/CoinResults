import BackButtonComponent from 'components/ui/BackButtonComponent';
import GradientComponent from 'components/ui/GradientComponent';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import TextToggleComponent from 'components/ui/TextToggleComponent';
import Finance from 'utils/Finance';

export default class ResultComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    portfolio: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  /**
   * Define the store.
   */
  constructor (props) {
    super(props);

    this.state = {
      ROI:        '...',
      daysChange: '...',

      valueResultSwitcher: {
        totalValue:  '...',
        totalResult: '...',
      },
    };
  }

  /**
   * Update the state when new props arrive.
   */
  componentWillReceiveProps (props) {
    this.setState({
      ROI:                 Finance.formatPercentage(props.portfolio.ROI),
      daysChange:          Finance.formatFIAT(props.portfolio.valueChangeToday, 'EUR'),
      valueResultSwitcher: {
        totalValue:  `€ ${Finance.formatFIAT(props.portfolio.totalValue)}`,
        totalResult: `€ ${Finance.formatFIAT(props.portfolio.totalResult)}`,
      },
    });
  }

  /**
   * Render the view.
   */
  render = () => (
    <GradientComponent style={styles.container}>
      <BackButtonComponent
        onPress={() => this.props.navigator.pop()}
        label={'Portfolio overview'}/>

      <TextToggleComponent
        values={this.state.valueResultSwitcher}
        style={styles.totalProfit}
        allowFontScaling={false}/>

      <Text style={styles.lastVisitResult}>
        Portfolio value changed € {this.state.daysChange} since 00:00.
      </Text>

      <Text style={styles.ROI}>
        Your ROI is currently {this.state.ROI}.
      </Text>

    </GradientComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:    60,
    paddingBottom: 80,
    paddingLeft:   30,
    paddingRight:  30,
  },

  totalProfit: {
    backgroundColor: 'transparent',
    color:           '#FFF',
    fontSize:        45,
    fontWeight:      '100',
  },

  lastVisitResult: {
    backgroundColor: 'transparent',
    color:           'rgba(255, 255, 255, 0.6)',
    fontSize:        12,
    marginTop:       10,
  },

  ROI: {
    backgroundColor: 'transparent',
    color:           'rgba(255, 255, 255, 0.6)',
    fontSize:        12,
    marginTop:       10,
  },
});

import { inject, observer } from 'mobx-react/native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';

import Container from '../../components/firstrun/ContainerComponent';
import Input from '../../components/ui/InputComponent';

@inject('cryptos') @observer
export default class SetInvestmentScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Define the possible props.
   */
  static PropTypes = {
    portfolioName: PropTypes.string.isRequired,
  };

  /**
   * Setup the default state.
   */
  constructor () {
    super();
    this.state = {amount: 0};
  }

  /**
   * Handle setting an amount.
   */
  handleSubmit = () => {
    if (!this.state.amount) {
      return;
    }

    const { ticker, portfolioName } = this.props;
    this.props.cryptos.createOrUpdateAsset(portfolioName, {
      ticker,
      amount: this.state.amount,
    });

    this.props.navigator.dismissAllModals();
  };

  /**
   * Render the action.
   */
  renderAction = () => (
    <Input
      onChangeText={amount => this.setState({amount})}
      onSubmitEditing={() => this.handleSubmit}
      label={'Invested'}
      keyboardType={'numeric'}/>
  );

  /**
   * Render the component.
   */
  render () {
    const buttons = [
      {text: 'Continue', onPress: () => this.handleSubmit()},
    ];

    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
        <Container
          title={'Investments'}
          body={'Enter the total amount of FIAT currency you have invested in your portfolio. ' +
          'This is used to calculate your profit and return on investment.'}
          action={this.renderAction()}
          buttons={buttons}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    width:  300,
    height: 250,
  },

  text: {
    backgroundColor: 'transparent',
    color:           '#FFFFFF',
  },
});

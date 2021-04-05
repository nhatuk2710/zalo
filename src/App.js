import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import ratesData from './rates.json';

function tryConvert(money, code, encode = true) {
    const input = parseFloat(money);
    if (Number.isNaN(input)) {
      return '';
    }
    const currency = ratesData.rates[0].value.find(item => item.code === code);
    if (!currency) {
      return '';
    }
    const sell = parseFloat(currency.sell.replace(',', ''))
    const output = encode ? input*sell : input/sell;
    const rounded = Math.round(output * 1000)/1000;
    return rounded.toString();
  }

class CurrencyInput extends React.Component{
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onMoneyChange(event.target.value)
  }

  render() {
    return (
      <fieldset>
        <legend>Enter { this.props.currencyName }</legend>
        <input value={this.props.money} onChange={this.handleChange}></input>
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currencyCode: 'ETH',
      money: '',
      encode: true,
    }

    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
    this.handleChangeVNDEncode = this.handleChangeVNDEncode.bind(this)
    this.handleChangeVNDDecode = this.handleChangeVNDDecode.bind(this)
  }

  handleChangeCurrency(event) {
    this.setState({
      currencyCode: event.target.value,
      encode: true,
      money: '',
    })
  }

  handleChangeVNDEncode(money) {
    this.setState({ 
      money: money,
      encode: true,
    })
  }

  handleChangeVNDDecode(money) {
    this.setState({ 
      money: money,
      encode: false,
    })
  }

  render() {
    // const date = new Date();
    const money = this.state.money;
    const VND = this.state.encode ? tryConvert(money, this.state.currencyCode, true) : money;
    const notVND = this.state.encode ? money : tryConvert(money, this.state.currencyCode, false);

    return (
      <body>
      <header>
            <div className="container-fluid">
                <div class="logo">
                    <a>
                        <span class="logo-image">
                          <img src="assets/images/common/logo.svg" alt=""></img>
                        </span>
                        <span class="logo-text">Balancer</span>
                    </a>
                </div>
                <div class="action">
              <select class="button button-blue" onChange={this.handleChangeCurrency}>
              <option value="ETH">ETH</option>
              <option value="BTC">BTC</option>
              <option value="TRX">TRX</option>
              <option value="zalo">Zalo</option>
            </select>
                {/* <button class="button button-blue" data-toggle="modal" data-target="#authModal">Connect Wallet</button> */}
            </div>
            </div>
      </header>
      <main>
      <div className="Calculator">
        <div class="container-fluid">
            <div class="exchange" data-direction="bal-trx">
                <div class="exchange-block" data-type="bal">
                    <div class="block-title">Token to Sell</div>
                    <div class="block-details">
                        <div class="currency">
                            <div class="currency-logo">
                               <img src="assets/images/bal-logo.png" alt=""/>
                            </div>
                            <div class="currency-name">BAL</div>
                        </div>
                    </div>
                    <div class="block-input">
                        <CurrencyInput currencyName={this.state.currencyCode} money={notVND} onMoneyChange={this.handleChangeVNDEncode}/>
                    </div>
                </div>
                <div class="swap"><button id="swap"></button></div>
                <div class="exchange-block" data-type="trx">
                    <div class="block-title">Token to Buy</div>
                    <div class="block-details">
                        <div class="currency">
                            <div class="currency-logo">
                                <img src="assets/images/common/tron-logo.svg" alt=""/>
                            </div>
                            <div class="currency-name">TRX</div>
                        </div>
                        {/* <div class="amount">0.00 TRX</div> */}
                    </div>
                    <div class="block-input">
                        <CurrencyInput currencyName="dollar" money={VND} onMoneyChange={this.handleChangeVNDDecode}/>
                    </div>
                </div>
            </div>
            <div class="status">
                <div class="status-message status1 active">Enter Order Details to Continue</div>
                <div class="status-message status2">Not float</div>
              </div>
            </div>
        </div>
      </main>
      </body>
    );
  }
}

export default Calculator;

import React, { Component } from "react";
// Чтобы работала подписка на событие изменения LocalStorage необходимо самому вызывать событие 'storage'
//window.dispatchEvent( new Event('storage') ); Т.к. это событие зажигается в одном окне, если изменение было в другом
// но с тем же адресом
const withLocalStorageHoc = (
  localStorageKey,
  initValue
) => WrappedComponent => {
  class Wrapper extends Component {
    customUpdate = e => {
      this.setState({ ...this.state });
    };

    componentDidMount() {
      if (window) {
        window.addEventListener("storage", this.customUpdate);
      }
    }

    loadData() {
      return window.localStorage.getItem(localStorageKey);
    }

    render() {
      const { forwardRef, ...rest } = this.props;
      return (
        <WrappedComponent
          {...rest}
          ref={forwardRef}
          savedData={this.loadData()}
        />
      );
    }
  }

  return React.forwardRef((props, ref) => (
    <Wrapper {...props} forwardRef={ref} />
  ));
};

export default withLocalStorageHoc;

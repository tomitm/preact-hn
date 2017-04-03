import {h, Component} from 'preact';

// This is a Higher Order Component.
// DataComponent(WrappedComponent, { method, properties })
export default function withData(WrappedComponent, {fetchDataFunction, properties}) {
  return class extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        error: false,
        data: null
      };

      this.handlePartialData = this.handlePartialData.bind(this);
      this.handleCompleteData = this.handleCompleteData.bind(this);
      this.handleErrorData = this.handleErrorData.bind(this);  
    }

    handlePartialData(partialData) {
      this.setState({
        error: false,
        data: partialData
      });
    }
    handleCompleteData(completeData) {
      if (properties.uuid !== completeData.uuid) {
        this.props.handleUUIDChange(completeData.uuid);
      }
      this.setState({
        error: false,
        data: completeData
      });
    }
    handleErrorData(error) {
      this.setState({
        error: true
      });
    }

    componentWillMount() {
      fetchDataFunction(properties, {
        partial: this.handlePartialData,
        complete: this.handleCompleteData,
        error: this.handleErrorData  
      });
    }

    render(props, state) {
      return <WrappedComponent {...state} {...props} />;
    }
  }
}
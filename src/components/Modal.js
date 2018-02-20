import React from 'react';
import { Modal, View } from 'react-native';

// Other
import { colorPrimary, colorSecondary, backgroundColor } from 'src/config/styles';

export default class ModalComponent extends React.Component {
  state = {
    modalVisible: false,
  };

  openModal = () => {
    this.setState({modalVisible:true});
  };

  closeModal = () => {
    this.setState({modalVisible:false});
  };

  render() {
    if (this.state.modalVisible) {
      return (
        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            {React.Children.map(this.props.children, child => React.cloneElement(child, {closeModal: this.closeModal}))}
          </View>
        </Modal>
      );
    }

    return null
  }
}

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: colorSecondary,
    padding: 10
  }
}

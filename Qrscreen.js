import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import store from './redux/Store';
import {useSelector} from 'react-redux';

const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('screen').width;
const QRScanner = ({navigation}) => {
  const cartData = useSelector(state => state.cartData);
  const [cameraType, setCameraType] = useState('back');
  const [productModal, setproductModal] = useState(false);
  const [productId, setproductId] = useState('');
  const [productName, setproductName] = useState('');
  const [gstAmnt, setgstAmnt] = useState(0);
  const [Price, setPrice] = useState(0);
  const cameraRef = useRef(null);

  const onBarCodeRead = async scanResult => {
    console.log(scanResult, 'barcode', scanResult.data);
    const options = {
      base64: true,
      pauseAfterCapture: true,
      mirrorImage: false,
      fixOrientation: true,
    };

    if (scanResult.data) {
      const existingProduct = cartData.find(
        data => data.product_id === scanResult.data,
      );

      if (existingProduct) {
        ToastAndroid.show('Added to Cart', ToastAndroid.SHORT);

        console.log(existingProduct, 'hey');
        store.dispatch({
          type: 'increaseCount',
          payload: {
            product_id: existingProduct.product_id,
          },
        });
        navigation.navigate('Cart');
      } else {
        console.log(cartData);

        setproductModal(true);
        setproductId(scanResult.data);
      }
    }
  };

  async function addItemToCart() {
    console.log('added', productId, productName, Price, gstAmnt);
    setproductModal(!productModal);
    store.dispatch({
      type: 'addToCart',
      payload: {
        product_id: productId,
        product_name: productName,
        product_price: Price,
        gst_amount: gstAmnt,
        quantity: 1,
      },
    });
    navigation.navigate('Cart');
    setproductId('');
    setproductName('');
    setPrice(0);
    setgstAmnt(0);
  }
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={cameraType}
          flashMode={
            flashMode
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          captureAudio={false}
          onBarCodeRead={onBarCodeRead}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
        />
      </View>
      <Modal
        visible={productModal}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => {
          setproductModal(false);
        }}>
        <ScrollView>
          <View
            height={screenheight}
            width={screenwidth}
            alignItems="center"
            justifyContent="flex-end"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              width: '100%',
            }}>
            <View
              style={{
                alignSelf: 'center',
                height: '50%',
                width: '100%',
                backgroundColor: 'white',
                justifyContent: 'center',
                paddingHorizontal: '5%',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}>
              <Text
                style={{
                  marginVertical: 10,
                  textAlign: 'center',
                  color: 'blue',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Add Product
              </Text>
              <View style={{}}>
                <TextInput
                  keyboardType="default"
                  placeholderTextColor={'#504135'}
                  placeholder={'Name'}
                  style={{
                    borderColor: '#BDB7CA',
                    borderWidth: 1,
                    fontFamily: 'red',
                    color: 'black',
                    marginBottom: 10,
                    height: 50,
                  }}
                  onChangeText={text => setproductName(text)}
                />
                <TextInput
                  keyboardType="default"
                  placeholderTextColor={'#504135'}
                  placeholder={'Id'}
                  value={productId}
                  style={{
                    borderColor: '#BDB7CA',
                    borderWidth: 1,
                    fontFamily: 'red',
                    color: 'black',
                    marginBottom: 10,
                  }}
                  onChangeText={text => setproductId.log(text)}
                />
                <TextInput
                  keyboardType="default"
                  placeholderTextColor={'#504135'}
                  placeholder={'GST %'}
                  style={{
                    borderColor: '#BDB7CA',
                    borderWidth: 1,
                    fontFamily: 'red',
                    color: 'black',
                    marginBottom: 10,
                  }}
                  onChangeText={text => setgstAmnt(text)}
                />
                <TextInput
                  keyboardType="default"
                  placeholderTextColor={'#504135'}
                  placeholder={'Price'}
                  style={{
                    borderColor: '#BDB7CA',
                    borderWidth: 1,
                    fontFamily: 'red',
                    color: 'black',
                    marginBottom: 10,
                  }}
                  onChangeText={text => setPrice(text)}
                />
              </View>
              <TouchableOpacity
                onPress={() => addItemToCart()}
                style={{
                  backgroundColor: 'blue',
                  padding: 10,
                  borderRadius: 10,
                  marginTop: '2%',
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 14,
                  }}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <View style={styles.overlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 2,
    borderColor: 'green',
  },
});

export default QRScanner;

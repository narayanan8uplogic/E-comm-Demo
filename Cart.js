import {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import store from './redux/Store';

const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('screen').width;
const Cart = ({navigation}) => {
  const cartData = useSelector(state => state.cartData);
  const [Total, setTotal] = useState(0);
  const [totalGst, settotalGst] = useState(0);
  let totalGstAmount = 0;
  let totalAmount = 0;
  useEffect(() => {
    console.log(cartData, 'redux data');
    cartData.forEach(item => {
      const productPrice = parseFloat(item.product_price);
      const gstAmount = parseFloat(item.gst_amount);

      totalAmount += productPrice * item.quantity;
      totalGstAmount += ((productPrice * gstAmount) / 100) * item.quantity;
    });
    console.log(totalAmount, 'redux data1', totalGstAmount);
    setTotal(totalAmount);
    settotalGst(totalGstAmount);
  }, [cartData]);
  return (
    <View style={{height: screenheight, width: screenwidth}}>
      <View
        style={{
          backgroundColor: 'blue',
          height: '7%',
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MaterialIcons
          name="arrow-back"
          color={'white'}
          size={25}
          style={{position: 'absolute', left: 10}}
          onPress={() => navigation.navigate('Qrscreen')}
        />
        <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
          My Cart
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            paddingVertical: '3%',
            paddingHorizontal: '6%',
          }}>
          {cartData.map(data => {
            return (
              <View
                key={data.product_id}
                style={{marginBottom: 10, backgroundColor: '#F9F6EE'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    {data.product_name}
                  </Text>
                  <Text style={{color: 'black', fontWeight: '400'}}>
                    ID : {data.product_id}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingHorizontal: 10,
                    paddingBottom: 5,
                  }}>
                  <Text style={{color: '#504135', fontWeight: 'bold'}}>
                    Price: $ {data.product_price}
                  </Text>
                  <Text style={{color: '#504135', fontWeight: 'bold'}}>
                    GST %: {data.gst_amount}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: '#504135', fontWeight: 'bold'}}>
                      GST Amount for {data.quantity} Qty:${' '}
                      {(data.product_price * data.gst_amount * data.quantity) /
                        100}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableOpacity
                        onPress={() => {
                          data.quantity == 1
                            ? store.dispatch({
                                type: 'removeFromCart',
                                payload: {
                                  product_id: data.product_id,
                                },
                              })
                            : store.dispatch({
                                type: 'decreaseCount',
                                payload: {
                                  product_id: data.product_id,
                                },
                              });
                        }}>
                        <Entypo
                          name="minus"
                          color={'blue'}
                          size={15}
                          style={{marginRight: 5}}
                        />
                      </TouchableOpacity>
                      <Text style={{color: '#504135', fontWeight: '400'}}>
                        {data.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          store.dispatch({
                            type: 'increaseCount',
                            payload: {
                              product_id: data.product_id,
                            },
                          });
                        }}>
                        <Entypo
                          name="plus"
                          color={'blue'}
                          size={15}
                          style={{marginLeft: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    marginTop: 7,
                    marginBottom: 5,
                  }}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Total Amount: ${' '}
                    {data.product_price *
                      data.quantity *
                      (1 + data.gst_amount / 100)}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'blue',
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      marginVertical: 3,
                    }}
                    onPress={() => {
                      store.dispatch({
                        type: 'removeFromCart',
                        payload: {
                          product_id: data.product_id,
                        },
                      });
                    }}>
                    <Text
                      style={{color: 'white', fontSize: 14, marginVertical: 4}}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: 'grey',
          paddingVertical: '3%',
          paddingHorizontal: '3%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{}}>SubToatal $</Text>
            <Text style={{fontWeight: 'bold', color: 'blue'}}> $ {Total}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text> Include Total Gst of </Text>
            <Text style={{fontWeight: '700', color: 'blue'}}>
              {' '}
              $ {totalGst}{' '}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{backgroundColor: 'red', alignSelf: 'center'}}
          onPress={() => {
            store.dispatch({
              type: 'clearCart',
            });
          }}>
          <Text style={{padding: 10}}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

import React from 'react';
import { TouchableOpacity, Text, StyleSheet,View } from 'react-native';
import { Ticket } from '@/constants/DBDatatypes';
import { Colors } from '@/constants/Colors';

interface CartBookingProps {
  item: Ticket;
  amount: number;
  onQuantityChange: (isIncrementing: boolean) => void;
}

const CartBooking: React.FC<CartBookingProps> = ({ item, amount, onQuantityChange }) => {
  function DatestringToDate(datastring: string) {
    return new Date(datastring);
  }
  function TimestringToDateTime(datastring: string) {
    return new Date('1990-01-07T' + datastring);
  }
  return (
    <View style={styles.bookingList}>
    {amount > 0 && (
      <>
        <View style={styles.textArea}>
          <Text style={styles.title}>{item.campaignName} - {item.name}</Text>
          <Text style={styles.location}>{item.locationName}</Text>
          <Text style={styles.location}>{`${item.address}, ${item.city}`}</Text>
          <Text style={styles.date}>{DatestringToDate(item.validDateStart).toLocaleDateString('default', {day: '2-digit', month: 'short', year: '2-digit'})}  -  {TimestringToDateTime(item.validTimeStart).toLocaleTimeString('default', {hour: 'numeric', minute: '2-digit'})}</Text>
        </View>
        <View>
          {amount > 1 && <Text style={styles.priceAreaText}>{`${item.price}`}</Text>}
        </View>

        <View style={styles.amount}>
        <TouchableOpacity style={styles.decrementButton} onPress={() => onQuantityChange(false)}>
          <Text>-</Text>
        </TouchableOpacity>
          <Text style={styles.amountText}>{amount}</Text>
          <TouchableOpacity style={styles.incrementButton} onPress={() => onQuantityChange(true)}>
          <Text>+</Text>
        </TouchableOpacity>
        </View>


        <View>
          <Text style={styles.totalPriceAreaText}>{amount * item.price}</Text>
        </View>
        


      </>
    )}
  </View>
    // <View style={styles.bookingList}>
    // <View style={styles.textArea}>
    //   <Text style={styles.title}>{item.campaignName} - {item.name}</Text>
    //   <Text style={styles.location}>{item.locationName}</Text>
    //   <Text style={styles.location}>{`${item.address}, ${item.city}`}</Text>
    //   <Text style={styles.date}>{DatestringToDate(item.validDateStart).toLocaleDateString('default', {day: '2-digit', month: 'short', year: '2-digit'})}  -  {TimestringToDateTime(item.validTimeStart).toLocaleTimeString('default', {hour: 'numeric', minute: '2-digit'})}</Text>
    // </View>
    // <View style={styles.amount}>
    //   {amount > 1 && <Text style={styles.priceAreaText}>{`${item.price}`}</Text>}
    // </View>
    // <View style={styles.amount}>
    //   <Text>{amount}</Text>
    // </View>
    // <View>
    //   <Text style={styles.priceAreaText}>{amount * item.price}</Text>
    // </View>
    
    // <TouchableOpacity style={styles.incrementButton} onPress={() => onQuantityChange(true)}>
    //     <Text>+</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity style={styles.decrementButton} onPress={() => onQuantityChange(false)}>
    //     <Text>-</Text>
    //   </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  bookingList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  textArea: {
    flexGrow: 1,
  },
  title: { 
    fontWeight: 'bold'
  },
  location: {},
  date: {},
  priceAreaText: {textAlign: 'right'},
  totalPriceAreaText : {
    color: 'purple'
  },
  amount: {
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
  },
  amountText: {
    margin: 5,
    backgroundColor: "#fff"
  },
  incrementButton: {
    marginLeft: 4,
    marginRight: 4,
    padding: 5,
    backgroundColor: '#aaa',
    width:25,
    display:'flex',
    alignItems:'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  decrementButton: {
    marginLeft: 4,
    marginRight: 4,
    padding: 5,
    width:25,
    display:'flex',
    alignItems:'center',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius:4,
    backgroundColor: '#aaa',
  }
});


export default CartBooking
// const styles = StyleSheet.create({
//   bookingList: {
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'nowrap',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginHorizontal: 8,
//     marginVertical: 4,
    
//   },
//   textArea: {
//     flexGrow: 1,
//   },
//   title: { 
//     fontWeight: 'bold'
//   },
//   location: {},
//   date: {},
//   priceAreaText: {textAlign: 'right'},
//   amount: {
//     paddingHorizontal: 15
//   }
// })
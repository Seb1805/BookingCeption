// import React, { useState } from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';

// const SeatSelection = () => {
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   return (
//     <View>
//       {[...Array(100)].map((_, index) => (
//         <TouchableOpacity 
//           key={index} 
//           onPress={() => setSelectedSeats([(...selectedSeats, index])}
//         >
//           <Text>{index}</Text>
//         </TouchableOpacity>
//       ))}
//       <Text>Selected seats: {selectedSeats.join(', ')}</Text>
//     </View>
//   );
// };

// export default SeatSelection;
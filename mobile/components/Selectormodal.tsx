import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, ScrollView, Pressable } from 'react-native'
import React from 'react'

export default function Selectormodal({visibility, setVisibility, title, optionArray, setselectedData, dataDisplay} : {visibility: boolean, setVisibility: any, title: string, optionArray: [], setselectedData: any, dataDisplay: string}) {

  function SetData(item: {}) {
    setselectedData(() => item)
    setVisibility(() => !visibility)
  }

  return (
    <Modal
        style={{ flex: 1, backgroundColor: "#25252577" }}
        animationType="slide"
        transparent={true}
        visible={visibility}
        statusBarTranslucent
        onRequestClose={() => setVisibility(!visibility)}
      > 

        <TouchableWithoutFeedback onPress={() => setVisibility(!visibility)}>
          <View style={styles.backdrop}></View>
        </TouchableWithoutFeedback>

        <View style={styles.modalWindow}>
        <View style={{borderBottomColor: '#ddd', borderBottomWidth: 1}}>
            <Text>
              {title}
            </Text>
            <ScrollView style={styles.optionArea}>
              {optionArray.map((item, key) => {
                return (
                  <Pressable onPress={() => {SetData(item)}} key={key} >
                    <View>
                      <Text>
                        {item[dataDisplay]}
                      </Text>
                    </View>
                  </Pressable>
                )
              })}
            </ScrollView>
          </View>
        </View>

      </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalWindow: {
    position: "absolute",
    height: "75%",
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#fff",
    bottom: 0,
  },
  optionArea: {
    maxHeight: 100,
  },
  optionPress: {
    width: "100%",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: "#ccc"
  }
})
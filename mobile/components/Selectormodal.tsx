import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";

export default function Selectormodal({ visibility, setVisibility, title, optionArray, selectedData, setselectedData, dataDisplay,}: { visibility: boolean; setVisibility: any; title: string; optionArray: any[]; selectedData?: any; setselectedData: any; dataDisplay: string;}) {
  // function Fullstyling() {

  //   if(!extraStyling) {
  //     return styles.inputSelectorDisplay;
  //   }

  //   else {
  //     return [, extraStyling]
  //   }

  // }

  function Capitalize(str: string){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function SetData(item: {}) {
    setselectedData(() => item);
    setVisibility(() => !visibility);
  }

  function OpenModal() {
    setVisibility(() => !visibility);
  }

  return (
    <>
      <Pressable
        style={styles.inputSelectorPress}
        onPress={() => {
          OpenModal();
        }}
      >
        <View style={styles.inputSelectorDisplay}>
          <Text>{selectedData && selectedData[dataDisplay]}</Text>
        </View>
      </Pressable>
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
          <View style={{paddingHorizontal:4}}>
            <View
              style={{
                paddingTop: 16,
                paddingBottom: 4,
                borderBottomColor: "#aaa",
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ fontSize: 18 }}>{Capitalize(title)}</Text>
            </View>
            <ScrollView style={styles.optionArea}>
              {optionArray.map((item, key) => {
                return (
                  <Pressable
                    style={styles.optionPress}
                    onPress={() => {
                      SetData(item);
                    }}
                    key={key}
                  >
                    <View>
                      <Text style={styles.optionText}>{Capitalize(item[dataDisplay])}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  inputSelectorPress: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 4,
  },
  inputSelectorDisplay: {
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#aaa",
    paddingHorizontal: 8,
    backgroundColor: "#fff"
  },
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
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#fff",
    bottom: 0,
  },
  optionArea: {
    
  },
  optionPress: {
    width: "100%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  optionText: {
    fontSize: 16
  }
});

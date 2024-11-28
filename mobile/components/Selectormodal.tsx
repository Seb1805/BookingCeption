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

export default function Selectormodal({ visibility, setVisibility, title, optionArray, selectedData, setselectedData, dataDisplay, extraStyling}: { visibility: boolean; setVisibility: any; title?: string; optionArray: any[]; selectedData?: any; setselectedData: any; dataDisplay: string; extraStyling?: {}}) {


  function Fullstyling() {
    if(!extraStyling) {
      return styles.inputSelectorDisplay;
    }
    else {
      return [styles.inputSelectorDisplay, extraStyling]
    }
  }

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
        <View style={Fullstyling()}>
          <Text>{selectedData && Capitalize(selectedData[dataDisplay])}</Text>
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
                paddingTop: 24,
                paddingBottom: 16,
              }}
            >
            {title && (
              <Text style={{ fontSize: 24, paddingHorizontal: 12 }}>
                {Capitalize(title)}
              </Text>
            )}
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
  },
  inputSelectorDisplay: {
    paddingVertical: 8,
    borderWidth: 2,
    paddingHorizontal: 10,
    height: 40,
    borderColor: "#bbb",
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#fff",
    bottom: 0,
  },
  optionArea: {
    paddingBottom:12
  },
  optionPress: {
    display: 'flex',
    justifyContent: 'center',
    width: "100%",
    height: 48,
    paddingTop: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  optionText: {
    fontSize: 16
  }
});

import { View, Text, ScrollView, Button, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { Colors } from "@/constants/Colors";
import ButtonOwn from "@/components/ButtonOwn";

export default function index() {
  return (
    <ScrollView>
      


      <ButtonOwn title="Create Location side" onpress={() => <Redirect href="/Profile/CreateLocation" />} />
      <ButtonOwn title="Create Section layout" onpress={() => <Redirect href="/Profile/CreateLocation" />} />
      <ButtonOwn title="Create new Campaign" onpress={() => <Redirect href="/Profile/CreateLocation" />} />

      

      <Text>Profil oplysninger, mulighed for oprette lokationer</Text>
    </ScrollView>
  );
}

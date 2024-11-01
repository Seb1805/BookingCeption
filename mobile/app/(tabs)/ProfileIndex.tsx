import { View, Text, ScrollView, Button } from "react-native";
import React from "react";
import { Link, Redirect } from "expo-router";

export default function index() {
  return (
    <ScrollView>
      <Link href="/Profile/CreateLocation">
        <Button title="Create Location side" onPress={() => <Redirect href="/Profile/CreateLocation" />} />
      </Link>

      <Text>Profil oplysninger, mulighed for oprette lokationer</Text>
    </ScrollView>
  );
}

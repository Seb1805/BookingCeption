import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Campaign, Ticket } from "@/constants/DBDatatypes";
import campaignApi from "@/api/axios/routes/campaign";
import { useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import TicketCard from "@/components/shop/TicketCard";

const ticketsTest: Ticket[] = [
  {
    ticketId: 1,
    name: "Børne billet",
    price: 50.0,
    validDateStart: "2024-12-23",
    validDateEnd: "2024-12-23",
    validTimeStart: "08:00:00",
    location: {
      locationName: "bella center",
      address: "center blvd. 5",
      city: "københavn",
      organizerId: 1,
    },
    campaignId: 2,
    active: true,
  },
  {
    ticketId: 2,
    name: "Voksen billet",
    price: 200.0,
    validDateStart: "2024-12-23",
    validDateEnd: "2024-12-23",
    validTimeStart: "08:00:00",
    spotId: 1,
    location: {
      locationName: "bella center",
      address: "center blvd. 5",
      city: "københavn",
      organizerId: 1,
    },
    campaignId: 2,
    active: true,
  },
];

export default function CampaignDetailsScreen() {
  const [campaignData, setcampaignData] = useState<Campaign>();
  const { id } = useLocalSearchParams<{ id: string }>();

  // useEffect(() => {
  //   campaignApi.getCampaignSingle(parseInt(id))
  // })

  function ImageIdentifyer() {
    if (campaignData) {
      if (campaignData?.coverImage.substring(0, 4) == "http") {
        return (
          <Image
            source={{ uri: campaignData?.coverImage }}
            style={styles.image}
          />
        );
      }
    }

    return (
      <Image
        source={require("@/assets/images/placeholders/placeholder-ticket.jpg")}
        style={styles.image}
      />
    );
  }

  function DescriptionArea() {
    if (campaignData?.description) {
      return (
        <View>
          <Text style={styles.titles}>Om</Text>
          <View id="descriptionarea" style={styles.descriptionContainer}>
            <Text>{campaignData?.description}</Text>
          </View>
        </View>
      );
    }
  }

  return (
    <ScrollView>
      <View style={styles.imagecontainer}>{ImageIdentifyer()}</View>

      <View style={{ marginHorizontal: 8 }}>
        <Text style={styles.titles}>Events</Text>
        {ticketsTest.map((item, key) => {
          return <TicketCard item={item} key={key} />;
        })}
      </View>

      {DescriptionArea()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagecontainer: {
    overflow: "hidden",
    width: "100%",
    height: 150,
    marginBottom: 8,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  titles: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 8,
  },
  descriptionContainer: {},
});

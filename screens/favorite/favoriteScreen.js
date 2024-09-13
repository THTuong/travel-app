import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import TabBarScreen from "../../components/tabBarScreen";

const FavoriteScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            {header()}
            <TabBarScreen navigation={navigation} />
        </View>
    )

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Regular }}>
                    Favorite
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60.0,
    }
})

export default FavoriteScreen;
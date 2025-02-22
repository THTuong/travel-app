import React, { useState, useCallback } from "react";
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
    Platform,
    StatusBar,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const OnboardingScreen = ({ navigation }) => {

    const backAction = () => {
        if (Platform.OS === "ios") {
            navigation.addListener("beforeRemove", (e) => {
                e.preventDefault();
            });
        } else {
            backClickCount == 1 ? BackHandler.exitApp() : _spring();
            return true;
        }
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            navigation.addListener("gestureEnd", backAction);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", backAction);
                navigation.removeListener("gestureEnd", backAction);
            };
        }, [backAction])
    );

    function _spring() {
        setbackClickCount(1);
        setTimeout(() => {
            setbackClickCount(0);
        }, 1000)
    }

    const [backClickCount, setbackClickCount] = useState(0);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../assets/images/bg.jpg')}
                resizeMode="cover"
            >
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    colors={['black', 'rgba(0,0.10,0,0.77)', 'rgba(0,0,0,0.1)',]}
                    style={styles.pageStyle}
                >
                    {inspiringTitle()}
                    {inspiringDescription()}
                    {startButton()}
                </LinearGradient>
            </ImageBackground>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor14Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </View >
    )

    function inspiringDescription() {
        return (
            <Text style={{ ...Fonts.grayColor16Regular, marginTop: Sizes.fixPadding + 5.0 }}>
                lives without limits the world is made to explore and appreciate its beauty
            </Text>
        )
    }

    function inspiringTitle() {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.whiteColor30Bold }}>
                        {`The `}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor30Bold }}>
                        best travel
                    </Text>
                </View>
                <Text style={{ ...Fonts.whiteColor30Bold }}>
                    in the world
                </Text>
            </View>
        )
    }

    function startButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Welcome')}
                style={styles.startButtonStyle}>
                <Text style={{ ...Fonts.whiteColor15Regular }}>Start</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    pageStyle: {
        flex: 1,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'flex-end',
    },
    startButtonStyle: {
        width: 65.0,
        height: 65.0,
        borderRadius: 37.5,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 8.0,
        marginBottom: Sizes.fixPadding * 4.0
    }
})

export default OnboardingScreen;
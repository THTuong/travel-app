import React, { useState } from "react";
import {
    Text,
    View,
    StatusBar,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Keyboard,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { CircleFade } from 'react-native-animated-spinkit';
import OTPField from 'react-native-otp-field';
import { Modal } from 'react-native-paper';

const { width } = Dimensions.get('screen');

const VerificationScreen = ({ navigation }) => {

    const [otpInput, setotpInput] = useState('');
    const [isLoading, setisLoading] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../assets/images/bg.jpg')}
                resizeMode="cover"
            >
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    colors={['black', 'rgba(0,0.10,0,0.77)', 'rgba(0,0,0,0.1)',]}
                    style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
                >
                    {backArrow()}
                    <ScrollView
                        automaticallyAdjustKeyboardInsets={true}
                        showsVerticalScrollIndicator={false}
                    >
                        {verificationInfo()}
                        {otpFields()}
                        {resendInfo()}
                        {submitButton()}
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
            {loading()}
        </View >
    )

    function backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color={Colors.whiteColor}
                style={{
                    marginTop: Sizes.fixPadding * 7.0,
                    marginBottom: Sizes.fixPadding,
                    alignSelf: 'flex-start'
                }}
                onPress={() => navigation.pop()}
            />
        )
    }

    function loading() {
        return (
            <Modal
                visible={isLoading}
                onDismiss={() => { setisLoading(false) }}
                contentContainerStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <CircleFade size={56} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor16Regular,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Please wait..
                    </Text>
                </View>
            </Modal>
        );
    }

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    setisLoading(true)
                    setTimeout(() => {
                        setisLoading(false)
                        navigation.push('Register')
                    }, 2000);
                }}
            >
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={['rgba(68, 182, 200, 0.4)', 'rgba(68, 182, 200, 0.5)', 'rgba(68, 182, 200, 0.6)']}
                    style={styles.submitButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Regular }}>
                        Submit
                    </Text>
                </LinearGradient>
            </TouchableOpacity >
        )
    }

    function resendInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Sizes.fixPadding * 5.0
            }}>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Didn’t receive otp code!
                </Text>
                <Text style={{ ...Fonts.whiteColor18Regular, marginLeft: Sizes.fixPadding - 5.0 }}>
                    Resend
                </Text>
            </View>
        )
    }

    function otpFields() {
        return (
            <OTPField
                length={4}
                value={otpInput}
                onChange={(val) => {
                    setotpInput(val);
                    if (val.length == 4) {
                        Keyboard.dismiss();
                        setisLoading(true)
                        setTimeout(() => {
                            setisLoading(false)
                            navigation.push('Register')
                        }, 2000);
                    }
                }}
                textFieldStyle={{ ...styles.textFieldStyle }}
                containerStyle={{
                    justifyContent: 'space-between',
                    marginTop: Sizes.fixPadding * 4.0,
                }}
                cursorColor={Colors.primaryColor}
                selectionColor={Colors.primaryColor}
            />
        )
    }

    function verificationInfo() {
        return (
            <View style={{
                marginTop: Sizes.fixPadding * 3.0,
                marginBottom: Sizes.fixPadding * 4.0
            }}>
                <Text style={{ ...Fonts.whiteColor30Bold }}>
                    Verification
                </Text>
                <Text style={{
                    ...Fonts.whiteColor17Regular,
                    marginTop: Sizes.fixPadding
                }}>
                    Enter the otp code from the phone we just sent you
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textFieldStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: width / 8.0,
        height: width / 8.0,
        ...Fonts.whiteColor18Regular,
    },
    submitButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.5,
        height: 55.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    dialogContainerStyle: {
        backgroundColor: Colors.whiteColor,
        width: '85%',
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding * 2.0
    },
})

export default VerificationScreen;
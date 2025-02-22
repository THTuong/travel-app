import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Modal } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const ProfileScreen = ({ navigation }) => {

    const [logoutDialog, setlogoutDialog] = useState(false)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ flex: 1 }}>
                {header()}
                {userInfo()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, backgroundColor: '#F4F4F4' }}
                >
                    {settingsInfo()}
                    {logOutInfo()}
                </ScrollView>
            </View>
            {logoutDialogFun()}
        </View>
    )

    function logoutDialogFun() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={logoutDialog}
                onRequestClose={() => { setlogoutDialog(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setlogoutDialog(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{ ...styles.dialogContainerStyle }}
                        >
                            <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', }}>
                                <Text style={{ ...Fonts.blackColor18Regular, paddingBottom: Sizes.fixPadding - 5.0, }}>
                                    You sure want to logout?
                                </Text>
                                <View style={styles.cancelAndLogoutButtonWrapStyle}>
                                    <TouchableOpacity
                                        activeOpacity={0.6}
                                        onPress={() => setlogoutDialog(false)}
                                        style={styles.cancelButtonStyle}
                                    >
                                        <Text style={{ ...Fonts.blackColor18Regular }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.6}
                                        onPress={() => {
                                            setlogoutDialog(false)
                                            navigation.push('Welcome')
                                        }}
                                        style={styles.logOutButtonStyle}
                                    >
                                        <Text style={{ ...Fonts.whiteColor18Regular }}>Log out</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function logOutInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setlogoutDialog(true)}
                style={styles.logOutInfoWrapStyle}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="login-variant" size={24} color={Colors.grayColor} />
                    <Text style={{
                        ...Fonts.blackColor15Regular,
                        marginLeft: Sizes.fixPadding,
                        width: width / 1.8,
                    }}>
                        Logout
                    </Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={15} color={Colors.grayColor} />
            </TouchableOpacity>
        )
    }

    function settingsInfo() {
        return (
            <View style={styles.settingInfoWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('Notification')}
                >
                    {settings({
                        icon: <MaterialIcons name="notifications" size={22} color={Colors.grayColor} />,
                        setting: 'Notifications'
                    })}
                </TouchableOpacity>
                {settings({
                    icon: <AntDesign name="earth" size={20} color={Colors.grayColor} />,
                    setting: 'Language'
                })}
                {settings({
                    icon: <MaterialIcons name="settings" size={22} color={Colors.grayColor} />,
                    setting: 'Settings'
                })}
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('InviteFriends')}
                >
                    {settings({
                        icon: <MaterialIcons name="group-add" size={24} color={Colors.grayColor} />,
                        setting: 'Invite Friends'
                    })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('TravelProCash')}
                >
                    {settings({
                        icon: <MaterialIcons name="account-balance-wallet" size={22} color={Colors.grayColor} />,
                        setting: 'TravelPro Cash'
                    })}
                </TouchableOpacity>
                {settings({
                    icon: <MaterialIcons name="headset-mic" size={22} color={Colors.grayColor} />,
                    setting: 'Support'
                })}
            </View>
        )
    }

    function settings({ icon, setting }) {
        return (
            <View style={styles.settingStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {icon}
                    <Text style={{
                        ...Fonts.blackColor15Regular,
                        marginLeft: Sizes.fixPadding,
                        width: width / 1.8,
                    }}>
                        {setting}
                    </Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={15} color={Colors.grayColor} />
            </View>
        )
    }

    function userInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('EditProfile')}
                style={styles.userInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/user/user_3.jpg')}
                        style={{
                            width: 80.0, height: 80.0,
                            borderRadius: Sizes.fixPadding - 5.0,
                        }}
                        resizeMode="cover"
                    />
                    <View style={styles.userInfoStyle}>
                        <Text style={{
                            ...Fonts.blackColor17Regular,
                            width: width / 2.3,
                        }}>
                            Ellison Perry
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Regular }}>
                            123456789
                        </Text>
                    </View>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={15} color={Colors.grayColor} />
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <Text style={{
                ...Fonts.blackColor20Bold,
                paddingHorizontal: Sizes.fixPadding * 2.0,
                paddingVertical: Sizes.fixPadding * 2.0,
            }}>
                Profile
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    userInfoWrapStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Sizes.fixPadding * 2.0
    },
    userInfoStyle: {
        height: 80.0,
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding,
        marginLeft: Sizes.fixPadding
    },
    logOutInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        flexDirection: 'row',
        marginVertical: Sizes.fixPadding,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#F1F1F1',
        borderWidth: 2.0,
    },
    settingInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        margin: Sizes.fixPadding,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderColor: '#F1F1F1',
        borderWidth: 2.0,
    },
    settingStyle: {
        flexDirection: 'row',
        marginVertical: Sizes.fixPadding - 1.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dialogContainerStyle: {
        backgroundColor: Colors.whiteColor,
        width: '90%',
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    logOutButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    cancelAndLogoutButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0
    }
})

export default ProfileScreen;
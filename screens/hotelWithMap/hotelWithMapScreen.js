import React, { useState, useEffect } from "react";
import { Text, View, Animated, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, CommonStyle } from "../../constants/styles";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from '@expo/vector-icons';
import { markers } from "../../components/hotelsWithMarkerList";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get('screen');

const cardWidth = width / 1.4;

const HotelWithMapScreen = ({ navigation }) => {

    const [markerList] = useState(markers);
    const [region] = useState(
        {
            latitude: 22.62938671242907,
            longitude: 88.4354486029795,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        }
    );

    let mapAnimation = new Animated.Value(0);
    let mapIndex = 0;

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / cardWidth + 0.3);
            if (index >= markerList.length) {
                index = markerList.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex != index) {
                    mapIndex = index;
                    const { coordinate } = markerList[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta,
                        }, 350
                    )
                }
            }, 10);
        });
    });

    const interpolation = markerList.map((marker, index) => {
        const inputRange = [
            (index - 1) * cardWidth,
            index * cardWidth,
            ((index + 1) * cardWidth),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        })

        return { scale };
    })

    const _map = React.useRef(null);

    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar />
            {header()}
            <View style={{ flex: 1 }}>
                <MapView
                    ref={_map}
                    initialRegion={
                        region
                    }
                    style={{ height: '100%' }}
                >
                    {markerList.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolation[index].scale
                                }
                            ]
                        }
                        return (
                            <Marker
                                key={index}
                                coordinate={marker.coordinate}
                            >
                                <Animated.View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 70.0,
                                        height: 70.0
                                    }}
                                >
                                    <Animated.Image
                                        source={require('../../assets/images/icons/marker.png')}
                                        resizeMode="cover"
                                        style={[styles.markerStyle, scaleStyle]}
                                    >
                                    </Animated.Image>
                                </Animated.View>
                            </Marker>
                        )
                    }
                    )}
                </MapView>
                <Animated.ScrollView
                    horizontal={true}
                    scrollEventThrottle={32}
                    showsHorizontalScrollIndicator={false}
                    style={styles.hotelsInfoWrapStyle}
                    snapToInterval={cardWidth + 40}
                    decelerationRate='fast'
                    contentContainerStyle={{
                        paddingLeft: width / 13.5,
                        paddingRight: Sizes.fixPadding * 2.0
                    }}
                    onScroll={
                        Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: mapAnimation,
                                        }
                                    }
                                }
                            ],
                            { useNativeDriver: true }
                        )
                    }
                >
                    {markerList.map((marker, index) => (
                        <View key={index}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => navigation.push('HotelDetail',
                                    {
                                        item: marker
                                    }
                                )}
                                style={{
                                    ...styles.hotelsWrapStyle,
                                }}>
                                <Image
                                    source={marker.hotelImage}
                                    style={styles.hotelImageStyle}
                                    resizeMode="cover"
                                />
                                <View style={styles.hotelDetailWrapStyle}>
                                    <Text numberOfLines={2} style={{ ...Fonts.blackColor14Bold }}>
                                        {marker.hotelName}
                                    </Text>
                                    <Text numberOfLines={2} style={{ ...Fonts.blackColor13Regular }}>
                                        {marker.hotelAddress}
                                    </Text>
                                    <Text numberOfLines={2} style={{ ...Fonts.primaryColor13Regular }}>
                                        {marker.hotelAbout}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </Animated.ScrollView>
            </View>
        </View>
    )

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Regular }}>
                    Hotel
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    style={{
                        position: 'absolute',
                        left: 20.0,
                    }}
                    onPress={() => navigation.pop()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        height: 56.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerStyle: {
        width: 30.0,
        height: 30.0
    },
    directionButtonStyle: {
        position: 'absolute',
        right: 10.0,
        bottom: 10.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding - 7.0,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding + 10.0,
    },
    hotelsInfoWrapStyle: {
        position: 'absolute',
        bottom: 50.0,
        left: 0.0,
        right: 0.0,
        paddingVertical: 10.0,
    },
    hotelsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        width: width / 1.4,
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        ...CommonStyle.shadow
    },
    hotelDetailWrapStyle: {
        height: 150.0,
        width: width / 2.2,
        justifyContent: 'space-between',
        padding: Sizes.fixPadding
    },
    hotelImageStyle: {
        height: 150.0,
        width: 100.0,
        borderTopLeftRadius: Sizes.fixPadding,
        borderBottomLeftRadius: Sizes.fixPadding,
    }
})

export default HotelWithMapScreen;
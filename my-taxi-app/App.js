import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { incheonTaxiways } from './assets/incheonTaxiways';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.46,
          longitude: 126.44,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {incheonTaxiways.features.map((feature, index) => (
          <Polyline
            key={index}
            coordinates={feature.geometry.coordinates.map(([lng, lat]) => ({
              latitude: lat,
              longitude: lng
            }))}
            strokeColor="#FF0000"
            strokeWidth={2}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

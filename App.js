import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';  // expo-location을 임포트

export default function App() {
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [instruction, setInstruction] = useState('');  // 관제사 지시를 저장할 상태

  useEffect(() => {
    (async () => {
      try {
        // 위치 권한 요청
        let { status } = await Location.requestForegroundPermissionsAsync();
        setHasPermission(status === 'granted');

        // 권한이 없으면 알림
        if (status !== 'granted') {
          alert('Permission to access location was denied');
          return;
        }

        // 위치 정보 가져오기
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      } catch (error) {
        console.error(error);  // 오류 출력
        alert('An error occurred while fetching location');
      }
    })();
  }, []);

  // 위치 권한을 요청 중일 때 로딩 화면 표시
  if (hasPermission === null) {
    return <Text>Loading...</Text>;
  }

  // 위치 권한이 거부된 경우 에러 메시지 표시
  if (hasPermission === false) {
    return <Text>Permission to access location was denied</Text>;
  }

  // 관제사 지시를 화면에 표시하는 함수
  const handleInstructionChange = (text) => {
    setInstruction(text);
  };

  return (
    <View style={styles.container}>
      {/* 관제사 지시 입력란 */}
      <TextInput
        style={styles.input}
        placeholder="Enter control tower instructions"
        value={instruction}
        onChangeText={handleInstructionChange}
      />

      {/* 지시를 입력한 후 버튼을 누르면 화면에 지시가 표시됨 */}
      <Button title="Submit Instruction" onPress={() => console.log("Instruction Submitted:", instruction)} />

      {/* 입력된 지시를 화면에 표시 */}
      <Text style={styles.instructionText}>Control Tower Instruction: {instruction}</Text>

      {/* 지도 컴포넌트 */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 37.4598,  // 기본 위치 설정
          longitude: location ? location.longitude : 126.4406,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* 사용자의 현재 위치에 마커 표시 */}
        {location && (
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        )}

        {/* 택시웨이 경로 표시 (예시 좌표) */}
        <Polyline
          coordinates={[{ latitude: 37.4598, longitude: 126.4406 }, { latitude: 37.4600, longitude: 126.4410 }]}  
          strokeColor="#0000FF"
          strokeWidth={6}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  map: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    marginTop: 10,
  },
  instructionText: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
  },
});

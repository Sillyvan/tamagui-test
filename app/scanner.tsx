import { CameraView, useCameraPermissions } from 'expo-camera';
import { Stack, useRouter } from 'expo-router';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useBarcodeData } from './BarcodeDataContext';

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const { setBarcodeData } = useBarcodeData();
  const router = useRouter();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Scannr' }} />
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{ barcodeTypes: ['ean13'] }}
          onBarcodeScanned={(event) => {
            setBarcodeData(event.data);
            router.back();
          }}></CameraView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

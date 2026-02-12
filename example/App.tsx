import { AddressSelectorView } from 'address-selector-rn';
import { ScrollView, View } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.group}>
        <AddressSelectorView
          onComplete={(address) => {
            const parts = [
              address.ward?.name,
              address.district?.name,
              address.province?.name,
            ].filter(Boolean);
            console.log('Địa chỉ đã chọn:', parts.join(', '));
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = {
  group: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingTop: 40,
  },
};

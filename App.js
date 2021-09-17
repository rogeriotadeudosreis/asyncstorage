import React, {useState} from 'react';
import {Button, Keyboard, StyleSheet, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [nome, setNome] = useState('');

  async function handleGravarNome() {
    await AsyncStorage.setItem('nome', nome);
    alert('Salvo com sucesso !');
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <TextInput value={nome} onChangeText={setNome} />
      <Button title="Salvar Nome" onPress={handleGravarNome}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, {useEffect, useState} from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  TextInput,
  View, Text,
  YellowBox,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [nome, setNome] = useState('');
  const [nomeSalvo, setNomeSalvo] = useState('');

  async function handleGravarNome() {
    await AsyncStorage.setItem('nome', nome);
    alert('Salvo com sucesso !');
    Keyboard.dismiss();
  }

  // Similar ao ComponentDidMount e ComponentDiUpdate
  // Carregar uma única vez antres de renderizar todos os componentes
  useEffect(async () => {

    // Buscando o dado que foi salvo anteriormente
    await AsyncStorage.getItem('nome').then(value => {
      setNomeSalvo(value);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />
      <Button title="Salvar Nome" onPress={handleGravarNome}></Button>
      <View>
        <TextInput style={styles.input}>{nomeSalvo}</TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'yellow',
    width: '100%',
  },
});

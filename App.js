import React, {useEffect, useState} from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
  Text,
  YellowBox,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [nome, setNome] = useState('');
  const [nomeSalvo, setNomeSalvo] = useState('');
  const [token, setToken] = useState('');
  const respondeData = { token: 'token_exemplo_estático', admin: true}

  async function handleGravarNome() {
    await AsyncStorage.setItem('nome', nome);
    alert('Salvo com sucesso !');
    setNome=('');
    Keyboard.dismiss();
  }
 
  async function handleGravarToken() {
    await AsyncStorage.setItem('ACCESS_TOKEN', JSON.stringify(respondeData), (err) => {
      if (err) {
        console.log('Ocorreu um erro aqui...')
        throw err;
      }
      alert('Salvo token com sucesso !')
    }).catch((err) => {
      console.log('Ocorreu outro erro aqui também')
    })
    Keyboard.dismiss()
  }
  // Similar ao ComponentDidMount e ComponentDiUpdate
  // Carregar uma única vez antres de renderizar todos os componentes
  useEffect(async () => {
    // Buscando o dado que foi salvo anteriormente
    await AsyncStorage.getItem('nome').then(value => {
      setNomeSalvo(value);
    });

    try {
      const value = await AsyncStorage.getItem('ACCESS_TOKEN');
      console.warn(value);
      if (value !== null) {
        setToken(JSON.parse(value))
      }
    } catch (error) {
      console.log('Ocorreu algum tipo de erro com o token...')
    }

  }, []);


  return (
    <View style={styles.container}>
      <TextInput placeholder="Digite aqui para salvar" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Nome vindo do storage" style={styles.input}>Nome vindo do storage: {nomeSalvo}</TextInput>
      <Button title="Salvar Nome" onPress={handleGravarNome}></Button>
      <Button title="Salvar Token" onPress={handleGravarToken}></Button>
      <TextInput placeholder="Token vindo do storage" style={styles.input}>{setToken}</TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    width: '98%',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
});

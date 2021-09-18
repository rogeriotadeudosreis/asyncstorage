import React, {useEffect, useState} from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//  Aqui a App principal do aplicativo
export default function App() {
  const [nome, setNome] = useState('');
  const [nomeSalvo, setNomeSalvo] = useState('');
  const [token, setToken] = useState('');

  // Na linha abaixo um token estático para teste do async
  const respondeData = {token: 'guardando_token_exemplo_estático', admin: true};

  // Aqui abaixo uma função para gravar o nome no storage
  async function handleGravarNome() {
    await AsyncStorage.setItem('nome', nome);
    alert('Salvo com sucesso !');
    setNome = '';
    Keyboard.dismiss();
  }

  // Aqui abaixo uma função para gravar o token estático no storage
  async function handleGravarToken() {
    await AsyncStorage.setItem(
      'ACCESS_TOKEN',
      JSON.stringify(respondeData),
      err => {
        if (err) {
          console.log('Ocorreu um erro aqui...');
          throw err;
        }
        alert('Salvo token com sucesso !');
      },
    ).catch(err => {
      console.log('Ocorreu outro erro aqui também');
    });
    Keyboard.dismiss();
  }
  // Similar ao ComponentDidMount e ComponentDiUpdate
  // Carregar uma única vez antres de renderizar todos os componentes
  useEffect(async () => {
    // Buscando o dado que foi salvo no storage
    await AsyncStorage.getItem('nome').then(value => {
      setNomeSalvo(value);
    });

    try {
      // Trazendo o token salvo no storage
      const value = await AsyncStorage.getItem('ACCESS_TOKEN');
      if (value !== null) {
        setToken(value);
      }
    } catch (error) {
      console.log('Ocorreu algum tipo de erro com o token...');
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite aqui para salvar"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput placeholder="Nome vindo do storage" style={styles.input}>
        Nome vindo do storage: {nomeSalvo}
      </TextInput>
      <Button
        title="Salvar Nome"
        onPress={handleGravarNome}
        style={styles.botao}></Button>
      <Button
        title="Salvar Token"
        onPress={handleGravarToken}
        style={styles.botao}></Button>
      <TextInput placeholder="Token vindo do storage" style={styles.input}>
        {token}
      </TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  botao: {
    marginBottom:5,

  },
});

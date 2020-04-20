import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'

import api from './services/api'

export default function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Alberto Pampado'
    })

    const project = response.data

    setProjects([...projects, project])
  }


  return (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#000"/>

    <SafeAreaView style={styles.container}> 
    <FlatList
      data={projects}
      keyExtractor={project => project.id}
      renderItem={({ item }) => (
        <Text style={styles.project}>{item.title}</Text>
      )}
    />

    <TouchableOpacity 
      activeOpacity={.6} 
      style={styles.button} 
      onPress={handleAddProject}
    >
      <Text style={styles.buttonText}>Adicionar projeto</Text>
    </TouchableOpacity>
    
    
    </SafeAreaView>


    {/* <View style={styles.container}>
        {projects.map(project => (
          <Text style={styles.project} key={project.id}>{project.title}</Text>
        ))}
    </View> */}
  </>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  project: {
    color: '#CCC',
    fontSize: 20,
    
  },

  button: {
    backgroundColor: '#333',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
})
import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.value
      }
    })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type !== 'all') {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(resp => resp.json())
        .then(data => this.setState({pets: data}))
    } else {
      fetch(`/api/pets`)
        .then(resp => resp.json())
        .then(data => this.setState({pets: data}))
    }
  }

  onAdoptPet = petId => {
    const pet = this.state.pets.find(pet => pet.id === petId)
    pet.isAdopted = true
    this.setState({...pet, isAdopted: true})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              pets={this.state.pets}
              onAdoptPet={this.onAdoptPet.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

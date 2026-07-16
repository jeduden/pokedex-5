import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        const data = await response.json()
        setPokemon(data.results)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  return (
    <div className="container">
      <h1>Pokedex</h1>
      {loading && <p>Loading Pokémon...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div className="pokemon-list">
          {pokemon.map((p) => (
            <div key={p.name} className="pokemon-card">
              <h3>{p.name}</h3>
              <p>{p.url}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App

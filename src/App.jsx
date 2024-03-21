import { useState, useEffect } from 'react'
import './App.css'

function App() {
	const [data, setData] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		// Lägg till en fördröjning så man hinner se vad som händer
		setTimeout(() => getData(setData, setErrorMessage), 1000)
	}, [])

	const handleTomorrow = async () => {
		// Nollställ data och errorMessage när vi börjar ett nytt request
		setData(null)
		setErrorMessage('')

		// Lägg till en fördröjning så man hinner se vad som händer
		setTimeout(() => getData(setData, setErrorMessage, '&date=tomorrow&timezone=Europe/Stockholm'), 1000)
	}

	return (
		<div className="app">
			<h1> AJAX </h1>
			{data === null ?
				<p> Väntar på API... </p> :
				<p> Solen gick upp kl {data.sunrise} idag och går ner kl {data.sunset}. </p>
			}
			{errorMessage !== '' && <p>{errorMessage}</p>}

			<p>
				<button onClick={handleTomorrow}> Men imorgon då? </button>
			</p>

			<p>
			Powered by <a href="https://sunrisesunset.io/">SunriseSunset.io</a>.
			</p>
		</div>
	)
}
// Europe/Stockholm

async function getData(dataCallback, errorCallback, settings='') {
	const defaultLat = 57.6731597, defaultLng = 11.8787299
	const url = `https://api.sunrisesunset.io/json?lat=${defaultLat}&lng=${defaultLng}` + settings

	try {
		const response = await fetch(url)
		const data = await response.json()
		// console.log('getData: data is ', data);
		if( data.status === 'OK' ) {
			let obj = { sunrise: data.results.sunrise, sunset: data.results.sunset }
			dataCallback(obj)  // blir samma som: setData(data)
		} else {
			errorCallback('Status från API är inte okej.')
		}
	}
	catch {
		// visa meddelande om att vi inte har lyckats hämta data
		errorCallback('Något gick fel, försök igen.')
	}
}


export default App

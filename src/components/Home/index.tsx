import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { MagnifyingGlass } from 'phosphor-react';
import {
	ButtonForm,
	DetailContainer,
	FormContainer,
	HomeContainer,
} from './styles';

const apiKey = '514d2c2ab2d3fce3c2915883fbbac4f6';

const newSearchFormSchema = zod.object({
	cityName: zod.string().min(1, 'Informe o nome da cidade'),
});

interface NewSearchFormData {
	cityName: string;
}

export function Home() {
	const { register, handleSubmit, watch } = useForm({
		resolver: zodResolver(newSearchFormSchema),
		defaultValues: {
			cityName: '',
		},
	});

	const [city, setCity] = useState('');
	const [weather, setWeather] = useState({
		name: '',
		desc: '',
		temp: '',
	});

	const cityNameWatch = watch('cityName');
	const isSubmitDisabled = !cityNameWatch;

	const isWeatherTempEmpty = weather.temp != '';
	const isWeatherDescEmpty = weather.desc != '';
	const isWeatherNameEmpty = weather.name != '';

	async function handleApiCall(data: NewSearchFormData) {
		const city = data.cityName;
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
		const reqApi = axios.get(apiUrl);
		console.log(reqApi);

		const resApi = await reqApi;
		setWeather({
			name: resApi.data.name,
			desc: resApi.data.weather[0].description,
			temp: Math.floor(resApi.data.main.temp).toString(),
		});

		setCity(resApi.data.name);
	}

	return (
		<HomeContainer>
			<form action="" onSubmit={handleSubmit(handleApiCall)}>
				<FormContainer>
					<input
						type="text"
						id=""
						placeholder="City Name"
						autoComplete="off"
						{...register('cityName')}
					/>
				</FormContainer>
				<ButtonForm disabled={isSubmitDisabled} type="submit">
					Search
					<MagnifyingGlass size={18} />
				</ButtonForm>
			</form>

			<DetailContainer>
				<img src="https://openweathermap.org/img/wn/02d@2x.png" alt="" />
				<h1>{isWeatherTempEmpty ? weather.temp + '°C' : '???'}</h1>
				<span>{isWeatherDescEmpty ? weather.desc : '???'}</span>
				<p>{isWeatherNameEmpty ? city : '?????'}</p>
			</DetailContainer>
		</HomeContainer>
	);
}

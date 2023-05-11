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

const apiKey = import.meta.env.VITE_VALUE_API_KEY;

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
		icon: '',
	});

	const cityNameWatch = watch('cityName');
	const isSubmitDisabled = !cityNameWatch;

	const hasWeatherImage = weather.icon != '';
	const hasWeatherTemp = weather.temp != '';
	const hasWeatherDesc = weather.desc != '';
	const hasWeatherName = weather.name != '';

	async function handleApiCall(data: NewSearchFormData) {
		const city = data.cityName;
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
		const reqApi = axios.get(apiUrl);

		const resApi = await reqApi;
		setWeather({
			name: resApi.data.name,
			desc: resApi.data.weather[0].description,
			temp: Math.floor(resApi.data.main.temp).toString(),
			icon: resApi.data.weather[0].icon,
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
					Buscar
					<MagnifyingGlass size={18} />
				</ButtonForm>
			</form>

			<DetailContainer>
				<img
					src={
						hasWeatherImage
							? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
							: 'https://openweathermap.org/img/wn/02d@2x.png'
					}
					alt=""
				/>
				<h1>{hasWeatherTemp ? weather.temp + '°C' : '???'}</h1>
				<span>{hasWeatherDesc ? weather.desc : '???'}</span>
				<p>{hasWeatherName ? city : '?????'}</p>
			</DetailContainer>
		</HomeContainer>
	);
}

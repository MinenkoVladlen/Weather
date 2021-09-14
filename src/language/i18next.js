import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	en: {
		translation: {
			'City name': 'City name',
			'Add': 'Add',
			'Feels like': 'Feels like',
			'Humidity': 'Humidity',
			'Wind': 'Wind',
			'Pressure': 'Pressure',
			'There is nothing here yet': 'There is nothing here yet',
			'No cities...': 'No cities...'
		}
	},
	ru: {
		translation: {
			'City name': 'Название города',
			'Add': 'Добавить',
			'Feels like': 'Ощущается как',
			'Humidity': 'Влажность',
			'Wind': 'Ветер',
			'Pressure': 'Давление',
			'There is nothing here yet': 'Здесь пока ничего нет',
			'No cities...': 'Городов нет...'
		}
	},
	ua: {
		translation: {
			'City name': 'Назва міста',
			'Add': 'Додати',
			'Feels like': 'Відчувається як',
			'Humidity': 'Вологість',
			'Wind': 'Вітер',
			'Pressure': 'Тиск',
			'There is nothing here yet': 'Тут поки нічого немає',
			'No cities...': 'Міста не знайдено...'
		}
	}
};

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: "en",
		keySeparator: false,
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;

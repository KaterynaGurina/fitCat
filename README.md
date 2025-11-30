# Fitness & Nutrition Tracker

A full-stack web application for tracking fitness and nutrition goals. Search exercises by muscle group, analyze food nutrition, and calculate daily calorie needs.

![Fitness Tracker](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-v4.18-blue)

## 🚀 Features

### 🏋️ Exercise Search
- Search exercises by muscle group
- Get detailed instructions and equipment requirements
- Filter by difficulty level
- 16+ muscle groups available

### 🥗 Nutrition Analysis
- Analyze nutritional content of foods
- Get detailed macronutrient breakdown
- View calories, protein, carbs, fats, and micronutrients
- Real-time API integration

### 🧮 Calorie Calculator
- Calculate Basal Metabolic Rate (BMR)
- Determine Total Daily Energy Expenditure (TDEE)
- Get personalized calorie goals for weight loss/gain/maintenance
- Recommended macro distribution (protein, carbs, fats)
- Uses Mifflin-St Jeor equation for accuracy

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** EJS templating, CSS3
- **APIs:** API Ninjas (Exercise & Nutrition)
- **Environment:** dotenv for configuration

## 📦 Installation
```bash
# Clone repository
git clone https://github.com/KaterynaGurina/fitCat

# Navigate to project
cd firCat

# Install dependencies
npm install

# Create .env file
echo "PORT=3000
EXERCISE_API_KEY=your-api-key-here" > .env

# Run application
npm start
```

## 🔑 Getting API Key

1. Visit [API Ninjas](https://api-ninjas.com/)
2. Sign up for free account
3. Get your API key from dashboard
4. Add to `.env` file

## 📱 Usage

1. **Exercise Search:**
   - Select muscle group from dropdown
   - View 10 relevant exercises with instructions

2. **Nutrition Analysis:**
   - Enter food item (e.g., "chicken breast", "apple")
   - View complete nutritional breakdown

3. **Calorie Calculator:**
   - Enter age, gender, weight, height
   - Select activity level
   - Get personalized calorie and macro recommendations

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Homepage |
| GET | `/exercises` | Exercise search page |
| POST | `/exercises` | Search exercises |
| GET | `/nutrition` | Nutrition analysis page |
| POST | `/nutrition` | Analyze food |
| GET | `/calculator` | Calculator page |
| POST | `/calculator` | Calculate calories |
| GET | `/health` | Health check |

## 📊 Project Structure
```
fitness-nutrition-tracker/
├── public/
│   └── styles/
│       └── main.css
├── views/
│   ├── index.ejs
│   ├── exercises.ejs
│   ├── nutrition.ejs
│   └── calculator.ejs
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## 🎯 What I Learned

- RESTful API integration with third-party services
- Server-side rendering with EJS
- Form handling and data validation
- Responsive web design
- Environment variable management
- Error handling and user feedback
- Implementing scientific formulas (BMR/TDEE calculations)

## 📈 Future Improvements

- [ ] Try another API with a more extended database
- [ ] User authentication and profiles
- [ ] Save workouts and meals
- [ ] Progress tracking with charts
- [ ] Self database integration (MongoDB/PostgreSQL)
- [ ] Meal planning feature
- [ ] Workout routine builder
- [ ] Mobile app version

## 👨‍💻 Author

Kateryna Gurina
- [LinkedIn](https://www.linkedin.com/in/kateryna-gurina-156512160/)
- [Portfolio](https://katerynagurina.github.io/Project-Personal-Website/cv.html)
- [GitHub](https://github.com/KaterynaGurina)

## 📄 License

MIT License - feel free to use this project for learning!

## 🙏 Acknowledgments

- API Ninjas for exercise and nutrition data
- Mifflin-St Jeor equation for BMR calculations
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const EXERCISE_API_KEY = process.env.EXERCISE_API_KEY;

// API URLs
const EXERCISE_API_URL = "https://api.api-ninjas.com/v1/exercises";
const NUTRITION_API_URL = "https://api.api-ninjas.com/v1/nutrition";

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

// Error handler middleware
const handleError = (res, error, defaultMessage) => {
    console.error("Error:", error.message);
    return {
        error: error.response?.data?.message || defaultMessage
    };
};

// HOME
app.get("/", (req, res) => {
    res.render("index.ejs", {
        title: "Fitness & Nutrition Tracker"
    });
});

// EXERCISES - GET
app.get("/exercises", (req, res) => {
    res.render("exercises.ejs", {
        title: "Exercise Search",
        exercises: null,
        error: null
    });
});

// EXERCISES - POST
app.post("/exercises", async (req, res) => {
    const muscleGroup = req.body.muscle;
    
    if (!muscleGroup) {
        return res.render("exercises.ejs", {
            title: "Exercise Search",
            exercises: null,
            error: "Please select a muscle group"
        });
    }
    
    try {
        const response = await axios.get(EXERCISE_API_URL, {
            params: { muscle: muscleGroup },
            headers: { 'X-Api-Key': EXERCISE_API_KEY }
        });
        
        const exercises = response.data.slice(0, 10);
        
        res.render("exercises.ejs", {
            title: "Exercise Results",
            exercises: exercises,
            error: exercises.length === 0 ? "No exercises found. Try another muscle group!" : null
        });
        
    } catch (error) {
        res.render("exercises.ejs", {
            title: "Exercise Search",
            exercises: null,
            ...handleError(res, error, "Failed to fetch exercises. Please try again.")
        });
    }
});

// NUTRITION - GET
app.get("/nutrition", (req, res) => {
    res.render("nutrition.ejs", {
        title: "Nutrition Analysis",
        nutrition: null,
        error: null
    });
});

// NUTRITION - POST
app.post("/nutrition", async (req, res) => {
    const foodQuery = req.body.food;
    
    if (!foodQuery || foodQuery.trim().length === 0) {
        return res.render("nutrition.ejs", {
            title: "Nutrition Analysis",
            nutrition: null,
            error: "Please enter a food item"
        });
    }
    
    try {
        const response = await axios.get(NUTRITION_API_URL, {
            params: { query: foodQuery.trim() },
            headers: { 'X-Api-Key': EXERCISE_API_KEY }
        });
        
        const nutritionData = response.data;
        
        res.render("nutrition.ejs", {
            title: "Nutrition Results",
            nutrition: nutritionData,
            error: nutritionData.length === 0 ? "No nutrition data found. Try a simpler food name!" : null
        });
        
    } catch (error) {
        res.render("nutrition.ejs", {
            title: "Nutrition Analysis",
            nutrition: null,
            ...handleError(res, error, "Failed to analyze nutrition. Please try again.")
        });
    }
});

// CALCULATOR - GET
app.get("/calculator", (req, res) => {
    res.render("calculator.ejs", {
        title: "Calorie Calculator",
        results: null
    });
});

// CALCULATOR - POST
app.post("/calculator", (req, res) => {
    try {
        const { age, gender, weight, height, activity } = req.body;
        
        // Validation
        if (!age || !gender || !weight || !height || !activity) {
            return res.render("calculator.ejs", {
                title: "Calorie Calculator",
                results: null,
                error: "Please fill in all fields"
            });
        }
        
        const ageNum = parseInt(age);
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);
        
        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr;
        if (gender === "male") {
            bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) + 5;
        } else {
            bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) - 161;
        }
        
        // Activity multipliers
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };
        
        const tdee = bmr * activityMultipliers[activity];
        
        // Calculate macros
        const protein = (tdee * 0.30) / 4;
        const carbs = (tdee * 0.40) / 4;
        const fat = (tdee * 0.30) / 9;
        
        const results = {
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            deficit: Math.round(tdee - 500),
            surplus: Math.round(tdee + 300),
            protein: Math.round(protein),
            carbs: Math.round(carbs),
            fat: Math.round(fat),
            gender,
            age: ageNum,
            weight: weightNum,
            height: heightNum,
            activity
        };
        
        res.render("calculator.ejs", {
            title: "Your Results",
            results: results
        });
        
    } catch (error) {
        console.error("Calculator error:", error.message);
        res.render("calculator.ejs", {
            title: "Calorie Calculator",
            results: null,
            error: "Calculation error. Please check your inputs."
        });
    }
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ 
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render("index.ejs", {
        title: "Page Not Found"
    });
});

app.listen(port, () => {
    console.log(`🚀 Fitness Tracker running on http://localhost:${port}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

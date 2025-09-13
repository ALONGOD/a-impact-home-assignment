# A-Impact: Israeli Business Licensing Requirements System

## Overview

A comprehensive system to help Israeli business owners understand their regulatory licensing requirements. The system uses AI to generate personalized reports based on business characteristics, with a focus on restaurant licensing requirements.

## 🚀 Quick Start

### Option 1: Use the Live Application
**The application is already deployed and ready to use:**
👉 **[https://a-impact-frontend.vercel.app/](https://a-impact-frontend.vercel.app/)**

### Option 2: Run Locally

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

#### Installation & Setup

The frontend is already connected to a live backend API. Simply run:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

**Note:** The frontend automatically connects to the live backend API at `https://a-impact-backend.vercel.app` - no additional setup required!

## 📋 Features

- **Interactive Questionnaire**: Collects business size, seating capacity, and special characteristics
- **Hebrew Language Support**: Full RTL (Right-to-Left) layout with Hebrew typography
- **Real-time Validation**: Form validation with user-friendly error messages
- **AI-Powered Reports**: Dynamic report generation with markdown formatting
- **Responsive Design**: Works on desktop and mobile devices
- **Live Backend Integration**: Connected to production API at `https://a-impact-backend.vercel.app`

## 🛠️ Development

### Frontend Development
```bash
cd a-impact-frontend
npm install
npm run dev
```

### Building for Production
```bash
cd a-impact-frontend
npm run build
```

## 📊 Data Structure

The system processes licensing requirements data stored in `a-impact-backend/src/data/requirements.json`:

```json
{
  "categories": [
    {
      "id": "size_based",
      "name": "Size-Based Requirements",
      "requirements": [...]
    }
  ],
  "mapping": {
    "business_size_ranges": [...],
    "seating_capacity_ranges": [...],
    "special_characteristics": [...]
  }
}
```

## 🤖 AI Integration

### Model Used
- **Primary Model**: OpenAI GPT-4
- **Language**: Hebrew with English fallback
- **Purpose**: Report generation and requirement analysis

### AI Development Tools Used
- **Cursor AI**: Primary development environment
- **OpenAI API**: Report generation and text processing

### Prompts Used
The system uses structured prompts to generate reports:
1. **Context Setting**: Business type and regulatory framework
2. **Data Processing**: Analysis of business characteristics
3. **Report Generation**: Creation of personalized recommendations
4. **Formatting**: Hebrew text with proper structure and priorities

## 🌐 Environment Variables

No environment variables needed! The frontend automatically connects to the live backend API.

## 📁 Project Structure

```
a-impact-home-assignment/
├── a-impact-backend/           # Backend API
│   ├── src/
│   │   ├── data/              # Licensing requirements data
│   │   ├── routes/            # API route handlers
│   │   └── index.js           # Main server file
│   ├── package.json
│   └── README.md
├── a-impact-frontend/          # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   └── vite.config.js        # Vite configuration
└── README.md                  # This file
```

## 🧪 Testing the System

1. **Start both services** (backend and frontend)
2. **Open the application** in your browser
3. **Fill out the questionnaire** with sample data:
   - Business size: 50 sqm
   - Seating capacity: 20 people
   - Special characteristics: Gas usage, Meat serving
4. **Generate a report** and verify AI-generated content
5. **Test different combinations** to see how the system adapts

## 🚀 Deployment

### Backend Deployment
The backend is deployed on Vercel and available at: `https://a-impact-backend.vercel.app`

### Frontend Deployment
The frontend is deployed on Vercel and available at: **[https://a-impact-frontend.vercel.app/](https://a-impact-frontend.vercel.app/)**

Both services are live and fully functional with automatic deployments from the main branch.

## 🔮 Future Improvements

- **Additional Business Types**: Expand beyond restaurants to other business categories
- **Multi-language Support**: Add English and Arabic language options
- **Document Upload**: Allow users to upload existing documents for analysis
- **Progress Tracking**: Track application progress and deadlines
- **Integration**: Connect with official government APIs
- **Mobile App**: Native mobile application development

## 📝 Development Journal

### Challenges Encountered & Solutions

1. **OpenAI API Quota Issues**
   - **Challenge**: Initially encountered 429 quota errors despite creating a fresh API key for this project
   - **Solution**: Used AI-assisted debugging with Cursor AI prompt "what problems are most likely to happen with this api" to identify card verification as the likely issue, added error logging, and after properly verifying the payment card on OpenAI account, the API immediately started working perfectly

2. **Hebrew Text Processing**
   - **Challenge**: Ensuring proper RTL support and Hebrew text rendering
   - **Solution**: Implemented comprehensive CSS RTL support with right-to-left layout

3. **AI Prompt Engineering**
   - **Challenge**: Creating effective prompts for Hebrew report generation
   - **Solution**: Developed structured, multi-step prompt engineering for better AI responses

4. **Data Structure Design**
   - **Challenge**: Organizing complex regulatory data for efficient querying
   - **Solution**: Created hierarchical JSON data structure with efficient mapping

5. **API Integration**
   - **Challenge**: Seamless communication between frontend and backend
   - **Solution**: Configured Vite proxy for seamless development experience

6. **UI/UX Enhancement**
   - **Challenge**: Creating an intuitive and professional interface
   - **Solution**: Used AI prompts like "you're a senior frontend engineer please enhance the UX/UI of this page" to improve the interface

### Development Timeline
- **Total Development Time**: Approximately 2 hours of focused development
- **Approach**: AI-assisted development using Cursor AI for rapid iteration, combined with systematic debugging, critical thinking, and strategic problem-solving to efficiently navigate technical challenges
- **Key Tools**: Cursor AI, OpenAI API documentation, systematic debugging approach

## 📞 Support

For questions or issues:
- Check the API endpoints documentation above
- Verify environment variables are properly set
- Ensure both backend and frontend services are running
- Check browser console for any JavaScript errors

## 📄 License

This project is developed as part of a technical assignment for A-Impact.

---

**Built with ❤️ using AI-powered development tools and modern web technologies**

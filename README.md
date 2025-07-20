# NBC Library Appointment System

A modern, responsive web application for booking library visits with a slot-based appointment system.

## 🌟 Features

- **Slot-Based Booking**: 20 numbered slots (SLOT 1 to SLOT 20) available per day
- **Smart Scheduling**: Only weekdays available (Friday & Saturday closed)
- **Modern UI**: Built with React.js and Tailwind CSS
- **Smooth Animations**: Framer Motion for beautiful transitions
- **Print Receipts**: Browser-based printing with PDF save option
- **Responsive Design**: Works on all devices
- **First Come, First Serve**: Clear policy for visitors

## 🛠️ Technology Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nbc-library-appointment.git
cd nbc-library-appointment
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📱 How to Use

1. **Select Date**: Choose from available weekdays
2. **Pick Slot**: Select from SLOT 1 to SLOT 20
3. **Enter Details**: Fill in your personal information
4. **Get Receipt**: Print your confirmation receipt

## 🖨️ Receipt System

- Professional HTML-based receipts
- Includes signature fields and serial number space
- Can be printed or saved as PDF through browser
- Contains all booking details and important notices

## 📄 Project Structure

```
src/
├── components/
│   ├── AppointmentBooking.jsx  # Main booking component
│   ├── Hero.jsx               # Landing page hero section
│   ├── Navbar.jsx             # Navigation component
│   └── Footer.jsx             # Footer component
├── App.jsx                    # Main app component
├── main.jsx                   # App entry point
└── index.css                  # Global styles with Tailwind
```

## 🎨 Key Features

### Booking Process

- **Step 1**: Date selection with availability checking
- **Step 2**: Slot selection (1-20)
- **Step 3**: User information and confirmation

### Receipt Generation

- Browser-native printing
- Professional formatting
- First-come-first-serve notice
- Signature and serial number fields

## 🔧 Build and Deploy

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For questions or support, please contact:

- Email: info@nbclibrary.com
- Phone: +1 (555) 123-4567

---

**Built with ❤️ for NBC Library**

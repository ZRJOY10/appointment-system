import { addDays, format, getDay, startOfToday } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Calendar, CheckCircle, Clock, Printer, User } from 'lucide-react';
import React, { useState } from 'react';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: ''
  });
  const [bookedSlots, setBookedSlots] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Generate slots (SLOT 1 to SLOT 20)
  const generateSlots = () => {
    const slots = [];
    for (let i = 1; i <= 20; i++) {
      slots.push({
        id: i,
        name: `Slot ${i}`,
        display: `SLOT ${i}`,
        description: `Visit slot ${i} for the day`
      });
    }
    return slots;
  };

  const availableSlots = generateSlots();

  // Generate available dates (next 30 days, excluding Friday and Saturday)
  const generateAvailableDates = () => {
    const dates = [];
    const today = startOfToday();
    
    for (let i = 0; i < 50; i++) {
      const date = addDays(today, i);
      const dayOfWeek = getDay(date);
      
      // Exclude Friday (5) and Saturday (6)
      if (dayOfWeek !== 5 && dayOfWeek !== 6) {
        dates.push(date);
      }
      
      if (dates.length >= 30) break;
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  const isSlotBooked = (date, slotId) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return bookedSlots[dateKey]?.includes(slotId) || false;
  };

  const getAvailableSlots = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const bookedSlotIds = bookedSlots[dateKey] || [];
    return availableSlots.filter(slot => !bookedSlotIds.includes(slot.id));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setCurrentStep(2);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setCurrentStep(3);
  };

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mark slot as booked
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setBookedSlots(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), selectedSlot.id]
    }));

    setIsSubmitting(false);
    setShowConfirmation(true);
  };

  const printReceipt = () => {
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>NBC Library Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
          .header h2 { margin: 5px 0 0 0; font-size: 18px; }
          .divider { border-top: 2px solid #000; margin: 20px 0; }
          .details { margin: 20px 0; }
          .details h3 { margin-bottom: 15px; font-size: 16px; }
          .detail-row { margin: 8px 0; }
          .detail-row strong { display: inline-block; width: 120px; }
          .notice { margin: 30px 0; border: 2px solid #000; padding: 15px; }
          .notice h3 { margin-top: 0; }
          .notice ul { margin: 10px 0; padding-left: 20px; }
          .signatures { margin: 40px 0; }
          .signature-row { display: flex; justify-content: space-between; margin: 30px 0; }
          .signature-box { width: 200px; }
          .signature-line { border-bottom: 1px solid #000; height: 20px; margin-top: 10px; }
          .serial-section { margin: 30px 0; }
          .serial-line { border-bottom: 2px solid #000; width: 300px; height: 25px; margin-top: 10px; }
          .footer { margin-top: 50px; font-size: 12px; color: #666; }
          @media print {
            body { margin: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>NBC LIBRARY</h1>
          <h2>APPOINTMENT RECEIPT</h2>
        </div>
        
        <div class="divider"></div>
        
        <div class="details">
          <h3>BOOKING DETAILS:</h3>
          <div class="detail-row"><strong>Name:</strong> ${userInfo.name}</div>
          <div class="detail-row"><strong>Email:</strong> ${userInfo.email}</div>
          <div class="detail-row"><strong>Phone:</strong> ${userInfo.phone}</div>
          <div class="detail-row"><strong>Date:</strong> ${format(selectedDate, 'EEEE, MMMM d, yyyy')}</div>
          <div class="detail-row"><strong>Slot:</strong> ${selectedSlot.display}</div>
          <div class="detail-row"><strong>Description:</strong> ${selectedSlot.description}</div>
          ${userInfo.purpose ? `<div class="detail-row"><strong>Purpose:</strong> ${userInfo.purpose}</div>` : ''}
        </div>
        
        <div class="notice">
          <h3>IMPORTANT NOTICE:</h3>
          <ul>
            <li>This is a reservation receipt for your library visit.</li>
            <li><strong>Service will be provided on FIRST COME, FIRST SERVE basis.</strong></li>
            <li>Please arrive 10 minutes before your scheduled time.</li>
            <li>Bring this receipt and a valid ID for verification.</li>
            <li>Library is closed on Fridays and Saturdays.</li>
          </ul>
        </div>
        
        <div class="serial-section">
          <h3>SERIAL NUMBER (To be filled on arrival):</h3>
          <div class="serial-line"></div>
        </div>
        
        <div class="signatures">
          <div class="signature-row">
            <div class="signature-box">
              <strong>VISITOR SIGNATURE:</strong>
              <div class="signature-line"></div>
            </div>
            <div class="signature-box">
              <strong>STAFF SIGNATURE:</strong>
              <div class="signature-line"></div>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Generated on: ${format(new Date(), 'PPP p')}</p>
          <p>NBC Library Contact: +1 (555) 123-4567</p>
          <p>Email: info@nbclibrary.com</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Trigger print dialog
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setCurrentStep(1);
    setUserInfo({ name: '', email: '', phone: '', purpose: '' });
    setShowConfirmation(false);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
            currentStep >= step 
              ? 'bg-primary-600 border-primary-600 text-white' 
              : 'border-gray-300 text-gray-400'
          }`}>
            {step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 mx-2 ${
              currentStep > step ? 'bg-primary-600' : 'bg-gray-300'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  if (showConfirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="card max-w-md w-full p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Appointment Confirmed!
          </h2>
          
          <div className="space-y-3 text-left bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Slot:</span>
              <span>{selectedSlot.display}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Session:</span>
              <span>{selectedSlot.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{userInfo.name}</span>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Important Notice:</p>
                <p>Service will be provided on <strong>FIRST COME, FIRST SERVE</strong> basis on your scheduled day. Please arrive early to secure your spot.</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            We've sent a confirmation email to {userInfo.email}. Print your receipt below and bring it with a valid ID.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> After clicking "Print Receipt", you can choose "Save as PDF" in your browser's print dialog to save a digital copy.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={printReceipt}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Printer className="w-5 h-5" />
              <span>Print Receipt</span>
            </button>
            
            <button
              onClick={resetBooking}
              className="btn-secondary w-full"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Library Visit
          </h1>
          <p className="text-xl text-gray-600">
            Select your preferred date and slot number
          </p>
        </motion.div>

        {renderStepIndicator()}

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card p-8"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-primary-600" />
                Select a Date
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {availableDates.map((date, index) => {
                  const availableSlots = getAvailableSlots(date);
                  const isFullyBooked = availableSlots.length === 0;
                  
                  return (
                    <motion.button
                      key={index}
                      onClick={() => !isFullyBooked && handleDateSelect(date)}
                      disabled={isFullyBooked}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        isFullyBooked
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-gray-200 hover:border-primary-500 hover:bg-primary-50 text-gray-800'
                      }`}
                      whileHover={!isFullyBooked ? { scale: 1.05 } : {}}
                      whileTap={!isFullyBooked ? { scale: 0.95 } : {}}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="text-sm font-medium">
                        {format(date, 'EEE')}
                      </div>
                      <div className="text-2xl font-bold mt-1">
                        {format(date, 'd')}
                      </div>
                      <div className="text-xs mt-1">
                        {format(date, 'MMM')}
                      </div>
                      {isFullyBooked ? (
                        <div className="text-xs text-red-500 mt-2">
                          Fully Booked
                        </div>
                      ) : (
                        <div className="text-xs text-green-600 mt-2">
                          {availableSlots.length} slots
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && selectedDate && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-primary-600" />
                  Select a Slot
                </h2>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Change Date</span>
                </button>
              </div>

              <div className="bg-primary-50 rounded-lg p-4 mb-6">
                <p className="text-primary-800 font-medium">
                  Selected Date: {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {availableSlots.map((slot, index) => {
                  const isBooked = isSlotBooked(selectedDate, slot.id);
                  
                  return (
                    <motion.button
                      key={slot.id}
                      onClick={() => !isBooked && handleSlotSelect(slot)}
                      disabled={isBooked}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        isBooked
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-gray-200 hover:border-primary-500 hover:bg-primary-50 text-gray-800'
                      }`}
                      whileHover={!isBooked ? { scale: 1.05 } : {}}
                      whileTap={!isBooked ? { scale: 0.95 } : {}}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <div className="text-lg font-bold mb-1">{slot.display}</div>
                      <div className="text-xs text-gray-600">{slot.description}</div>
                      {isBooked && (
                        <div className="text-xs text-red-500 mt-2 font-medium">Booked</div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 3 && selectedDate && selectedSlot && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center">
                  <User className="w-6 h-6 mr-3 text-primary-600" />
                  Your Information
                </h2>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Change Slot</span>
                </button>
              </div>

              <div className="bg-primary-50 rounded-lg p-4 mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-primary-600 font-medium">Date</p>
                    <p className="text-primary-800 font-semibold">
                      {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-600 font-medium">Slot</p>
                    <p className="text-primary-800 font-semibold">
                      {selectedSlot.display}
                    </p>
                    <p className="text-xs text-primary-600 mt-1">
                      {selectedSlot.description}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={userInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={userInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={userInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose of Visit
                    </label>
                    <select
                      value={userInfo.purpose}
                      onChange={(e) => handleInputChange('purpose', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select purpose</option>
                      <option value="research">Research</option>
                      <option value="study">Study</option>
                      <option value="borrow-books">Borrow Books</option>
                      <option value="return-books">Return Books</option>
                      <option value="general-visit">General Visit</option>
                    </select>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Important Reminders:</p>
                      <ul className="space-y-1 text-blue-700">
                        <li>• Please arrive 10 minutes before your scheduled time</li>
                        <li>• Bring a valid ID for verification</li>
                        <li>• Library is closed on Fridays and Saturdays</li>
                        <li>• You'll receive a confirmation email after booking</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Confirm Booking</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppointmentBooking;

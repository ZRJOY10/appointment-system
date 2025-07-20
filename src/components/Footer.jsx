import { motion } from 'framer-motion';
import { BookOpen, Clock, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">NBC Library</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your gateway to knowledge and learning. Schedule your visit seamlessly 
              and access our extensive collection of books and resources.
            </p>
            <div className="flex space-x-4">
              <motion.div
                className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-5 h-5" />
              </motion.div>
              <motion.div
                className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone className="w-5 h-5" />
              </motion.div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">NBC Building</p>
                  <p className="text-gray-300">123 Library Street</p>
                  <p className="text-gray-300">City, State 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <p className="text-gray-300">info@nbclibrary.com</p>
              </div>
            </div>
          </div>

          {/* Library Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Library Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary-400" />
                <div>
                  <p className="text-gray-300 font-medium">Monday - Thursday</p>
                  <p className="text-gray-300">9:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-red-400 font-medium">Friday & Saturday</p>
                <p className="text-red-400">Closed</p>
              </div>
              <div className="mt-3">
                <p className="text-gray-300 font-medium">Sunday</p>
                <p className="text-gray-300">12:00 PM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 NBC Library. All rights reserved. | Made with ❤️ for book lovers
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

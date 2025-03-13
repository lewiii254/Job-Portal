import { useState } from 'react';
import { FiSearch, FiBookmark, FiUploadCloud } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { BsSun, BsMoon } from 'react-icons/bs';

const JobLandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [jobs, setJobs] = useState([
    { title: 'Software Engineer', category: 'Software Engineering', company: 'Google' },
    { title: 'Data Scientist', category: 'Data Science', company: 'Facebook' },
    { title: 'UI/UX Designer', category: 'UI/UX Design', company: 'Figma' },
    { title: 'Product Manager', category: 'Product Management', company: 'Amazon' },
    { title: 'Cybersecurity Analyst', category: 'Cybersecurity', company: 'Microsoft' },
    { title: 'Frontend Developer', category: 'Software Engineering', company: 'Spotify' },
    { title: 'Backend Developer', category: 'Software Engineering', company: 'Netflix' },
    { title: 'AI Engineer', category: 'Artificial Intelligence', company: 'OpenAI' },
    { title: 'Cloud Engineer', category: 'Cloud Computing', company: 'IBM' },
    { title: 'DevOps Engineer', category: 'DevOps', company: 'Red Hat' }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleBookmark = (job) => {
    setBookmarkedJobs((prev) =>
      prev.includes(job) ? prev.filter((j) => j !== job) : [...prev, job]
    );
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      console.log("Resume Uploaded:", file.name);
    }
  };

  const filteredJobs = jobs.filter(job => 
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filter === '' || job.category === filter)
  );

  const jobCategories = [...new Set(jobs.map(job => job.category))];

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen font-sans transition-colors duration-500`}>      
      <nav className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 shadow-lg">
        <h1 className="text-2xl font-extrabold text-blue-600 dark:text-white">JobConnect</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <BsSun size={24} /> : <BsMoon size={24} />}
          </button>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Logout</button>
          ) : (
            <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</button>
          )}
        </div>
      </nav>

      <header className="flex flex-col items-center justify-center h-96 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-center px-6">
        <motion.h1 
          className="text-5xl font-extrabold mb-4" 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}>
          Discover Your Next Career Opportunity
        </motion.h1>
        <p className="mb-6 text-lg">Find your dream job from thousands of listings worldwide.</p>
        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-lg p-3 w-3/4 md:w-1/2">
          <FiSearch className="text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Search for jobs..."
            className="flex-grow p-3 outline-none text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Search</button>
        </form>
      </header>

      <section className="py-8 px-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-3 mb-8 rounded-lg outline-none border border-gray-300">
          <option value="">All Categories</option>
          {jobCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </section>

      <section className="py-6 px-6">
        <h2 className="text-2xl font-bold mb-8 text-center">Latest Job Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}>
              <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
              <span className="text-sm text-blue-500">{job.category}</span>
              <button onClick={() => handleBookmark(job)} className="ml-4 text-gray-400 hover:text-yellow-400">
                <FiBookmark size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 JobConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default JobLandingPage;
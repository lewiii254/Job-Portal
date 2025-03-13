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
    { title: 'Frontend Developer', category: 'Web Development', company: 'Netflix' },
    { title: 'Backend Developer', category: 'Software Engineering', company: 'Microsoft' },
    { title: 'Cybersecurity Analyst', category: 'Cybersecurity', company: 'IBM' },
    { title: 'DevOps Engineer', category: 'DevOps', company: 'Spotify' },
    { title: 'Machine Learning Engineer', category: 'AI/ML', company: 'OpenAI' },
    { title: 'Business Analyst', category: 'Business Intelligence', company: 'Salesforce' }
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

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleViewDetails = (job) => {
    alert(`Viewing details for: ${job.title} at ${job.company}`);
  };

  const filteredJobs = jobs.filter(job => 
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filter === '' || job.category === filter)
  );

  const jobCategories = [...new Set(jobs.map(job => job.category))];

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen font-sans transition-colors duration-500`}> 
      <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50">
        <h1 className="text-xl font-bold cursor-pointer" onClick={handleRefresh}>JobConnect</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </button>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Logout</button>
          ) : (
            <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</button>
          )}
        </div>
      </nav>

      <header className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <motion.h1 
          className="text-5xl font-extrabold mb-4" 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}>
          Find Your Dream Job
        </motion.h1>
        <p className="mb-6">Explore thousands of job opportunities worldwide</p>
        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-lg p-2 w-3/4 md:w-1/2">
          <FiSearch className="text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Search for jobs..."
            className="flex-grow p-2 outline-none text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Search</button>
        </form>
      </header>

      <section className="py-6 px-6">
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

      <section className="py-6 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredJobs.map((job, index) => (
          <motion.div 
            key={index} 
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg backdrop-blur-md bg-opacity-60"
            whileHover={{ scale: 1.05 }}>
            <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
            <span className="text-sm text-blue-500">{job.category}</span>
            <button onClick={() => handleBookmark(job)} className="ml-4 text-gray-400 hover:text-yellow-400">
              <FiBookmark size={20} />
            </button>
            <button onClick={() => handleViewDetails(job)} className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">View Details</button>
          </motion.div>
        ))}
      </section>

      <section className="py-6 px-6">
        <h2 className="text-2xl font-bold mb-6">Upload Your Resume</h2>
        <input type="file" onChange={handleResumeUpload} className="mb-4 p-2 border rounded-lg" />
        {resume && <p className="text-green-500">Uploaded: {resume.name}</p>}
      </section>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 JobConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default JobLandingPage;

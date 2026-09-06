// CamCare — Campus Complaint Management System App
const { useState, useEffect, useRef } = React;

// Global SVG Icon Component
const Icon = ({ name, className = "w-5 h-5", size = 20 }) => {
  const iconPaths = {
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    people: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
    checkCircle: <><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></>,
    trendingUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>,
    lightning: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    barChart: <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
    sun: <><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    help: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    warningTriangle: <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3zM12 9v4M12 17h.01" />,
    check: <polyline points="20 6 9 17 4 12" />,
    alertCircle: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>,
    search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
    filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
    chevronRight: <polyline points="9 18 15 12 9 6" />,
    x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    menu: <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>,
    quote: <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-2 7-4 8zm14 0c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-2 7-4 8z" />,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
    doc: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" />,
    building: <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z M6 12H4a2 2 0 0 0-2 2v8h4 M18 12h2a2 2 0 0 1 2 2v8h-4 M10 6h4 M10 10h4 M10 14h4 M10 18h4" />,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ width: size, height: size }}
    >
      {iconPaths[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

// Initial Mock Data
const INITIAL_COMPLAINTS = [
  { id: 'C-0041', title: 'Broken projector in Room 204', category: 'Facilities', urgency: 'High', status: 'In Progress', date: '2026-07-25', assignedTo: 'David Mensah', age: '4d old', description: 'The digital projector in Science Hall Room 204 flickers constantly and shuts down after 5 minutes during lectures.', location: 'Science Block — Room 204', updates: [{ date: '2026-07-25 10:15', text: 'Assigned to David Mensah (Facilities Department)' }, { date: '2026-07-26 14:00', text: 'Technician ordered replacement bulb and power module.' }] },
  { id: 'C-0040', title: 'Insufficient seating in the library', category: 'Library', urgency: 'Medium', status: 'Pending', date: '2026-07-27', assignedTo: 'Unassigned', age: '2d old', description: 'Students are sitting on the floor during peak afternoon hours due to shortage of study chairs on floor 2.', location: 'Main Library Floor 2', updates: [{ date: '2026-07-27 09:30', text: 'Complaint logged in queue.' }] },
  { id: 'C-0039', title: 'Cafeteria food quality complaints', category: 'Catering', urgency: 'Critical', status: 'High Priority', date: '2026-07-22', assignedTo: 'Grace Adjei', age: '7d old', description: 'Multiple cases of spoiled meal servings reported at cafeteria annex B. Immediate hygiene check required.', location: 'Student Cafeteria Annex B', updates: [{ date: '2026-07-22 11:00', text: 'Escalated to High Priority due to health risk.' }] },
  { id: 'C-0038', title: 'Wi-Fi dead zones in Hostel C', category: 'IT', urgency: 'High', status: 'Resolved', date: '2026-07-20', assignedTo: 'Samuel Tetteh', age: '9d old', description: 'No internet access on 3rd floor wing east for over 48 hours.', location: 'Hostel C East Wing', updates: [{ date: '2026-07-20 16:20', text: 'Access point rebooted and antenna realigned. Verified signal full strength.' }] },
  { id: 'C-0037', title: 'Leaking roof in Lecture Hall A', category: 'Facilities', urgency: 'Critical', status: 'High Priority', date: '2026-07-21', assignedTo: 'David Mensah', age: '8d old', description: 'Rain water leaking directly onto electrical wiring and student desks during heavy downpours.', location: 'Lecture Hall A', updates: [{ date: '2026-07-21 08:45', text: 'Temporarily sealed with tarp. Structural repair in progress.' }] },
  { id: 'C-0036', title: 'Sports court lighting failure', category: 'Facilities', urgency: 'Medium', status: 'Pending', date: '2026-07-24', assignedTo: 'Unassigned', age: '5d old', description: '3 out of 4 floodlights at the outdoor basketball court are burnt out.', location: 'Sports Complex Court 1', updates: [{ date: '2026-07-24 19:10', text: 'Logged in facilities queue.' }] },
  { id: 'C-0035', title: 'Harassment by security personnel', category: 'Welfare', urgency: 'Critical', status: 'In Progress', date: '2026-07-23', assignedTo: 'Grace Adjei', age: '5d old', description: 'Unprofessional conduct and aggressive entry checks reported at south entrance gate.', location: 'South Entrance Gate', updates: [{ date: '2026-07-23 15:30', text: 'Under administrative review by Office of Student Affairs.' }] },
  { id: 'C-0034', title: 'Missing equipment from Science lab', category: 'Academic', urgency: 'High', status: 'Resolved', date: '2026-07-19', assignedTo: 'Samuel Tetteh', age: '10d old', description: 'Microscopes inventory discrepancy in Biology Lab 3.', location: 'Biology Lab 3', updates: [{ date: '2026-07-19 12:00', text: 'Item relocated from repair bay back to cabinet A4.' }] },
  { id: 'C-0033', title: 'Blocked drainage causing flooding', category: 'Facilities', urgency: 'High', status: 'Pending', date: '2026-07-26', assignedTo: 'Unassigned', age: '3d old', description: 'Heavy rain water accumulating near Hostel A entrance due to clogged drainage pipe.', location: 'Hostel A Courtyard', updates: [{ date: '2026-07-26 08:00', text: 'Queued for maintenance crew clearing.' }] }
];

const INITIAL_STAFF = [
  { id: '1', initials: 'DM', name: 'David Mensah', department: 'Facilities Department', email: 'd.mensah@camcare.edu', active: 5, resolved: 23, color: 'indigo' },
  { id: '2', initials: 'GA', name: 'Grace Adjei', department: 'Welfare & Catering', email: 'g.adjei@camcare.edu', active: 3, resolved: 18, color: 'blue' },
  { id: '3', initials: 'ST', name: 'Samuel Tetteh', department: 'IT Services', email: 's.tetteh@camcare.edu', active: 2, resolved: 31, color: 'orange' },
  { id: '4', initials: 'AQ', name: 'Abena Quansah', department: 'Library', email: 'a.quansah@camcare.edu', active: 1, resolved: 12, color: 'green' },
  { id: '5', initials: 'KB', name: 'Kofi Boateng', department: 'Academic Affairs', email: 'k.boateng@camcare.edu', active: 0, resolved: 9, color: 'rose' }
];

const INITIAL_ANNOUNCEMENTS = [
  { id: 1, category: 'IT', tagBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30', title: 'Campus Wi-Fi upgrade scheduled for August 5', date: '2026-07-28', body: 'High-speed fiber connectivity upgrade across all residential blocks. Temporary downtime expected between 2:00 AM - 6:00 AM. Thank you for your patience.', image: 'assets/wifi_banner.png' },
  { id: 2, category: 'Policy', tagBg: 'bg-purple-500/15 text-purple-400 border-purple-500/30', title: 'New complaint resolution SLA policy effective August 1', date: '2026-07-26', body: 'All facilities and welfare complaints will now receive an official status investigation update within 24 hours of submission.', image: 'assets/graduation_caps.png' },
  { id: 3, category: 'Facilities', tagBg: 'bg-orange-500/15 text-orange-400 border-orange-500/30', title: 'Maintenance window: Cafeteria North closed Jul 30–31', date: '2026-07-25', body: 'Deep cleaning and plumbing overhaul scheduled. Cafeteria South remains open at full capacity with extra seating.', image: 'assets/library_interior.png' },
  { id: 4, category: 'Welfare', tagBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', title: 'Student welfare survey now open', date: '2026-07-24', body: 'Participate in our annual campus satisfaction survey. Share your direct feedback and enter to win campus book vouchers.', image: 'assets/students_smiling.png' }
];

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'High Priority Alert', text: 'Complaint C-0039 escalated automatically after 3 days without response.', time: '10m ago', unread: true },
  { id: 2, title: 'Status Updated', text: 'Your complaint C-0041 (Broken projector) was updated to In Progress.', time: '2h ago', unread: true },
  { id: 3, title: 'New Announcement', text: 'Campus Wi-Fi upgrade scheduled for August 5.', time: '1d ago', unread: false }
];

// MAIN COMPONENT
function App() {
  // Theme State
  const [theme, setTheme] = useState('dark');
  
  // Auth & Role State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [studentUser] = useState({
    name: 'Amara Osei',
    id: 'CS/2023/0041',
    email: 'amara.osei@student.camcare.edu',
    dept: 'Computer Science',
    level: 'Level 300',
    avatar: 'AO'
  });
  const [adminUser] = useState({
    name: 'Dr. Rita Asante',
    id: 'ADM/2020/0001',
    email: 'r.asante@camcare.edu',
    dept: 'Office of Student Affairs',
    title: 'Administrator',
    avatar: 'DR'
  });

  // Current View Navigation
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'dashboard', 'my_complaints', 'submit_complaint', 'announcements', 'profile', 'admin_dashboard', 'admin_all_complaints', 'admin_staff', 'admin_reports', 'admin_announcements', 'admin_profile'
  
  // Data State
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);

  // Modals & Panels State
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme Toggle Effect
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auth Handlers
  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    if (userRole === 'student') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('admin_dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('landing');
  };

  const handleRoleToggle = (newRole) => {
    setRole(newRole);
    if (isLoggedIn) {
      if (newRole === 'student') {
        setCurrentView('dashboard');
      } else {
        setCurrentView('admin_dashboard');
      }
    }
  };

  // Status Badge Helper
  const renderStatusPill = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="status-pill-pending px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>Pending</span>;
      case 'In Progress':
        return <span className="status-pill-in-progress px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>In Progress</span>;
      case 'Resolved':
        return <span className="status-pill-resolved px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Resolved</span>;
      case 'High Priority':
        return <span className="status-pill-high-priority px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>High Priority</span>;
      default:
        return <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  // Urgency Text Helper
  const renderUrgencyText = (urgency) => {
    switch (urgency) {
      case 'Low':
        return <span className="text-emerald-400 font-semibold text-xs">Low</span>;
      case 'Medium':
        return <span className="text-orange-400 font-semibold text-xs">Medium</span>;
      case 'High':
        return <span className="text-red-400 font-semibold text-xs">High</span>;
      case 'Critical':
        return <span className="text-rose-500 font-bold text-xs uppercase tracking-wider">Critical</span>;
      default:
        return <span className="text-slate-400 font-medium text-xs">{urgency}</span>;
    }
  };

  // STAT CALCULATIONS
  const stats = {
    pending: complaints.filter(c => c.status === 'Pending').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    highPriority: complaints.filter(c => c.status === 'High Priority').length
  };

  // -------------------------------------------------------------
  // LANDING PAGE VIEW
  // -------------------------------------------------------------
  if (!isLoggedIn && currentView === 'landing') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col relative font-sans">
        
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 transition-colors">
          <div className="max-w-[1250px] mx-auto flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Cam</span>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#6C6CE5]">Care</span>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
              <a href="#auth" className="hover:text-white transition-colors">Get Started</a>
            </nav>

            {/* Right Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={toggleTheme} 
                className="w-10 h-10 rounded-lg border border-white/10 bg-[#111117] flex items-center justify-center text-slate-300 hover:text-white hover:border-[#6C6CE5]/50 transition-all"
                title="Toggle Theme"
              >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
              </button>
              <a 
                href="#auth"
                className="bg-[#6C6CE5] text-[#0a0a0f] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#7C7CF0] transition-all duration-200 shadow-lg shadow-[#6C6CE5]/20 text-sm"
              >
                Sign In
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 p-2"
            >
              <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={24} />
            </button>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">How It Works</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">Testimonials</a>
              <a href="#auth" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">Get Started</a>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <button onClick={toggleTheme} className="flex items-center gap-2 text-slate-300 text-sm py-2">
                  <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          )}
        </header>

        {/* SECTION 1 — HERO */}
        <section className="relative min-h-[90vh] flex flex-col justify-between items-center text-center px-6 py-20 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('assets/hero_campus.png')` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/90 via-[#0a0a0f]/85 to-[#0a0a0f]"></div>

          <div className="relative z-10 max-w-[900px] mx-auto flex flex-col items-center pt-8">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#6C6CE5]/10 border border-[#6C6CE5]/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#7C7CF0] uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-[#6C6CE5] animate-pulse"></span>
              CAMPUS COMPLAINT MANAGEMENT
            </div>

            {/* Massive Serif Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="block text-white">Your voice,</span>
              <span className="block text-[#7C7CF0]">heard and resolved.</span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-400 text-lg sm:text-xl max-w-[650px] leading-relaxed mb-10">
              Report campus issues, track resolutions in real time, and hold administration accountable — fairly, fast, and transparently.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <a 
                href="#auth" 
                className="w-full sm:w-auto bg-[#6C6CE5] text-[#0a0a0f] font-semibold px-8 py-3.5 rounded-full hover:bg-[#7C7CF0] transition-all shadow-xl shadow-[#6C6CE5]/25 text-base"
              >
                Get Started Free
              </a>
              <button 
                onClick={() => handleLogin('student')}
                className="w-full sm:w-auto border border-white/20 text-white font-medium px-8 py-3.5 rounded-full hover:bg-white/10 transition-all text-base backdrop-blur-sm"
              >
                Try the Demo
              </button>
            </div>
          </div>

          {/* Floating Toast Cards */}
          <div className="relative z-10 w-full max-w-[1100px] mx-auto flex flex-wrap justify-center md:justify-between items-center gap-4 px-4 mb-8">
            {/* Toast 1 */}
            <div className="glass-card p-4 flex items-center gap-3 animate-float shadow-xl max-w-[280px]">
              <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"></div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Lab AC broken — Hall B</p>
                <p className="text-[11px] text-orange-400 font-medium">In Progress</p>
              </div>
            </div>

            {/* Toast 2 */}
            <div className="glass-card p-4 flex items-center gap-3 animate-float shadow-xl max-w-[280px]" style={{ animationDelay: '1.5s' }}>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Wifi outage — Block C</p>
                <p className="text-[11px] text-emerald-400 font-medium">Resolved</p>
              </div>
            </div>

            {/* Toast 3 (Partially visible on desktop) */}
            <div className="glass-card p-4 flex items-center gap-3 animate-float shadow-xl max-w-[260px] opacity-80" style={{ animationDelay: '2.8s' }}>
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Cafeteria queue issue</p>
                <p className="text-[11px] text-blue-400 font-medium">Pending</p>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="relative z-10 flex flex-col items-center gap-2 text-slate-500 text-xs tracking-widest uppercase">
            <span>SCROLL</span>
            <div className="animate-bounce-slow">
              <Icon name="chevronRight" className="rotate-90 text-[#6C6CE5]" size={16} />
            </div>
          </div>
        </section>

        {/* SECTION 2 — HOW IT WORKS */}
        <section id="how-it-works" className="py-28 px-6 max-w-[1200px] mx-auto w-full">
          <div className="text-center mb-20">
            <span className="text-[#7C7CF0] text-xs font-semibold tracking-widest uppercase mb-3 block">SIMPLE PROCESS</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">How CamCare works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Horizontal Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-[#6C6CE5]/20 via-[#6C6CE5]/60 to-[#6C6CE5]/20 z-0"></div>

            {/* Step 1 */}
            <div className="glass-card p-8 flex flex-col items-center text-center relative z-10">
              <div className="w-20 h-20 rounded-full border-2 border-[#6C6CE5] bg-[#111117] flex items-center justify-center text-[#7C7CF0] mb-6 glow-accent">
                <Icon name="chat" size={32} />
              </div>
              <span className="text-[#7C7CF0] text-xs font-bold tracking-widest mb-2 uppercase">01 — Submit Your Complaint</span>
              <h3 className="font-serif text-xl font-bold text-white mb-3">Submit Your Complaint</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Fill in a simple form — title, category, urgency. Takes under 2 minutes.</p>
            </div>

            {/* Step 2 */}
            <div className="glass-card p-8 flex flex-col items-center text-center relative z-10">
              <div className="w-20 h-20 rounded-full border-2 border-[#6C6CE5] bg-[#111117] flex items-center justify-center text-[#7C7CF0] mb-6 glow-accent">
                <Icon name="people" size={32} />
              </div>
              <span className="text-[#7C7CF0] text-xs font-bold tracking-widest mb-2 uppercase">02 — We Assign & Investigate</span>
              <h3 className="font-serif text-xl font-bold text-white mb-3">We Assign & Investigate</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Routed to the right staff member. You receive a status update within 24 hours.</p>
            </div>

            {/* Step 3 */}
            <div className="glass-card p-8 flex flex-col items-center text-center relative z-10">
              <div className="w-20 h-20 rounded-full border-2 border-[#6C6CE5] bg-[#111117] flex items-center justify-center text-[#7C7CF0] mb-6 glow-accent">
                <Icon name="checkCircle" size={32} />
              </div>
              <span className="text-[#7C7CF0] text-xs font-bold tracking-widest mb-2 uppercase">03 — Issue Resolved</span>
              <h3 className="font-serif text-xl font-bold text-white mb-3">Issue Resolved</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Track every update in real time. Get notified the moment your complaint is resolved.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3 — BUILT FOR THE CAMPUS COMMUNITY */}
        <section className="py-20 px-6 max-w-[1200px] mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">Built for the campus community</h2>
          </div>

          <div className="relative rounded-3xl overflow-hidden min-h-[420px] flex items-end p-8 sm:p-12 shadow-2xl border border-white/10 group">
            <img 
              src="assets/graduation_caps.png" 
              alt="Students throwing graduation caps" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent"></div>

            <div className="relative z-10 max-w-[600px]">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                Trusted by students across campus
              </h3>
              <p className="text-slate-300 text-base font-normal">
                Fast resolutions. Transparent processes. Real accountability.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — EVERYTHING YOU NEED (FEATURE GRID) */}
        <section id="features" className="py-24 px-6 max-w-[1200px] mx-auto w-full">
          <div className="text-center mb-20">
            <span className="text-[#7C7CF0] text-xs font-semibold tracking-widest uppercase mb-3 block">EVERYTHING YOU NEED</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">Complete complaint workflow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30 flex items-center justify-center mb-6">
                <Icon name="chat" size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Easy Submission</h3>
              <p className="text-slate-400 text-sm leading-relaxed">File a complaint in under 2 minutes with our guided 3-step form.</p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-teal-500/15 text-teal-400 border border-teal-500/30 flex items-center justify-center mb-6">
                <Icon name="trendingUp" size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Real-Time Tracking</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Live status updates from Pending to Resolved. Always know where things stand.</p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center justify-center mb-6">
                <Icon name="lightning" size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Auto-Escalation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Unresolved for 3 days? Your complaint automatically escalates to High Priority.</p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-8 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-6">
                <Icon name="barChart" size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Analytics</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Admin-level charts, resolution rates, and staff performance at a glance.</p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card p-8 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center mb-6">
                <Icon name="shield" size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Confidential</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Your identity is protected. Submit with confidence and full transparency.</p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card p-8 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-6">
                <Icon name="bell" size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Announcements</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Stay up to date with official updates and notices from the administration.</p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — TESTIMONIALS */}
        <section id="testimonials" className="py-24 px-6 max-w-[1200px] mx-auto w-full">
          <div className="text-center mb-20">
            <span className="text-[#7C7CF0] text-xs font-semibold tracking-widest uppercase mb-3 block">COMMUNITY VOICES</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">What people are saying</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="glass-card p-8 flex flex-col justify-between">
              <div>
                <div className="text-[#7C7CF0] mb-6">
                  <Icon name="quote" size={36} />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-8">
                  "I submitted a complaint about broken lab equipment and it was fixed within 48 hours. CamCare actually works."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#6C6CE5] text-[#0a0a0f] font-bold flex items-center justify-center text-sm">
                  AO
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Amara Osei</h4>
                  <p className="text-slate-400 text-xs">Computer Science, Level 300</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="glass-card p-8 flex flex-col justify-between">
              <div>
                <div className="text-blue-400 mb-6">
                  <Icon name="quote" size={36} />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-8">
                  "The tracking is great. I always know what's happening with my complaint without having to chase anyone."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-sm">
                  KA
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Kweku Asante</h4>
                  <p className="text-slate-400 text-xs">Engineering, Level 200</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="glass-card p-8 flex flex-col justify-between">
              <div>
                <div className="text-emerald-400 mb-6">
                  <Icon name="quote" size={36} />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-8">
                  "Managing campus complaints used to be chaos. CamCare brings everything into one place — the analytics are invaluable."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-sm">
                  DR
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Dr. Rita Asante</h4>
                  <p className="text-slate-400 text-xs">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — GET STARTED / AUTH CARD */}
        <section id="auth" className="py-24 px-6 max-w-[1200px] mx-auto w-full flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">Get started today</h2>
            <p className="text-slate-400 text-base">Your campus complaints, managed properly.</p>
          </div>

          <div className="w-full max-w-[550px] glass-card p-8 sm:p-10 shadow-2xl border border-white/10 relative">
            {/* Top Tabs */}
            <div className="flex border-b border-white/10 mb-8">
              <button className="pb-3 px-6 text-sm font-semibold text-white border-b-2 border-[#6C6CE5]">Sign In</button>
              <button className="pb-3 px-6 text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors">Register</button>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-6">Welcome back</h3>

            {/* Role Toggle Switch */}
            <div className="bg-[#0d0d13] p-1 rounded-xl flex mb-8 border border-white/10">
              <button 
                onClick={() => handleRoleToggle('student')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${role === 'student' ? 'bg-[#6C6CE5] text-[#0a0a0f] shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Student
              </button>
              <button 
                onClick={() => handleRoleToggle('admin')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${role === 'admin' ? 'bg-[#6C6CE5] text-[#0a0a0f] shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Admin
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(role); }} className="space-y-6">
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                  {role === 'student' ? 'STUDENT ID' : 'STAFF / ADMIN ID'}
                </label>
                <input 
                  type="text" 
                  defaultValue={role === 'student' ? 'CS/2023/0041' : 'ADM/2020/0001'}
                  placeholder={role === 'student' ? 'CS/2023/0041' : 'ADM/2020/0001'}
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#6C6CE5] transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">PASSWORD</label>
                  <a href="#auth" className="text-xs text-[#7C7CF0] hover:underline">Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  defaultValue="••••••••••••"
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#6C6CE5] transition-colors"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#6C6CE5] text-[#0a0a0f] font-bold py-3.5 rounded-xl hover:bg-[#7C7CF0] transition-all shadow-lg shadow-[#6C6CE5]/20 text-sm"
              >
                Sign In to CamCare
              </button>
            </form>

            {/* Demo Quick Login Buttons */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <button 
                onClick={() => handleLogin('student')}
                className="flex-1 bg-[#6C6CE5]/10 border border-[#6C6CE5]/40 text-[#7C7CF0] hover:bg-[#6C6CE5]/20 font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="user" size={14} />
                Demo: Student
              </button>
              <button 
                onClick={() => handleLogin('admin')}
                className="flex-1 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/20 font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="shield" size={14} />
                Demo: Admin
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 7 — FOOTER */}
        <footer className="bg-[#0b0b12] border-t border-white/10 pt-16 pb-12 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            
            {/* Left Col */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold text-white">Cam</span>
                <span className="font-serif text-2xl font-bold text-[#6C6CE5]">Care</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[360px]">
                A transparent, fair, and fast campus complaint management system built for students and administrators alike.
              </p>
              <div className="w-32 h-20 rounded-xl overflow-hidden border border-white/10 pt-1">
                <img src="assets/library_interior.png" alt="Library interior" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Link Col 1 */}
            <div>
              <h4 className="text-xs font-bold tracking-wider text-slate-300 uppercase mb-4">PRODUCT</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>

            {/* Link Col 2 */}
            <div>
              <h4 className="text-xs font-bold tracking-wider text-slate-300 uppercase mb-4">SUPPORT</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><button onClick={() => setShowHelpModal(true)} className="hover:text-white transition-colors text-left">Help Center</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              </ul>
            </div>

            {/* Link Col 3 */}
            <div>
              <h4 className="text-xs font-bold tracking-wider text-slate-300 uppercase mb-4">CAMPUS</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><button onClick={() => handleLogin('student')} className="hover:text-white transition-colors">Student Portal</button></li>
                <li><button onClick={() => handleLogin('admin')} className="hover:text-white transition-colors">Admin Login</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Staff Directory</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Announcements</a></li>
              </ul>
            </div>
          </div>

          <div className="max-w-[1200px] mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 CamCare. All rights reserved.</p>
            <p>Campus Complaint Management System</p>
          </div>
        </footer>

        {/* Floating Help Button */}
        <button 
          onClick={() => setShowHelpModal(true)}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#6C6CE5] text-[#0a0a0f] shadow-2xl flex items-center justify-center font-bold hover:scale-110 hover:bg-[#7C7CF0] transition-all glow-accent"
          title="Need Help?"
        >
          <Icon name="help" size={24} />
        </button>

        {/* Help Modal */}
        {showHelpModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card max-w-[500px] w-full p-6 relative animate-pulse-glow">
              <button onClick={() => setShowHelpModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                <Icon name="x" size={20} />
              </button>
              <div className="flex items-center gap-3 mb-4 text-[#7C7CF0]">
                <Icon name="help" size={28} />
                <h3 className="font-serif text-2xl font-bold text-white">CamCare Support</h3>
              </div>
              <p className="text-slate-300 text-sm mb-6">Need assistance logging an issue or tracking status?</p>
              
              <div className="space-y-3 mb-6">
                <div className="p-3 bg-[#0a0a0f] rounded-xl border border-white/10 text-xs">
                  <span className="font-bold text-white block mb-1">How fast are complaints resolved?</span>
                  <span className="text-slate-400">Standard issues are acknowledged within 24h. High priority complaints are escalated immediately.</span>
                </div>
                <div className="p-3 bg-[#0a0a0f] rounded-xl border border-white/10 text-xs">
                  <span className="font-bold text-white block mb-1">Is my submission confidential?</span>
                  <span className="text-slate-400">Yes! Student identity details are kept strict confidential between student and assigned officer.</span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => setShowHelpModal(false)} className="px-5 py-2 bg-[#6C6CE5] text-[#0a0a0f] font-bold rounded-lg text-xs">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // -------------------------------------------------------------
  // DASHBOARD SHELL LAYOUT (STUDENT & ADMIN)
  // -------------------------------------------------------------
  const currentUser = role === 'student' ? studentUser : adminUser;

  // Handler for submit complaint wizard completion
  const handleAddComplaint = (newComp) => {
    const created = {
      id: `C-00${complaints.length + 33}`,
      title: newComp.title,
      category: newComp.category,
      urgency: newComp.urgency,
      status: 'Pending',
      date: '2026-07-29',
      assignedTo: 'Unassigned',
      age: 'Just now',
      description: newComp.description,
      location: newComp.location,
      updates: [{ date: '2026-07-29 15:00', text: 'Complaint registered by student.' }]
    };
    setComplaints([created, ...complaints]);
    if (role === 'student') {
      setCurrentView('my_complaints');
    } else {
      setCurrentView('admin_all_complaints');
    }
  };

  // Handler for Admin updating complaint status
  const handleUpdateStatus = (id, newStatus, assignedStaff) => {
    setComplaints(complaints.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: newStatus,
          assignedTo: assignedStaff || c.assignedTo,
          updates: [...(c.updates || []), { date: new Date().toISOString().slice(0,16).replace('T',' '), text: `Status changed to ${newStatus}. Assigned: ${assignedStaff || c.assignedTo}` }]
        };
      }
      return c;
    }));
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint(prev => ({
        ...prev,
        status: newStatus,
        assignedTo: assignedStaff || prev.assignedTo
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex font-sans">
      
      {/* LEFT SIDEBAR (Fixed, 250px) */}
      <aside className="w-[250px] bg-[#0d0d13] border-r border-white/10 flex flex-col justify-between fixed top-0 bottom-0 left-0 z-30">
        <div>
          {/* Top Logo */}
          <div className="p-6 border-b border-white/10 cursor-pointer" onClick={() => setCurrentView(role === 'student' ? 'dashboard' : 'admin_dashboard')}>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-white">Cam</span>
              <span className="font-serif text-2xl font-bold text-[#6C6CE5]">Care</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Campus Complaint System</p>
          </div>

          {/* Student / Admin Role Switch Toggle */}
          <div className="p-4">
            <div className="bg-[#111117] p-1 rounded-xl flex border border-white/10">
              <button 
                onClick={() => handleRoleToggle('student')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${role === 'student' ? 'bg-[#6C6CE5] text-[#0a0a0f]' : 'text-slate-400 hover:text-white'}`}
              >
                Student
              </button>
              <button 
                onClick={() => handleRoleToggle('admin')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${role === 'admin' ? 'bg-[#6C6CE5] text-[#0a0a0f]' : 'text-slate-400 hover:text-white'}`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 mt-2">
            {role === 'student' ? (
              <>
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${currentView === 'dashboard' ? 'bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon name="grid" size={18} />
                  Dashboard
                </button>
                <button 
                  onClick={() => setCurrentView('my_complaints')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${currentView === 'my_complaints' ? 'bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon name="chat" size={18} />
                  My Complaints
                </button>
                <button 
                  onClick={() => setCurrentView('submit_complaint')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${currentView === 'submit_complaint' ? 'bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon name="plus" size={18} />
                  Submit Complaint
                </button>
                <button 
                  onClick={() => setCurrentView('announcements')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${currentView === 'announcements' ? 'bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon name="bell" size={18} />
                  Announcements
                </button>
                <button 
                  onClick={() => setCurrentView('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${currentView === 'profile' ? 'bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon name="user" size={18} />
                  Profile
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setCurrentView('admin_dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${currentView === 'admin_dashboard' ? 'bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon name="grid" size={18} />
                  Dashboard
                </button>
                <button 
                  onClick={() => setCurrentView('admin_all_complaints')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${currentView === 'admin_all_complaints' ? 'bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon name="doc" size={18} />
                  All Complaints
                </button>
                <button 
                  onClick={() => setCurrentView('admin_staff')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${currentView === 'admin_staff' ? 'bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon name="people" size={18} />
                  Staff
                </button>
                <button 
                  onClick={() => setCurrentView('admin_reports')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${currentView === 'admin_reports' ? 'bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon name="barChart" size={18} />
                  Reports
                </button>
                <button 
                  onClick={() => setCurrentView('admin_announcements')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${currentView === 'admin_announcements' ? 'bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon name="bell" size={18} />
                  Announcements
                </button>
                <button 
                  onClick={() => setCurrentView('admin_profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${currentView === 'admin_profile' ? 'bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon name="user" size={18} />
                  Profile
                </button>
              </>
            )}
          </nav>
        </div>

        {/* User Card Sticky Bottom */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${role === 'student' ? 'bg-blue-600' : 'bg-indigo-600'} text-white font-bold text-xs flex items-center justify-center`}>
                {currentUser.avatar}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-white truncate">{currentUser.name}</h4>
                <p className="text-[11px] text-slate-400 truncate">{role === 'student' ? currentUser.id : currentUser.title}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-rose-400 transition-colors p-1" title="Log Out">
              <Icon name="logout" size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT CONTAINER */}
      <div className="flex-1 ml-[250px] min-h-screen flex flex-col">
        
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {role === 'student' ? 'STUDENT PORTAL' : 'ADMINISTRATOR DASHBOARD'}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg border border-white/10 bg-[#111117] flex items-center justify-center text-slate-300 hover:text-white transition-all"
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-lg border border-white/10 bg-[#111117] flex items-center justify-center text-slate-300 hover:text-white transition-all relative"
              >
                <Icon name="bell" size={18} />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                )}
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
                )}
              </button>

              {/* Notification Drawer Popup */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 glass-card p-4 shadow-2xl border border-white/10 z-40">
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h4>
                    <button 
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                      className="text-[11px] text-[#7C7CF0] hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="space-y-2">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2.5 rounded-xl border text-xs ${n.unread ? 'bg-[#6C6CE5]/10 border-[#6C6CE5]/30' : 'bg-[#0a0a0f] border-white/5'}`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-white">{n.title}</span>
                          <span className="text-[10px] text-slate-500">{n.time}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Date */}
            <div className="text-xs font-medium text-slate-400 border-l border-white/10 pl-6">
              Tue, Jul 29 · 2026
            </div>
          </div>
        </header>

        {/* MAIN BODY AREA */}
        <main className="p-8 flex-1 max-w-[1300px] w-full mx-auto">
          
          {/* =---------------------------------------------------------- */}
          {/* VIEW: STUDENT DASHBOARD */}
          {/* =---------------------------------------------------------- */}
          {currentView === 'dashboard' && role === 'student' && (
            <div className="space-y-8">
              {/* Serif Greeting */}
              <div>
                <h1 className="font-serif text-4xl font-bold text-white mb-2">Good morning, Amara</h1>
                <p className="text-slate-400 text-sm">Here's your complaint activity at a glance.</p>
              </div>

              {/* Alert Banner */}
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-center gap-3 text-rose-300 text-xs font-medium">
                <Icon name="warningTriangle" className="text-rose-400 shrink-0" size={20} />
                <span><strong>Escalation Notice:</strong> 2 complaints escalated to High Priority — unanswered for more than 3 days.</span>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Pending */}
                <div className="glass-card p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">PENDING</span>
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                      <Icon name="clock" size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-1">{stats.pending}</h3>
                    <p className="text-slate-400 text-xs">Awaiting assignment</p>
                  </div>
                </div>

                {/* In Progress */}
                <div className="glass-card p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">IN PROGRESS</span>
                    <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center">
                      <Icon name="warningTriangle" size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-1">{stats.inProgress}</h3>
                    <p className="text-slate-400 text-xs">Being handled</p>
                  </div>
                </div>

                {/* Resolved */}
                <div className="glass-card p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">RESOLVED</span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                      <Icon name="check" size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-1">{stats.resolved}</h3>
                    <p className="text-slate-400 text-xs">This month</p>
                  </div>
                </div>

                {/* High Priority */}
                <div className="glass-card p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">HIGH PRIORITY</span>
                    <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
                      <Icon name="alertCircle" size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-1">{stats.highPriority}</h3>
                    <p className="text-slate-400 text-xs">Needs immediate action</p>
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left (Wide): My Recent Complaints */}
                <div className="lg:col-span-2 glass-card p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <h3 className="font-serif text-xl font-bold text-white">My Recent Complaints</h3>
                    <button onClick={() => setCurrentView('my_complaints')} className="text-xs text-[#7C7CF0] hover:underline font-semibold flex items-center gap-1">
                      View all →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-500 border-b border-white/10">
                          <th className="pb-3 font-semibold">ID</th>
                          <th className="pb-3 font-semibold">TITLE</th>
                          <th className="pb-3 font-semibold">CATEGORY</th>
                          <th className="pb-3 font-semibold">STATUS</th>
                          <th className="pb-3 font-semibold">DATE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {complaints.slice(0, 4).map(c => (
                          <tr key={c.id} onClick={() => setSelectedComplaint(c)} className="hover:bg-white/5 cursor-pointer transition-colors">
                            <td className="py-3 font-semibold text-slate-300">{c.id}</td>
                            <td className="py-3 font-medium text-white max-w-[200px] truncate">{c.title}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded border border-white/10 text-slate-400 text-[11px]">{c.category}</span>
                            </td>
                            <td className="py-3">{renderStatusPill(c.status)}</td>
                            <td className="py-3 text-slate-400">{c.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right (Narrow): Latest Announcement */}
                <div className="glass-card p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-4">LATEST ANNOUNCEMENT</span>
                    
                    <div className="rounded-xl overflow-hidden h-36 mb-4 relative border border-white/10">
                      <img src="assets/wifi_banner.png" alt="Wifi announcement" className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px] border border-cyan-500/30">
                        IT
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white mb-2">Campus Wi-Fi upgrade scheduled for August 5</h4>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-6">
                      High-speed fiber connectivity upgrade across all residential blocks. Temporary downtime expected 2:00 AM - 6:00 AM.
                    </p>
                  </div>

                  <button 
                    onClick={() => { setSelectedAnnouncement(announcements[0]); }}
                    className="text-xs text-[#7C7CF0] hover:underline font-semibold flex items-center gap-1"
                  >
                    Read more →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =---------------------------------------------------------- */}
          {/* VIEW: MY COMPLAINTS (STUDENT) */}
          {/* =---------------------------------------------------------- */}
          {currentView === 'my_complaints' && role === 'student' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-4xl font-bold text-white mb-2">My Complaints</h1>
                <p className="text-slate-400 text-sm">{complaints.length} complaints found</p>
              </div>

              {/* Filters & Search Bar */}
              <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 w-full">
                  <Icon name="search" className="absolute left-3.5 top-3 text-slate-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by title or ID..."
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#6C6CE5]"
                  />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <select className="bg-[#0a0a0f] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none">
                    <option value="">All Categories</option>
                    <option value="Facilities">Facilities</option>
                    <option value="Library">Library</option>
                    <option value="IT">IT/WiFi</option>
                    <option value="Catering">Catering</option>
                  </select>
                  <select className="bg-[#0a0a0f] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none">
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="High Priority">High Priority</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="glass-card overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 bg-white/5 border-b border-white/10">
                      <th className="p-4 font-semibold">ID</th>
                      <th className="p-4 font-semibold">TITLE</th>
                      <th className="p-4 font-semibold">CATEGORY</th>
                      <th className="p-4 font-semibold">URGENCY</th>
                      <th className="p-4 font-semibold">STATUS</th>
                      <th className="p-4 font-semibold">DATE</th>
                      <th className="p-4 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {complaints.map(c => (
                      <tr key={c.id} onClick={() => setSelectedComplaint(c)} className="hover:bg-white/5 cursor-pointer transition-colors">
                        <td className="p-4 font-semibold text-slate-300">{c.id}</td>
                        <td className="p-4 font-medium text-white">
                          {c.title}
                          {c.age && <span className="text-[10px] text-rose-400 font-medium ml-2">({c.age})</span>}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded border border-white/10 text-slate-400 text-[11px]">{c.category}</span>
                        </td>
                        <td className="p-4">{renderUrgencyText(c.urgency)}</td>
                        <td className="p-4">{renderStatusPill(c.status)}</td>
                        <td className="p-4 text-slate-400">{c.date}</td>
                        <td className="p-4 text-slate-500">
                          <Icon name="chevronRight" size={16} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =---------------------------------------------------------- */}
          {/* VIEW: SUBMIT COMPLAINT (3-STEP WIZARD) */}
          {/* =---------------------------------------------------------- */}
          {currentView === 'submit_complaint' && role === 'student' && (
            <SubmitWizard onComplete={handleAddComplaint} />
          )}

          {/* =---------------------------------------------------------- */}
          {/* VIEW: ANNOUNCEMENTS (STUDENT) */}
          {/* =---------------------------------------------------------- */}
          {currentView === 'announcements' && role === 'student' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-4xl font-bold text-white mb-2">Announcements</h1>
                <p className="text-slate-400 text-sm">Campus updates from the administration office.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {announcements.map(item => (
                  <div key={item.id} className="glass-card overflow-hidden flex flex-col justify-between group">
                    <div>
                      <div className="h-44 relative overflow-hidden border-b border-white/10">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className={`absolute top-3 left-3 px-3 py-1 rounded-md font-bold text-xs border ${item.tagBg}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-xl font-bold text-white mb-2 leading-snug">{item.title}</h3>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">{item.body}</p>
                      </div>
                    </div>

                    <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">{item.date}</span>
                      <button onClick={() => setSelectedAnnouncement(item)} className="text-[#7C7CF0] font-semibold hover:underline flex items-center gap-1">
                        Read more →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =---------------------------------------------------------- */}
          {/* VIEW: PROFILE (STUDENT) */}
          {/* =---------------------------------------------------------- */}
          {currentView === 'profile' && role === 'student' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-serif text-4xl font-bold text-white mb-2">Profile</h1>
                <p className="text-slate-400 text-sm">Manage your account information and view activity.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* User Avatar Card */}
                  <div className="glass-card p-6 text-center flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-blue-600 text-white font-bold text-2xl flex items-center justify-center mb-4 glow-accent">
                      AO
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-1">Amara Osei</h3>
                    <p className="text-slate-400 text-xs mb-4">CS/2023/0041</p>
                    <span className="px-3 py-1 rounded-full bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30 text-xs font-semibold">
                      Student
                    </span>
                  </div>

                  {/* MY ACTIVITY Card */}
                  <div className="glass-card p-6">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-4">MY ACTIVITY</span>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-[#0a0a0f] p-4 rounded-xl border border-white/10">
                        <span className="text-2xl font-bold text-white block">{complaints.length}</span>
                        <span className="text-[11px] text-slate-400">Total Submitted</span>
                      </div>
                      <div className="bg-[#0a0a0f] p-4 rounded-xl border border-white/10">
                        <span className="text-2xl font-bold text-emerald-400 block">{stats.resolved}</span>
                        <span className="text-[11px] text-slate-400">Resolved</span>
                      </div>
                      <div className="bg-[#0a0a0f] p-4 rounded-xl border border-white/10">
                        <span className="text-2xl font-bold text-blue-400 block">{stats.pending}</span>
                        <span className="text-[11px] text-slate-400">Pending</span>
                      </div>
                      <div className="bg-[#0a0a0f] p-4 rounded-xl border border-white/10">
                        <span className="text-2xl font-bold text-rose-400 block">{stats.highPriority}</span>
                        <span className="text-[11px] text-slate-400">High Priority</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 glass-card p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="font-serif text-xl font-bold text-white">Account Details</h3>
                    <button onClick={() => setShowEditProfileModal(true)} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors">
                      Edit Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                    <div>
                      <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">FULL NAME</span>
                      <p className="text-white font-medium text-sm">Amara Osei</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">EMAIL ADDRESS</span>
                      <p className="text-white font-medium text-sm">amara.osei@student.camcare.edu</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">PHONE NUMBER</span>
                      <p className="text-white font-medium text-sm">+233 24 456 7890</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">DEPARTMENT / PROGRAMME</span>
                      <p className="text-white font-medium text-sm">Computer Science — Level 300</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =---------------------------------------------------------- */}
          {/* VIEW: ADMIN DASHBOARD */}
          {/* =---------------------------------------------------------- */}
          {currentView === 'admin_dashboard' && role === 'admin' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-serif text-4xl font-bold text-white mb-2">Good morning, Dr. Asante</h1>
                <p className="text-slate-400 text-sm">Campus complaint overview for today.</p>
              </div>

              {/* Alert Banner */}
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-center gap-3 text-rose-300 text-xs font-medium">
                <Icon name="warningTriangle" className="text-rose-400 shrink-0" size={20} />
                <span><strong>Campus Priority Alert:</strong> 2 complaints escalated to High Priority — unanswered for more than 3 days.</span>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">PENDING</span>
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                      <Icon name="clock" size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-1">{stats.pending}</h3>
                    <p className="text-slate-400 text-xs">Awaiting assignment</p>
                  </div>
                </div>

                <div className="glass-card p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">IN PROGRESS</span>
                    <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center">
                      <Icon name="warningTriangle" size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-1">{stats.inProgress}</h3>
                    <p className="text-slate-400 text-xs">Being handled</p>
                  </div>
                </div>

                <div className="glass-card p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">RESOLVED</span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                      <Icon name="check" size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-1">{stats.resolved}</h3>
                    <p className="text-slate-400 text-xs">This month</p>
                  </div>
                </div>

                <div className="glass-card p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">HIGH PRIORITY</span>
                    <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
                      <Icon name="alertCircle" size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-1">{stats.highPriority}</h3>
                    <p className="text-slate-400 text-xs">Needs immediate action</p>
                  </div>
                </div>
              </div>

              {/* Two Column Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Recent Complaints */}
                <div className="lg:col-span-2 glass-card p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <h3 className="font-serif text-xl font-bold text-white">Recent Complaints</h3>
                    <button onClick={() => setCurrentView('admin_all_complaints')} className="text-xs text-[#7C7CF0] hover:underline font-semibold">
                      View all →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-500 border-b border-white/10">
                          <th className="pb-3 font-semibold">ID</th>
                          <th className="pb-3 font-semibold">TITLE</th>
                          <th className="pb-3 font-semibold">CATEGORY</th>
                          <th className="pb-3 font-semibold">STATUS</th>
                          <th className="pb-3 font-semibold">DATE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {complaints.slice(0, 5).map(c => (
                          <tr key={c.id} onClick={() => setSelectedComplaint(c)} className="hover:bg-white/5 cursor-pointer transition-colors">
                            <td className="py-3 font-semibold text-slate-300">{c.id}</td>
                            <td className="py-3 font-medium text-white max-w-[200px] truncate">{c.title}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded border border-white/10 text-slate-400 text-[11px]">{c.category}</span>
                            </td>
                            <td className="py-3">{renderStatusPill(c.status)}</td>
                            <td className="py-3 text-slate-400">{c.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right: Latest Announcement */}
                <div className="glass-card p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-4">LATEST ANNOUNCEMENT</span>
                    
                    <div className="rounded-xl overflow-hidden h-36 mb-4 relative border border-white/10">
                      <img src="assets/wifi_banner.png" alt="Wifi announcement" className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px] border border-cyan-500/30">
                        IT
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white mb-2">Campus Wi-Fi upgrade scheduled for August 5</h4>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-6">
                      High-speed fiber connectivity upgrade across all residential blocks. Temporary downtime expected 2:00 AM - 6:00 AM.
                    </p>
                  </div>

                  <button onClick={() => setSelectedAnnouncement(announcements[0])} className="text-xs text-[#7C7CF0] hover:underline font-semibold flex items-center gap-1">
                    Read more →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =---------------------------------------------------------- */}
          {/* VIEW: ADMIN ALL COMPLAINTS */}
          {/* =---------------------------------------------------------- */}
          {currentView === 'admin_all_complaints' && role === 'admin' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-4xl font-bold text-white mb-2">All Complaints</h1>
                <p className="text-slate-400 text-sm">{complaints.length} complaints found</p>
              </div>

              {/* Filters & Search */}
              <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 w-full">
                  <Icon name="search" className="absolute left-3.5 top-3 text-slate-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by title, ID, or officer..."
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#6C6CE5]"
                  />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <select className="bg-[#0a0a0f] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none">
                    <option value="">All Categories</option>
                    <option value="Facilities">Facilities</option>
                    <option value="Library">Library</option>
                    <option value="IT">IT/WiFi</option>
                    <option value="Catering">Catering</option>
                  </select>
                  <select className="bg-[#0a0a0f] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none">
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="High Priority">High Priority</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="glass-card overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 bg-white/5 border-b border-white/10">
                      <th className="p-4 font-semibold">ID</th>
                      <th className="p-4 font-semibold">TITLE</th>
                      <th className="p-4 font-semibold">CATEGORY</th>
                      <th className="p-4 font-semibold">URGENCY</th>
                      <th className="p-4 font-semibold">STATUS</th>
                      <th className="p-4 font-semibold">ASSIGNED TO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {complaints.map(c => (
                      <tr key={c.id} onClick={() => setSelectedComplaint(c)} className="hover:bg-white/5 cursor-pointer transition-colors">
                        <td className="p-4 font-semibold text-slate-300">{c.id}</td>
                        <td className="p-4 font-medium text-white">
                          {c.title}
                          {c.age && <span className="text-[10px] text-rose-400 font-medium ml-2">({c.age})</span>}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded border border-white/10 text-slate-400 text-[11px]">{c.category}</span>
                        </td>
                        <td className="p-4">{renderUrgencyText(c.urgency)}</td>
                        <td className="p-4">{renderStatusPill(c.status)}</td>
                        <td className="p-4">
                          {c.assignedTo === 'Unassigned' ? (
                            <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40 font-bold text-[10px]">
                              Unassigned
                            </span>
                          ) : (
                            <span className="text-slate-300 font-medium">{c.assignedTo}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =---------------------------------------------------------- */}
          {/* VIEW: ADMIN STAFF MANAGEMENT */}
          {/* =---------------------------------------------------------- */}
          {currentView === 'admin_staff' && role === 'admin' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-4xl font-bold text-white mb-2">Staff Management</h1>
                  <p className="text-slate-400 text-sm">{staff.length} staff members across all departments.</p>
                </div>
                <button 
                  onClick={() => setShowAddStaffModal(true)}
                  className="bg-[#6C6CE5] text-[#0a0a0f] font-bold px-5 py-2.5 rounded-xl hover:bg-[#7C7CF0] transition-all text-xs flex items-center gap-2 shadow-lg shadow-[#6C6CE5]/20"
                >
                  <Icon name="plus" size={16} />
                  Add Staff Member
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {staff.map(s => (
                  <div key={s.id} className="glass-card p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-${s.color}-600/20 text-${s.color}-400 border border-${s.color}-500/30 font-bold flex items-center justify-center text-sm`}>
                          {s.initials}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{s.name}</h4>
                          <p className="text-slate-400 text-xs">{s.department}</p>
                        </div>
                      </div>
                      <p className="text-slate-500 text-xs truncate mb-6">{s.email}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-center">
                      <div className="bg-[#0a0a0f] p-2.5 rounded-lg border border-white/5">
                        <span className="text-xs text-slate-400 block">Active</span>
                        <span className="text-base font-bold text-white">{s.active}</span>
                      </div>
                      <div className="bg-[#0a0a0f] p-2.5 rounded-lg border border-white/5">
                        <span className="text-xs text-slate-400 block">Resolved</span>
                        <span className="text-base font-bold text-emerald-400">{s.resolved}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =---------------------------------------------------------- */}
          {/* VIEW: ADMIN REPORTS & ANALYTICS */}
          {/* =---------------------------------------------------------- */}
          {currentView === 'admin_reports' && role === 'admin' && (
            <ReportsView />
          )}

          {/* =---------------------------------------------------------- */}
          {/* VIEW: ADMIN ANNOUNCEMENTS */}
          {/* =---------------------------------------------------------- */}
          {currentView === 'admin_announcements' && role === 'admin' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-4xl font-bold text-white mb-2">Announcements</h1>
                  <p className="text-slate-400 text-sm">Manage campus notices and student updates.</p>
                </div>
                <button 
                  onClick={() => setShowNewAnnouncementModal(true)}
                  className="bg-[#6C6CE5] text-[#0a0a0f] font-bold px-5 py-2.5 rounded-xl hover:bg-[#7C7CF0] transition-all text-xs flex items-center gap-2 shadow-lg shadow-[#6C6CE5]/20"
                >
                  <Icon name="plus" size={16} />
                  + New Announcement
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {announcements.map(item => (
                  <div key={item.id} className="glass-card overflow-hidden flex flex-col justify-between group">
                    <div>
                      <div className="h-44 relative overflow-hidden border-b border-white/10">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className={`absolute top-3 left-3 px-3 py-1 rounded-md font-bold text-xs border ${item.tagBg}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-xl font-bold text-white mb-2 leading-snug">{item.title}</h3>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">{item.body}</p>
                      </div>
                    </div>

                    <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">{item.date}</span>
                      <button onClick={() => setSelectedAnnouncement(item)} className="text-[#7C7CF0] font-semibold hover:underline flex items-center gap-1">
                        Read more →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =---------------------------------------------------------- */}
          {/* VIEW: ADMIN PROFILE */}
          {/* =---------------------------------------------------------- */}
          {currentView === 'admin_profile' && role === 'admin' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-serif text-4xl font-bold text-white mb-2">Profile</h1>
                <p className="text-slate-400 text-sm">Administrator account credentials and settings.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="glass-card p-6 text-center flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-indigo-600 text-white font-bold text-2xl flex items-center justify-center mb-4 glow-accent">
                    DR
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-1">Dr. Rita Asante</h3>
                  <p className="text-slate-400 text-xs mb-4">Administrator</p>
                  <span className="px-3 py-1 rounded-full bg-[#6C6CE5]/15 text-[#7C7CF0] border border-[#6C6CE5]/30 text-xs font-semibold">
                    Admin
                  </span>
                </div>

                <div className="lg:col-span-2 glass-card p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="font-serif text-xl font-bold text-white">Account Details</h3>
                    <button onClick={() => setShowEditProfileModal(true)} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors">
                      Edit Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                    <div>
                      <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">FULL NAME</span>
                      <p className="text-white font-medium text-sm">Dr. Rita Asante</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">EMAIL ADDRESS</span>
                      <p className="text-white font-medium text-sm">r.asante@camcare.edu</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">PHONE NUMBER</span>
                      <p className="text-white font-medium text-sm">+233 20 123 4567</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">DEPARTMENT / OFFICE</span>
                      <p className="text-white font-medium text-sm">Office of Student Affairs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Floating Circular Help Button */}
      <button 
        onClick={() => setShowHelpModal(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#6C6CE5] text-[#0a0a0f] shadow-2xl flex items-center justify-center font-bold hover:scale-110 hover:bg-[#7C7CF0] transition-all glow-accent"
        title="Need Help?"
      >
        <Icon name="help" size={24} />
      </button>

      {/* =---------------------------------------------------------- */}
      {/* MODAL: COMPLAINT DETAIL VIEW */}
      {/* =---------------------------------------------------------- */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-[650px] w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative border border-white/10 shadow-2xl">
            <button onClick={() => setSelectedComplaint(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <Icon name="x" size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-slate-400 font-mono font-bold text-sm">{selectedComplaint.id}</span>
              {renderStatusPill(selectedComplaint.status)}
              <span className="ml-auto">{renderUrgencyText(selectedComplaint.urgency)}</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-2">{selectedComplaint.title}</h3>
            <p className="text-slate-400 text-xs mb-6 flex items-center gap-2">
              <Icon name="building" size={14} />
              {selectedComplaint.location} · Logged on {selectedComplaint.date}
            </p>

            <div className="bg-[#0a0a0f] p-4 rounded-xl border border-white/10 text-xs text-slate-300 leading-relaxed mb-6">
              <span className="font-bold text-white block mb-1">Description:</span>
              {selectedComplaint.description}
            </div>

            {/* Status updates log */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Resolution Activity Log</h4>
              <div className="space-y-3">
                {selectedComplaint.updates?.map((u, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-[#6C6CE5] mt-1.5 shrink-0"></div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">{u.date}</span>
                      <span className="text-slate-300">{u.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Controls */}
            {role === 'admin' && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Admin Resolution Controls</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Update Status</label>
                    <select 
                      value={selectedComplaint.status}
                      onChange={(e) => handleUpdateStatus(selectedComplaint.id, e.target.value, selectedComplaint.assignedTo)}
                      className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="High Priority">High Priority</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Reassign Staff Member</label>
                    <select 
                      value={selectedComplaint.assignedTo}
                      onChange={(e) => handleUpdateStatus(selectedComplaint.id, selectedComplaint.status, e.target.value)}
                      className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      {staff.map(s => (
                        <option key={s.id} value={s.name}>{s.name} ({s.department})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button onClick={() => setSelectedComplaint(null)} className="px-6 py-2.5 bg-[#6C6CE5] text-[#0a0a0f] font-bold rounded-xl text-xs">
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =---------------------------------------------------------- */}
      {/* MODAL: HELP ASSISTANT */}
      {/* =---------------------------------------------------------- */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-[500px] w-full p-6 relative border border-white/10 shadow-2xl">
            <button onClick={() => setShowHelpModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <Icon name="x" size={20} />
            </button>
            <div className="flex items-center gap-3 mb-4 text-[#7C7CF0]">
              <Icon name="help" size={28} />
              <h3 className="font-serif text-2xl font-bold text-white">CamCare Help Center</h3>
            </div>
            <p className="text-slate-300 text-sm mb-6">Need assistance logging an issue or tracking status?</p>

            <div className="space-y-3 mb-6">
              <div className="p-3 bg-[#0a0a0f] rounded-xl border border-white/10 text-xs">
                <span className="font-bold text-white block mb-1">How long does auto-escalation take?</span>
                <span className="text-slate-400">If a complaint remains pending for 3 consecutive days, it automatically escalates to High Priority.</span>
              </div>
              <div className="p-3 bg-[#0a0a0f] rounded-xl border border-white/10 text-xs">
                <span className="font-bold text-white block mb-1">Contact Office of Student Affairs</span>
                <span className="text-slate-400">Email: helpdesk@camcare.edu | Hotline: +233 30 200 1122</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setShowHelpModal(false)} className="px-5 py-2.5 bg-[#6C6CE5] text-[#0a0a0f] font-bold rounded-xl text-xs">
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =---------------------------------------------------------- */}
      {/* MODAL: ANNOUNCEMENT DETAIL */}
      {/* =---------------------------------------------------------- */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-[600px] w-full p-6 relative border border-white/10 shadow-2xl">
            <button onClick={() => setSelectedAnnouncement(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10">
              <Icon name="x" size={20} />
            </button>
            <div className="h-52 rounded-xl overflow-hidden mb-6 relative border border-white/10">
              <img src={selectedAnnouncement.image} alt={selectedAnnouncement.title} className="w-full h-full object-cover" />
            </div>
            <span className={`px-3 py-1 rounded text-xs font-bold border inline-block mb-3 ${selectedAnnouncement.tagBg}`}>
              {selectedAnnouncement.category}
            </span>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">{selectedAnnouncement.title}</h3>
            <p className="text-slate-500 text-xs mb-4">Published on {selectedAnnouncement.date}</p>
            <p className="text-slate-300 text-xs leading-relaxed mb-6">{selectedAnnouncement.body}</p>
            <div className="flex justify-end">
              <button onClick={() => setSelectedAnnouncement(null)} className="px-6 py-2.5 bg-[#6C6CE5] text-[#0a0a0f] font-bold rounded-xl text-xs">
                Close Announcement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =---------------------------------------------------------- */}
      {/* MODAL: NEW ANNOUNCEMENT (ADMIN) */}
      {/* =---------------------------------------------------------- */}
      {showNewAnnouncementModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-[500px] w-full p-6 relative border border-white/10 shadow-2xl">
            <button onClick={() => setShowNewAnnouncementModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <Icon name="x" size={20} />
            </button>
            <h3 className="font-serif text-2xl font-bold text-white mb-6">Create New Announcement</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const newAnn = {
                id: Date.now(),
                category: form.category.value,
                tagBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
                title: form.title.value,
                date: '2026-07-29',
                body: form.body.value,
                image: 'assets/wifi_banner.png'
              };
              setAnnouncements([newAnn, ...announcements]);
              setShowNewAnnouncementModal(false);
            }} className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 uppercase font-bold mb-1">CATEGORY</label>
                <select name="category" className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3 text-xs text-white">
                  <option value="IT">IT & Wi-Fi</option>
                  <option value="Policy">Policy & Governance</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Welfare">Welfare</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 uppercase font-bold mb-1">TITLE</label>
                <input name="title" required placeholder="Announcement title..." className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 uppercase font-bold mb-1">BODY</label>
                <textarea name="body" required rows="4" placeholder="Announcement details..." className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3 text-xs text-white"></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowNewAnnouncementModal(false)} className="px-4 py-2 text-xs text-slate-400">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-[#6C6CE5] text-[#0a0a0f] font-bold rounded-xl text-xs">Publish Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =---------------------------------------------------------- */}
      {/* MODAL: ADD STAFF MEMBER (ADMIN) */}
      {/* =---------------------------------------------------------- */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-[500px] w-full p-6 relative border border-white/10 shadow-2xl">
            <button onClick={() => setShowAddStaffModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <Icon name="x" size={20} />
            </button>
            <h3 className="font-serif text-2xl font-bold text-white mb-6">Add Staff Member</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const newS = {
                id: String(Date.now()),
                initials: form.name.value.split(' ').map(n=>n[0]).join(''),
                name: form.name.value,
                department: form.dept.value,
                email: form.email.value,
                active: 0,
                resolved: 0,
                color: 'indigo'
              };
              setStaff([...staff, newS]);
              setShowAddStaffModal(false);
            }} className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 uppercase font-bold mb-1">FULL NAME</label>
                <input name="name" required placeholder="Staff member name..." className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 uppercase font-bold mb-1">DEPARTMENT</label>
                <input name="dept" required placeholder="Department name..." className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 uppercase font-bold mb-1">EMAIL</label>
                <input name="email" type="email" required placeholder="staff@camcare.edu" className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3 text-xs text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAddStaffModal(false)} className="px-4 py-2 text-xs text-slate-400">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-[#6C6CE5] text-[#0a0a0f] font-bold rounded-xl text-xs">Save Staff Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =---------------------------------------------------------- */}
      {/* MODAL: EDIT PROFILE */}
      {/* =---------------------------------------------------------- */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-[450px] w-full p-6 relative border border-white/10 shadow-2xl">
            <button onClick={() => setShowEditProfileModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <Icon name="x" size={20} />
            </button>
            <h3 className="font-serif text-2xl font-bold text-white mb-6">Edit Profile Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 uppercase font-bold mb-1">FULL NAME</label>
                <input defaultValue={currentUser.name} className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 uppercase font-bold mb-1">EMAIL ADDRESS</label>
                <input defaultValue={currentUser.email} className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3 text-xs text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setShowEditProfileModal(false)} className="px-6 py-2.5 bg-[#6C6CE5] text-[#0a0a0f] font-bold rounded-xl text-xs">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// -------------------------------------------------------------
// SUB-COMPONENT: SUBMIT COMPLAINT (3-STEP WIZARD)
// -------------------------------------------------------------
function SubmitWizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    urgency: '',
    title: '',
    description: '',
    location: ''
  });

  return (
    <div className="space-y-8 max-w-[800px]">
      <div>
        <h1 className="font-serif text-4xl font-bold text-white mb-2">Submit a Complaint</h1>
        <p className="text-slate-400 text-sm">Be specific — detailed reports get resolved faster.</p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="glass-card p-4 flex items-center justify-between text-xs font-semibold">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#7C7CF0]' : 'text-slate-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-[#6C6CE5] text-[#0a0a0f]' : 'bg-slate-800 text-slate-400'}`}>1</span>
          Category & Urgency
        </div>
        <div className="h-[1px] flex-1 mx-4 bg-white/10"></div>
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#7C7CF0]' : 'text-slate-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-[#6C6CE5] text-[#0a0a0f]' : 'bg-slate-800 text-slate-400'}`}>2</span>
          Details
        </div>
        <div className="h-[1px] flex-1 mx-4 bg-white/10"></div>
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#7C7CF0]' : 'text-slate-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-[#6C6CE5] text-[#0a0a0f]' : 'bg-slate-800 text-slate-400'}`}>3</span>
          Review & Submit
        </div>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="glass-card p-8 space-y-8">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">CATEGORY *</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#6C6CE5]"
            >
              <option value="">Select a category</option>
              <option value="Facilities">Facilities & Infrastructure</option>
              <option value="Library">Library Services</option>
              <option value="IT">IT / Wi-Fi Network</option>
              <option value="Cafeteria">Cafeteria & Catering</option>
              <option value="Hostel">Hostel Accommodation</option>
              <option value="Security">Security & Safety</option>
              <option value="Academic">Academic Affairs</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">URGENCY LEVEL *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Low */}
              <div 
                onClick={() => setFormData({ ...formData, urgency: 'Low' })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.urgency === 'Low' ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 bg-[#0a0a0f] hover:border-white/20'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-emerald-400 text-sm">Low</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                </div>
                <p className="text-slate-400 text-xs">Minor inconvenience</p>
              </div>

              {/* Medium */}
              <div 
                onClick={() => setFormData({ ...formData, urgency: 'Medium' })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.urgency === 'Medium' ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-[#0a0a0f] hover:border-white/20'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-orange-400 text-sm">Medium</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                </div>
                <p className="text-slate-400 text-xs">Affects daily activity</p>
              </div>

              {/* High */}
              <div 
                onClick={() => setFormData({ ...formData, urgency: 'High' })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.urgency === 'High' ? 'border-red-500 bg-red-500/10' : 'border-white/10 bg-[#0a0a0f] hover:border-white/20'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-red-400 text-sm">High</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                </div>
                <p className="text-slate-400 text-xs">Disrupts learning/work</p>
              </div>

              {/* Critical */}
              <div 
                onClick={() => setFormData({ ...formData, urgency: 'Critical' })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.urgency === 'Critical' ? 'border-rose-600 bg-rose-600/10' : 'border-white/10 bg-[#0a0a0f] hover:border-white/20'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-rose-500 text-sm">Critical</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                </div>
                <p className="text-slate-400 text-xs">Safety or health risk</p>
              </div>
            </div>
          </div>

          <button 
            disabled={!formData.category || !formData.urgency}
            onClick={() => setStep(2)}
            className="w-full bg-[#6C6CE5] disabled:opacity-50 text-[#0a0a0f] font-bold py-3.5 rounded-xl hover:bg-[#7C7CF0] transition-all shadow-lg shadow-[#6C6CE5]/20 text-sm"
          >
            Continue →
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="glass-card p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">COMPLAINT TITLE *</label>
            <input 
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Broken AC unit in Lecture Hall B..."
              className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#6C6CE5]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">CAMPUS LOCATION *</label>
            <input 
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Science Block, Room 204..."
              className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#6C6CE5]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">DESCRIPTION DETAILS *</label>
            <textarea 
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide exact details so administrators can investigate quickly..."
              className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#6C6CE5]"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ATTACH PHOTO (OPTIONAL)</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center bg-[#0a0a0f] flex flex-col items-center justify-center text-slate-500 hover:border-[#6C6CE5]/40 transition-colors cursor-pointer">
              <Icon name="upload" size={32} className="mb-2 text-[#7C7CF0]" />
              <span className="text-xs font-medium text-slate-300">Click to upload photo evidence</span>
              <span className="text-[10px] text-slate-500 mt-1">PNG, JPG up to 10MB</span>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button onClick={() => setStep(1)} className="px-6 py-3 border border-white/10 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5">
              ← Back
            </button>
            <button 
              disabled={!formData.title || !formData.description || !formData.location}
              onClick={() => setStep(3)}
              className="flex-1 bg-[#6C6CE5] disabled:opacity-50 text-[#0a0a0f] font-bold py-3.5 rounded-xl hover:bg-[#7C7CF0] transition-all text-sm"
            >
              Review Complaint →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="glass-card p-8 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-white mb-4">Review & Submit</h3>

          <div className="bg-[#0a0a0f] p-6 rounded-xl border border-white/10 space-y-4 text-xs">
            <div>
              <span className="text-slate-500 block uppercase font-bold mb-1">CATEGORY & URGENCY</span>
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold">{formData.category}</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 font-bold">{formData.urgency} Urgency</span>
              </div>
            </div>

            <div>
              <span className="text-slate-500 block uppercase font-bold mb-1">TITLE</span>
              <p className="text-white font-bold text-sm">{formData.title}</p>
            </div>

            <div>
              <span className="text-slate-500 block uppercase font-bold mb-1">LOCATION</span>
              <p className="text-slate-300">{formData.location}</p>
            </div>

            <div>
              <span className="text-slate-500 block uppercase font-bold mb-1">DESCRIPTION</span>
              <p className="text-slate-300 leading-relaxed">{formData.description}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setStep(2)} className="px-6 py-3 border border-white/10 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5">
              ← Back to Details
            </button>
            <button 
              onClick={() => onComplete(formData)}
              className="flex-1 bg-[#6C6CE5] text-[#0a0a0f] font-bold py-3.5 rounded-xl hover:bg-[#7C7CF0] transition-all text-sm shadow-xl shadow-[#6C6CE5]/25"
            >
              Submit Complaint Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// SUB-COMPONENT: REPORTS & ANALYTICS (ADMIN)
// -------------------------------------------------------------
function ReportsView() {
  const barCanvasRef = useRef(null);
  const donutCanvasRef = useRef(null);
  const lineCanvasRef = useRef(null);

  useEffect(() => {
    let barChart, donutChart, lineChart;

    if (window.Chart) {
      // 1. Grouped Bar Chart
      if (barCanvasRef.current) {
        barChart = new window.Chart(barCanvasRef.current, {
          type: 'bar',
          data: {
            labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
              { label: 'Submitted', data: [18, 24, 15, 28, 22, 30], backgroundColor: '#6C6CE5' },
              { label: 'Resolved', data: [14, 20, 15, 25, 20, 26], backgroundColor: '#10B981' }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#94a3b8' } } },
            scales: {
              x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
              y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
          }
        });
      }

      // 2. Donut Chart
      if (donutCanvasRef.current) {
        donutChart = new window.Chart(donutCanvasRef.current, {
          type: 'doughnut',
          data: {
            labels: ['Facilities (38)', 'IT (22)', 'Welfare (16)', 'Library (12)', 'Catering (8)', 'Academic (4)'],
            datasets: [{
              data: [38, 22, 16, 12, 8, 4],
              backgroundColor: ['#6C6CE5', '#06B6D4', '#F97316', '#10B981', '#EF4444', '#8B5CF6']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'right', labels: { color: '#94a3b8' } } }
          }
        });
      }

      // 3. Line Chart
      if (lineCanvasRef.current) {
        lineChart = new window.Chart(lineCanvasRef.current, {
          type: 'line',
          data: {
            labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
              label: 'Resolution Rate %',
              data: [77, 83, 100, 89, 90, 87],
              borderColor: '#06B6D4',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              tension: 0.3,
              fill: true,
              pointBackgroundColor: '#06B6D4'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#94a3b8' } } },
            scales: {
              x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
              y: { min: 0, max: 100, ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
          }
        });
      }
    }

    return () => {
      if (barChart) barChart.destroy();
      if (donutChart) donutChart.destroy();
      if (lineChart) lineChart.destroy();
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl font-bold text-white mb-2">Reports & Analytics</h1>
        <p className="text-slate-400 text-sm">Complaint trends and resolution performance for July 2026.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Submissions vs Resolutions */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <h3 className="font-serif text-xl font-bold text-white mb-4">Monthly Submissions vs. Resolutions</h3>
          <div className="h-64 relative">
            <canvas ref={barCanvasRef}></canvas>
          </div>
        </div>

        {/* Complaints by Category */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <h3 className="font-serif text-xl font-bold text-white mb-4">Complaints by Category</h3>
          <div className="h-64 relative">
            <canvas ref={donutCanvasRef}></canvas>
          </div>
        </div>
      </div>

      {/* Resolution Rate Trend Line */}
      <div className="glass-card p-6">
        <h3 className="font-serif text-xl font-bold text-white mb-4">Resolution Rate Trend</h3>
        <div className="h-64 relative">
          <canvas ref={lineCanvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}

// Render React App to DOM
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

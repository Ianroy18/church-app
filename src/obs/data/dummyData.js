import { BIBLE_COURSES } from '../constants/index.js';

const firstNames = [
  'John', 'Mary', 'James', 'Patricia', 'Michael', 'Linda', 'David', 'Barbara',
  'Richard', 'Elizabeth', 'Joseph', 'Susan', 'Thomas', 'Jessica', 'Charles', 'Sarah',
  'Christopher', 'Karen', 'Daniel', 'Nancy', 'Matthew', 'Lisa', 'Anthony', 'Betty',
  'Mark', 'Margaret', 'Donald', 'Sandra', 'Steven', 'Ashley', 'Paul', 'Kimberly',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
];

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateAvatar = (name) => {
  const initial = name.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${name}&background=random&color=fff`;
};

const generateEmail = (firstName, lastName) => {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@agti.com`;
};

export const generateStudents = (count = 100) => {
  const students = [];
  for (let i = 0; i < count; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const name = `${firstName} ${lastName}`;
    
    students.push({
      id: `student-${i + 1}`,
      name,
      email: generateEmail(firstName, lastName),
      avatar: generateAvatar(name),
      enrollmentDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      status: Math.random() > 0.1 ? 'active' : 'inactive',
      completionRate: Math.floor(Math.random() * 100),
      coursesEnrolled: Math.floor(Math.random() * 8) + 1,
      phone: `+63${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    });
  }
  return students;
};

export const generateTeachers = (count = 20) => {
  const teachers = [];
  for (let i = 0; i < count; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const name = `${firstName} ${lastName}`;
    
    teachers.push({
      id: `teacher-${i + 1}`,
      name,
      email: generateEmail(firstName, lastName),
      avatar: generateAvatar(name),
      subject: randomElement(BIBLE_COURSES),
      joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      status: 'active',
      students: Math.floor(Math.random() * 50) + 5,
      courses: Math.floor(Math.random() * 5) + 1,
      qualification: ['Master\'s Degree', 'Bachelor\'s Degree', 'Certification'].at(Math.floor(Math.random() * 3)),
    });
  }
  return teachers;
};

export const generateCourses = (count = 30) => {
  const courses = [];
  const courseNames = BIBLE_COURSES.slice(0, count);
  
  for (let i = 0; i < courseNames.length; i++) {
    const teachers = generateTeachers(1);
    
    courses.push({
      id: `course-${i + 1}`,
      title: courseNames[i],
      description: `Comprehensive study of ${courseNames[i].toLowerCase()}.`,
      teacher: teachers[0],
      image: `https://picsum.photos/400/300?random=${i}`,
      lessons: Math.floor(Math.random() * 20) + 5,
      assignments: Math.floor(Math.random() * 15) + 3,
      quizzes: Math.floor(Math.random() * 10) + 2,
      exams: Math.floor(Math.random() * 4) + 1,
      students: Math.floor(Math.random() * 100) + 10,
      duration: `${Math.floor(Math.random() * 8) + 4} weeks`,
      level: ['Beginner', 'Intermediate', 'Advanced'].at(Math.floor(Math.random() * 3)),
      startDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    });
  }
  return courses;
};

export const generateAssignments = (count = 500) => {
  const assignments = [];
  const courses = generateCourses(30);
  
  for (let i = 0; i < count; i++) {
    const course = randomElement(courses);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30));
    
    assignments.push({
      id: `assignment-${i + 1}`,
      title: `Assignment ${(i % 10) + 1}`,
      courseId: course.id,
      course: course.title,
      description: `Complete the assigned readings and submit your answers.`,
      dueDate,
      totalPoints: 100,
      status: ['pending', 'submitted', 'graded'].at(Math.floor(Math.random() * 3)),
      submittedDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      score: Math.floor(Math.random() * 100),
    });
  }
  return assignments;
};

export const generateQuizzes = (count = 300) => {
  const quizzes = [];
  const courses = generateCourses(30);
  
  for (let i = 0; i < count; i++) {
    const course = randomElement(courses);
    
    quizzes.push({
      id: `quiz-${i + 1}`,
      title: `Quiz ${(i % 8) + 1}`,
      courseId: course.id,
      course: course.title,
      questions: Math.floor(Math.random() * 20) + 5,
      totalPoints: 50,
      timeLimit: Math.floor(Math.random() * 30) + 15,
      attempts: Math.floor(Math.random() * 3) + 1,
      bestScore: Math.floor(Math.random() * 100),
      status: ['pending', 'completed'].at(Math.floor(Math.random() * 2)),
      passingScore: 70,
    });
  }
  return quizzes;
};

export const generateExams = (count = 200) => {
  const exams = [];
  const courses = generateCourses(30);
  
  for (let i = 0; i < count; i++) {
    const course = randomElement(courses);
    const examDate = new Date();
    examDate.setDate(examDate.getDate() + Math.floor(Math.random() * 60));
    
    exams.push({
      id: `exam-${i + 1}`,
      title: `Final Exam - ${course.title}`,
      courseId: course.id,
      course: course.title,
      examDate,
      totalPoints: 100,
      timeLimit: 120,
      questions: 50,
      passingScore: 70,
      status: ['scheduled', 'completed'].at(Math.floor(Math.random() * 2)),
      score: Math.floor(Math.random() * 100),
      instructions: 'Answer all questions. No cheating allowed.',
    });
  }
  return exams;
};

export const generateAttendance = (studentCount = 100) => {
  const attendance = [];
  const months = 12;
  const daysPerMonth = 25;
  
  for (let s = 0; s < studentCount; s++) {
    for (let m = 0; m < months; m++) {
      for (let d = 0; d < daysPerMonth; d++) {
        attendance.push({
          id: `attendance-${s}-${m}-${d}`,
          studentId: `student-${s + 1}`,
          date: new Date(2024, m, d + 1),
          status: ['present', 'absent', 'late', 'excused'].at(Math.floor(Math.random() * 4)),
        });
      }
    }
  }
  return attendance;
};

export const generateAnnouncements = (count = 50) => {
  const announcements = [];
  
  for (let i = 0; i < count; i++) {
    announcements.push({
      id: `announcement-${i + 1}`,
      title: `Announcement ${i + 1}`,
      content: `Important announcement regarding the course schedule and assignments.`,
      author: randomElement(generateTeachers(20)).name,
      createdDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      isPinned: Math.random() > 0.8,
      priority: ['low', 'medium', 'high'].at(Math.floor(Math.random() * 3)),
    });
  }
  return announcements;
};

export const generateNotifications = (count = 100) => {
  const notifications = [];
  const types = ['assignment_due', 'exam_reminder', 'course_update', 'announcement', 'grade_posted'];
  
  for (let i = 0; i < count; i++) {
    const type = randomElement(types);
    
    notifications.push({
      id: `notification-${i + 1}`,
      type,
      title: type.replace(/_/g, ' ').toUpperCase(),
      message: `You have a new notification regarding your courses.`,
      read: Math.random() > 0.3,
      createdDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    });
  }
  return notifications;
};

// Cache the data
let cachedData = {
  students: null,
  teachers: null,
  courses: null,
  assignments: null,
  quizzes: null,
  exams: null,
  attendance: null,
  announcements: null,
  notifications: null,
};

export const getAllData = () => {
  if (!cachedData.students) {
    cachedData.students = generateStudents(100);
    cachedData.teachers = generateTeachers(20);
    cachedData.courses = generateCourses(30);
    cachedData.assignments = generateAssignments(500);
    cachedData.quizzes = generateQuizzes(300);
    cachedData.exams = generateExams(200);
    cachedData.attendance = generateAttendance(100);
    cachedData.announcements = generateAnnouncements(50);
    cachedData.notifications = generateNotifications(100);
  }
  return cachedData;
};

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminCSVEnrollment;
use App\Http\Controllers\StudentDataController;
use App\Http\Controllers\AdminEnrollmentController;
use App\Http\Controllers\CourseInstructor;
use App\Http\Controllers\dashboardStudent;
use App\Http\Controllers\dashboardTeacher;


Route::get('/', function () {
    return view('login');
});

// Define the welcome route
Route::get('/welcome', function () {
    return view('welcome');
})->name('welcome');


//admin Import CSV Files For Enrollment
Route::get('/admin/enrollments/import', function () {
    return view('admin.enrollments.import');
})->name('import.view');

Route::post('/import', [AdminCSVEnrollment::class, 'import'])->name('import.studentEnrollment');



Route::get('/students', [StudentDataController::class, 'index']);


//Enrollment CSV Routes
Route::get('/enrollments/create', [AdminEnrollmentController::class, 'create'])->name('enrollments.create');
Route::post('/enrollments', [AdminEnrollmentController::class, 'store'])->name('enrollments.store');

//Enrollment Manual InOut Rioutes

Route::get('students/filter', [AdminEnrollmentController::class, 'filterStudents'])->name('students.filter');
Route::get('courses/filter', [AdminEnrollmentController::class, 'filterCourses'])->name('courses.filter');
Route::get('course_instructors/filter_by_course', [AdminEnrollmentController::class, 'filterCourseInstructorsByCourse'])->name('course_instructors.filter_by_course');
Route::get('course_instructors/filter', [AdminEnrollmentController::class, 'filterCourseInstructors'])->name('course_instructors.filter');
Route::post('enrollments/store', [AdminEnrollmentController::class, 'store'])->name('enrollments.store');
Route::delete('enrollments/{id}', [AdminEnrollmentController::class, 'destroy'])->name('enrollments.destroy');
Route::get('/course/instructors', [AdminEnrollmentController::class, 'fetchInstructorsByCourse'])->name('course.instructors');
Route::get('/course/instructor/by/course/instructor', [AdminEnrollmentController::class, 'fetchCourseInstructorByCourseInstructor'])->name('course.instructor.by.course.instructor');

Route::get('/instructors', [CourseInstructor::class, 'index'])->name('instructors.index');
Route::get('/instructors/{id}/edit', [CourseInstructor::class, 'edit'])->name('instructors.edit');
Route::put('/instructors/{id}', [CourseInstructor::class, 'update'])->name('instructors.update');
Route::get('/instructors/{id}/courses', [CourseInstructor::class, 'showCourses'])->name('instructors.courses');
Route::post('/instructors/{id}/courses/{courseId}/add', [CourseInstructor::class, 'addCourse'])->name('instructors.courses.add');
Route::put('/instructors/{id}/courses/{courseId}/drop', [CourseInstructor::class, 'dropCourse'])->name('instructors.courses.drop');


Route::get('login', [StudentLoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [StudentLoginController::class, 'login']);
Route::get('/dashboardstudent', [dashboardStudent::class, 'index'])->name('dashboardStudent');
Route::get('/dashboardteacher', [dashboardTeacher::class, 'index'])->name('dashboardTeacher');


//Admin User Manual Entry
Route::get('/admin/createUsers/create', [AdminManualUserController::class, 'create'])->name('admin.createUsers.create');
Route::post('/admin/createUsers/store', [AdminManualUserController::class, 'store'])->name('admin.createUsers.store');

//admin Import CSV File for User
Route::get('/admin/create-users', function () {
    return view('admin.createUsers.UserCSV');
})->name('createUsers.view');

Route::post('/admin/import-users', [AdminCSVUserController::class, 'import'])->name('import.users');




// Add Student (Admin) Manual Entry
Route::get('/admin/addStudent/create', [AdminStudentCreateController::class, 'create'])->name('admin.addStudent.create');
Route::post('/admin/addStudent/store', [AdminStudentCreateController::class, 'store'])->name('admin.addStudent.store');

// Add Student (Admin) CSV
Route::get('/admin/addStudent/upload', [AdminStudentCSVController::class, 'showUploadForm'])->name('admin.addStudent.upload');
Route::post('/admin/addStudent/import', [AdminStudentCSVController::class, 'importCSV'])->name('admin.addStudent.import');



// Add Instructor (Admin) Manual Entry

Route::get('/admin/instructors/create', [AdminInstructorCreateController::class, 'create'])->name('admin.addInstructor.create');
Route::post('/admin/instructors', [AdminInstructorCreateController::class, 'store'])->name('admin.addInstructor.store');


// Add Instructor (Admin) CSV
Route::get('/admin/addInstructor/upload', [AdminInstructorCSVController::class, 'showUploadForm'])->name('admin.addInstructor.upload');
Route::post('/admin/addInstructor/import', [AdminInstructorCSVController::class, 'importCSV'])->name('admin.addInstructor.import');
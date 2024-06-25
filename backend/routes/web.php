<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminCSVEnrollment;
use App\Http\Controllers\StudentDataController;
use App\Http\Controllers\AdminEnrollmentController;
use App\Http\Controllers\CourseInstructor;


Route::get('/', function () {
    return view('welcome');
});


Route::get('/import', function () {
    return view('import');
})->name('import.view');

Route::post('/import', [AdminCSVEnrollment::class, 'import'])->name('import');



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

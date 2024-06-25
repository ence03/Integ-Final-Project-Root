<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentDataController;
use App\Http\Controllers\AdminEnrollmentController;


Route::get('/', function () {
    return view('welcome');
});


Route::get('/import', function () {
    return view('import');
})->name('import.view');

Route::post('/import', [StudentController::class, 'import'])->name('import');



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

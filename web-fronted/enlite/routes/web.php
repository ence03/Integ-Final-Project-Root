<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\dashboardTeacher;
use App\Http\Controllers\dashboardStudent;
use App\Http\Controllers\teachercourseManagement;
use App\Http\Controllers\courseportalteacher;
use App\Http\Controllers\studentGrades;
use App\Http\Controllers\studentCoursemanagement;
use App\Http\Controllers\teacherprofile;
use App\Http\Controllers\studentProfile;


Route::get('/', function () {
    return view('login');
});

// Define the welcome route
Route::get('/welcome', function () {
    return view('welcome');
})->name('welcome');


Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);

//teacher side
Route::get('/dashboardteacher', [dashboardTeacher::class, 'index'])->name('dashboardTeacher');
Route::get('/teachercoursemanagement', [teachercourseManagement::class, 'index'])->name('teachercourseManagement');
Route::get('/courseportalteacher', [courseportalteacher::class, 'index'])->name('courseportalteacher');
Route::get('/teacherprofile', [teacherprofile::class, 'index'])->name('teacherprofile');
Route::get('/teachernotification', [teachernotification::class, 'index'])->name('teachernotification');



//student side
Route::get('/dashboardstudent', [dashboardStudent::class, 'index'])->name('dashboardStudent');
Route::get('/studentgrades', [studentGrades::class, 'index'])->name('studentGrades');
Route::get('/studentcoursemanagement', [studentCoursemanagement::class, 'index'])->name('studentCoursemanagement');
Route::get('/studentprofile', [studentProfile::class, 'index'])->name('studentProfile');
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\dashboardTeacher;
use App\Http\Controllers\dashboardStudent;
use App\Http\Controllers\teachercourseManagement;
use App\Http\Controllers\courseportalteacher;
use App\Http\Controllers\studentGrades;

Route::get('/', function () {
    return view('login');
});

// Define the welcome route
Route::get('/welcome', function () {
    return view('welcome');
})->name('welcome');


Route::get('/dashboardteacher', [dashboardTeacher::class, 'index'])->name('dashboardTeacher');
Route::get('/dashboardstudent', [dashboardStudent::class, 'index'])->name('dashboardStudent');
Route::get('/teachercoursemanagement', [teachercourseManagement::class, 'index'])->name('teachercourseManagement');
Route::get('/courseportalteacher', [courseportalteacher::class, 'index'])->name('courseportalteacher');
Route::get('/studentgrades', [studentGrades::class, 'index'])->name('studentGrades');

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);

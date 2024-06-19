<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentDataController extends Controller
{
    public function index()
    {
        // Fetch all students from the database
        $students = Student::all();

        // Pass the students data to the view
        return view('students', ['students' => $students]);
    }
}

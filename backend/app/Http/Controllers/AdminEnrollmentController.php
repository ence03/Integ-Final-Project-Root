<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\YearSemester;
use App\Models\Student;
use App\Models\CourseInstructor;
use Illuminate\Http\Request;

class AdminEnrollmentController extends Controller
{
    public function create()
    {
        $yearSemesters = YearSemester::all();
        $students = Student::all();
        $courseInstructors = CourseInstructor::all();

        return view('enrollments.create', compact('yearSemesters', 'students', 'courseInstructors'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'Year_SemID' => 'required|exists:year_semester,Year_SemID',
            'StudentID' => 'required|exists:students,StudentID',
            'Course_InstructorID' => 'required|exists:course_instructor,Course_InstructorID',
        ]);

        Enrollment::create($request->all());

        return redirect()->route('enrollments.create')->with('success', 'Student enrolled successfully.');
    }
}

<?php

// app/Http/Controllers/EnrollmentController.php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Student;
use App\Models\CourseInstructor;
use App\Models\YearSem;
use Illuminate\Http\Request;

class AdminEnrollmentController extends Controller
{
    public function showEnrollForm()
    {
        return view('enrollment');
    }

    public function enroll(Request $request)
    {
        $request->validate([
            'Year_SemID' => 'required|exists:year_sems,id',
            'StudentID' => 'required|exists:students,id',
            'Course_InstructorID' => 'required|exists:course_instructors,id',
        ]);

        Enrollment::create([
            'Year_SemID' => $request->Year_SemID,
            'StudentID' => $request->StudentID,
            'Course_InstructorID' => $request->Course_InstructorID,
        ]);

        return redirect()->route('enroll.form')->with('success', 'Student enrolled successfully!');
    }

    public function searchStudents(Request $request)
    {
        $query = $request->input('query');
        $students = Student::where('StudentID', 'LIKE', "%{$query}%")->get(['StudentID', 'name']);
        return response()->json($students);
    }

    public function searchCourseInstructors(Request $request)
    {
        $query = $request->input('query');
        $courseInstructors = CourseInstructor::where('Course_InstructorID', 'LIKE', "%{$query}%")->get(['Course_InstructorID', 'name']);
        return response()->json($courseInstructors);
    }

    public function searchYearSems(Request $request)
    {
        $query = $request->input('query');
        $yearSems = YearSem::where('Year_SemID', 'LIKE', "%{$query}%")->get(['Year_SemID', 'year', 'semester']);
        return response()->json($yearSems);
    }
}

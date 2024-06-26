<?php
//Manual Entry For Creating Student Accounts
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\AllUsers;
use App\Models\Role;

class AdminStudentCreateController extends Controller
{
    public function create()
    {
        // Fetch users who have RoleID of 3 (student) and are not yet associated with a StudentID in the Student table
        $studentsRoleID = Role::where('RoleName', 'Student')->first()->RoleID;

        $users = AllUsers::where('RoleID', $studentsRoleID)
                     ->whereDoesntHave('student')
                     ->get();

        // Fetch the next StudentID
        $nextStudentID = Student::max('StudentID') + 1;

        return view('admin.addStudent.StudentManual', compact('users', 'nextStudentID'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'UserID' => 'required|string|max:255',
            'FirstName' => 'required|string|max:255',
            'MiddleName' => 'nullable|string|max:255',
            'LastName' => 'required|string|max:255',
            'Email' => 'required|string|email|max:255',
            'Address' => 'nullable|string|max:255',
            'Birthdate' => 'required|date',
            'ContactNumber' => 'nullable|string|max:255',
            'EnrollmentStatus' => 'nullable|string|max:255',
        ]);

        Student::create($validated);

        return redirect()->route('admin.addStudent.create')->with('success', 'Student created successfully.');
    }
}

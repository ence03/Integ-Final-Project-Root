<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Instructor;
use App\Models\AllUsers;
use App\Models\Role;

class AdminInstructorCreateController extends Controller
{
    
    public function create()
    {
        // Fetch users who have RoleID of 2 (instructor) and are not yet associated with an InstructorID in the Instructor table
        $role = Role::where('RoleName', 'Teacher')->first();

        // if (!$role) {
        //     // Handle case where 'Instructor' role does not exist
        //     return redirect()->back()->with('error', 'Role "Instructor" not found.');
        // }

        $users = AllUsers::where('RoleID', $role->RoleID)
                        ->whereDoesntHave('instructor')
                        ->get();

        // Fetch the next InstructorID
        $nextInstructorID = Instructor::max('InstructorID') + 1;

        return view('admin.addInstructor.InstructorManual', compact('users', 'nextInstructorID'));
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
        ]);

        Instructor::create($validated);

        return redirect()->route('admin.addInstructor.create')->with('success', 'Instructor created successfully.');
    }
}
